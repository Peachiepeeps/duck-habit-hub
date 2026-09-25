const {onSchedule} = require("firebase-functions/v2/scheduler");
const {setGlobalOptions, logger} = require("firebase-functions");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore, Timestamp} = require("firebase-admin/firestore");
const {getMessaging} = require("firebase-admin/messaging");

initializeApp();

setGlobalOptions({
  region: "us-west2",
  maxInstances: 1,
});

const db = getFirestore();

exports.sendDueTaskReminders = onSchedule(
    {
      schedule: "* * * * *",
      timeZone: "America/Los_Angeles",
    },
    async () => {
      const now = Timestamp.now();

      const dueReminders = await db
          .collection("taskReminders")
          .where("sendAt", "<=", now)
          .limit(25)
          .get();

      if (dueReminders.empty) {
        logger.debug("No Duckie Days reminders are due.");
        return;
      }

      for (const reminderSnap of dueReminders.docs) {
        let claimed = false;
        let reminder = null;
        let attemptCount = 0;

        try {
          await db.runTransaction(async (transaction) => {
            const freshSnap = await transaction.get(reminderSnap.ref);
            if (!freshSnap.exists) return;

            const data = freshSnap.data();
            const sendAt = data.sendAt;
            const claimedAt = data.claimedAt;

            const staleSending =
              data.status === "sending" &&
              claimedAt &&
              typeof claimedAt.toMillis === "function" &&
              claimedAt.toMillis() < Date.now() - (5 * 60 * 1000);

            if (data.status !== "pending" && !staleSending) return;

            if (
              !sendAt ||
              typeof sendAt.toMillis !== "function" ||
              sendAt.toMillis() > Date.now()
            ) {
              return;
            }

            reminder = data;
            attemptCount = Math.max(0, Number(data.attemptCount || 0)) + 1;

            transaction.update(freshSnap.ref, {
              status: "sending",
              claimedAt: now,
              attemptCount,
            });

            claimed = true;
          });

          if (!claimed || !reminder) continue;

          const uid = String(reminder.uid || "");
          if (!uid) throw new Error("Reminder is missing its Firebase user ID.");

          const deviceSnap = await db
              .doc(`users/${uid}/settings/notifications`)
              .get();

          const fid = deviceSnap.data()?.fid;
          if (!fid) throw new Error("No notification device is registered.");

          const title = String(reminder.title || "Duckie Days");
          const body = String(reminder.body || "You have a task reminder! ♡");
          const url = String(
              reminder.url ||
              "https://peachiepeeps.github.io/duck-habit-hub/",
          );

          await getMessaging().send({
            fid,
            notification: {title, body},
            data: {
              reminderId: reminderSnap.id,
              taskId: String(reminder.taskId || ""),
              url,
            },
            webpush: {
              fcmOptions: {link: url},
            },
          });

          await reminderSnap.ref.update({
            status: "sent",
            sentAt: Timestamp.now(),
            sendAt: null,
            claimedAt: null,
            lastError: null,
          });

          logger.info("Duckie Days reminder sent.", {
            reminderId: reminderSnap.id,
          });
        } catch (error) {
          logger.error("Duckie Days reminder failed.", {
            reminderId: reminderSnap.id,
            error: error?.message || String(error),
          });

          try {
            const permanentFailure = attemptCount >= 5;
            await reminderSnap.ref.update({
              status: permanentFailure ? "failed" : "pending",
              sendAt: permanentFailure ? null : reminderSnap.data().sendAt,
              claimedAt: null,
              lastError: String(error?.message || error).slice(0, 500),
              lastAttemptAt: Timestamp.now(),
            });
          } catch (updateError) {
            logger.error("Could not update failed reminder.", {
              reminderId: reminderSnap.id,
              error: updateError?.message || String(updateError),
            });
          }
        }
      }
    },
);
