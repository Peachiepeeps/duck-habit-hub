const {onDocumentWritten} = require("firebase-functions/v2/firestore");
const {onTaskDispatched} = require("firebase-functions/v2/tasks");
const {onSchedule} = require("firebase-functions/v2/scheduler");
const {setGlobalOptions, logger} = require("firebase-functions");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore, Timestamp} = require("firebase-admin/firestore");
const {getFunctions} = require("firebase-admin/functions");
const {getMessaging} = require("firebase-admin/messaging");
const {randomUUID} = require("crypto");

initializeApp();
setGlobalOptions({region: "us-west2", maxInstances: 2});
const db = getFirestore();
const MAX_SCHEDULE_MS = 29 * 24 * 60 * 60 * 1000; // Cloud Tasks allows at most 30 days.

function millis(value) {
  return value && typeof value.toMillis === "function" ? value.toMillis() : NaN;
}

async function enqueueIfNeeded(reminderId, revision) {
  const ref = db.collection("taskReminders").doc(reminderId);
  const current = await ref.get();
  if (!current.exists || current.data().revision !== revision ||
      current.data().status !== "pending" ||
      current.data().queuedRevision === revision) return;
  const due = millis(current.data().sendAt);
  if (!Number.isFinite(due)) return;
  if (due - Date.now() > MAX_SCHEDULE_MS) return;
  try {
    const queue = getFunctions().taskQueue("locations/us-west2/functions/dispatchTaskReminder");
    await queue.enqueue({reminderId, revision}, {
      scheduleTime: new Date(Math.max(Date.now(), due)),
    });
    await db.runTransaction(async transaction => {
      const fresh = await transaction.get(ref);
      if (fresh.exists && fresh.data().revision === revision &&
          fresh.data().status === "pending") {
        transaction.update(ref, {queuedRevision: revision, queuedAt: Timestamp.now()});
      }
    });
    logger.info("Queued Duckie Days reminder.", {reminderId, revision});
  } catch (error) {
    logger.error("Could not queue reminder; minute fallback remains active.", {
      reminderId, error: error?.message || String(error),
    });
    // Retrying the event can create a second queue entry, but only one dispatch
    // may claim the matching Firestore revision.
    throw error;
  }
}

// Enqueue only when a reminder is created or its schedule changes. Updates made
// while sending (status, claimedAt, sentAt) cannot recursively enqueue it.
exports.queueTaskReminder = onDocumentWritten("taskReminders/{reminderId}", async event => {
  const after = event.data?.after?.data();
  const before = event.data?.before?.data();
  if (!after || after.status !== "pending" || !after.revision ||
      before?.revision === after.revision) return;
  await enqueueIfNeeded(event.params.reminderId, after.revision);
});

// Cloud Tasks accepts dates up to 30 days away; queue longer-term reminders
// as they move into that window.
exports.queueFutureTaskReminders = onSchedule({schedule: "every day 00:15",
  timeZone: "America/Los_Angeles"}, async () => {
  const now = Date.now();
  const snaps = await db.collection("taskReminders")
      .where("sendAt", ">", Timestamp.fromMillis(now))
      .where("sendAt", "<=", Timestamp.fromMillis(now + MAX_SCHEDULE_MS))
      .limit(500).get();
  for (const snap of snaps.docs) {
    const data = snap.data();
    if (data.status !== "pending" || !data.revision ||
        data.queuedRevision === data.revision) continue;
    try { await enqueueIfNeeded(snap.id, data.revision); }
    catch (error) { logger.error("Future reminder queue failed.", {reminderId: snap.id, error: error?.message || String(error)}); }
  }
});

async function deliverReminder(ref, expectedRevision = null) {
  const claimId = randomUUID();
  let reminder = null;
  await db.runTransaction(async transaction => {
    const snapshot = await transaction.get(ref);
    if (!snapshot.exists) return;
    const data = snapshot.data();
    if (expectedRevision && data.revision !== expectedRevision) return;
    const stale = data.status === "sending" &&
      millis(data.claimedAt) < Date.now() - 60 * 1000;
    if (data.status !== "pending" && !stale) return;
    if (!Number.isFinite(millis(data.sendAt)) || millis(data.sendAt) > Date.now()) return;
    reminder = data;
    transaction.update(ref, {
      status: "sending", claimedAt: Timestamp.now(), claimId,
      attemptCount: Math.max(0, Number(data.attemptCount) || 0) + 1,
    });
  });
  if (!reminder) return false;

  const matchesClaim = async () => {
    const snapshot = await ref.get();
    return snapshot.exists && snapshot.data().claimId === claimId &&
      snapshot.data().status === "sending" &&
      snapshot.data().revision === reminder.revision;
  };
  try {
    if (!reminder.uid) throw new Error("Missing Firebase user ID.");
    const device = await db.doc(`users/${reminder.uid}/settings/notifications`).get();
    const fid = device.data()?.fid;
    if (!fid || device.data()?.enabled === false) throw new Error("No enabled device registered.");
    // If the user deleted or rescheduled while we loaded their device, stop.
    if (!await matchesClaim()) return false;
    const url = String(reminder.url || "https://peachiepeeps.github.io/duck-habit-hub/");
    await getMessaging().send({
      fid,
      notification: {
        title: String(reminder.title || "Duckie Days ♡"),
        body: String(reminder.body || "You have a task reminder! ♡"),
      },
      data: {reminderId: ref.id, taskId: String(reminder.taskId || ""), url},
      webpush: {fcmOptions: {link: url}},
    });
    await db.runTransaction(async transaction => {
      const current = await transaction.get(ref);
      if (current.exists && current.data().claimId === claimId &&
          current.data().revision === reminder.revision) {
        transaction.update(ref, {
          status: "sent", sentAt: Timestamp.now(), sendAt: null,
          claimedAt: null, claimId: null, lastError: null,
        });
      }
    });
    logger.info("Duckie Days reminder sent.", {reminderId: ref.id});
    return true;
  } catch (error) {
    await db.runTransaction(async transaction => {
      const current = await transaction.get(ref);
      if (current.exists && current.data().claimId === claimId &&
          current.data().revision === reminder.revision) {
        const failed = Number(current.data().attemptCount) >= 5;
        transaction.update(ref, {
          status: failed ? "failed" : "pending",
          sendAt: failed ? null : reminder.sendAt,
          claimedAt: null, claimId: null,
          lastError: String(error?.message || error).slice(0, 500),
          lastAttemptAt: Timestamp.now(),
        });
      }
    });
    logger.error("Duckie Days reminder failed.", {reminderId: ref.id, error: error?.message || String(error)});
    throw error;
  }
}

exports.dispatchTaskReminder = onTaskDispatched({
  retryConfig: {maxAttempts: 5, minBackoffSeconds: 10},
  rateLimits: {maxConcurrentDispatches: 10},
}, async request => {
  const {reminderId, revision} = request.data || {};
  if (typeof reminderId !== "string" || !/^[A-Za-z0-9_.-]+$/.test(reminderId) ||
      typeof revision !== "string") throw new Error("Invalid queued reminder.");
  await deliverReminder(db.collection("taskReminders").doc(reminderId), revision);
});

// Recovery for failed queue creation, legacy documents, and reminders more than
// 30 days away. It waits 90 seconds so the exact-time queue gets first chance.
exports.sendDueTaskReminders = onSchedule({schedule: "* * * * *", timeZone: "America/Los_Angeles"}, async () => {
  const cutoff = Timestamp.fromMillis(Date.now() - 90 * 1000);
  const due = await db.collection("taskReminders")
      .where("sendAt", ">", Timestamp.fromMillis(0))
      .where("sendAt", "<=", cutoff).limit(100).get();
  for (const snapshot of due.docs) {
    try { await deliverReminder(snapshot.ref); }
    catch (error) { logger.error("Fallback reminder failed.", {reminderId: snapshot.id, error: error?.message || String(error)}); }
  }
});
