import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInAnonymously } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { getFirestore, doc, setDoc, deleteDoc, serverTimestamp, runTransaction } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";
import {
  getMessaging,
  isSupported,
  onMessage,
  onRegistered,
  onUnregistered,
  register,
  unregister
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-messaging.js";

const BUILD = "24.273";
const firebaseConfig = {
  apiKey: "AIzaSyD1pZO7FDXyjBtc7idwVqe22p6wTub4lkg",
  authDomain: "duckie-days.firebaseapp.com",
  projectId: "duckie-days",
  storageBucket: "duckie-days.firebasestorage.app",
  messagingSenderId: "668038938575",
  appId: "1:668038938575:web:a41e327c86f3c43eb11cba"
};
const VAPID_KEY = "BEExKJHxvPrUr0I73rnd3TvQ6S8ViJi2Nyu6WNW-6zsVoKlc5KR5SFglZt0_OczBQSB4ggHzMUqVH9D5RrT8m1w";

const state = {
  build: BUILD,
  initialized: false,
  supported: false,
  permission: typeof Notification === "undefined" ? "unsupported" : Notification.permission,
  uid: null,
  fid: null,
  error: null
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
let messaging = null;
let authReadyResolve;
const authReady = new Promise(resolve => { authReadyResolve = resolve; });
let fidWaiters = [];

function emitState() {
  window.dispatchEvent(new CustomEvent("duckie-notification-state-v271", {
    detail: { ...state }
  }));
}

function resolveFidWaiters(value, error = null) {
  const waiters = fidWaiters.splice(0);
  waiters.forEach(({resolve, reject}) => error ? reject(error) : resolve(value));
}

async function ensureAuth() {
  await authReady;
  if (auth.currentUser) return auth.currentUser;
  const result = await signInAnonymously(auth);
  return result.user;
}

onAuthStateChanged(auth, async user => {
  try {
    if (!user) {
      const result = await signInAnonymously(auth);
      state.uid = result.user.uid;
    } else {
      state.uid = user.uid;
    }
    authReadyResolve?.();
    authReadyResolve = null;
    emitState();
  } catch (error) {
    state.error = error?.message || String(error);
    authReadyResolve?.();
    authReadyResolve = null;
    emitState();
  }
});

async function storeFid(fid) {
  const user = await ensureAuth();
  if (!user || !fid) return;
  await setDoc(doc(db, "users", user.uid, "settings", "notifications"), {
    fid,
    enabled: true,
    updatedAt: serverTimestamp(),
    userAgent: navigator.userAgent.slice(0, 500)
  }, { merge: true });
  state.uid = user.uid;
  state.fid = fid;
  state.permission = Notification.permission;
  state.error = null;
  emitState();
  resolveFidWaiters(fid);
}

async function clearFid(fid = null) {
  const user = await ensureAuth();
  if (!user) return;
  await setDoc(doc(db, "users", user.uid, "settings", "notifications"), {
    fid: null,
    enabled: false,
    previousFid: fid || state.fid || null,
    updatedAt: serverTimestamp()
  }, { merge: true });
  state.fid = null;
  emitState();
}

async function serviceWorkerRegistration() {
  if (!("serviceWorker" in navigator)) throw new Error("Service workers are not available on this device.");
  return navigator.serviceWorker.ready;
}

async function initializeMessaging() {
  state.supported = await isSupported().catch(() => false);
  if (!state.supported) {
    state.initialized = true;
    state.permission = typeof Notification === "undefined" ? "unsupported" : Notification.permission;
    emitState();
    return false;
  }

  messaging = getMessaging(app);

  onRegistered(messaging, fid => {
    storeFid(fid).catch(error => {
      state.error = error?.message || String(error);
      emitState();
      resolveFidWaiters(null, error);
    });
  });

  onUnregistered(messaging, fid => {
    clearFid(fid).catch(() => {});
  });

  onMessage(messaging, payload => {
    window.dispatchEvent(new CustomEvent("duckie-foreground-notification-v271", {
      detail: payload
    }));
  });

  state.initialized = true;
  state.permission = Notification.permission;
  emitState();

  if (Notification.permission === "granted") {
    try {
      const sw = await serviceWorkerRegistration();
      await register(messaging, {
        vapidKey: VAPID_KEY,
        serviceWorkerRegistration: sw
      });
    } catch (error) {
      state.error = error?.message || String(error);
      emitState();
    }
  }
  return true;
}

async function waitForFid(timeoutMs = 15000) {
  if (state.fid) return state.fid;
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      fidWaiters = fidWaiters.filter(item => item.resolve !== wrappedResolve);
      reject(new Error("Notification registration timed out. Please try again."));
    }, timeoutMs);
    const wrappedResolve = value => {
      clearTimeout(timer);
      resolve(value);
    };
    const wrappedReject = error => {
      clearTimeout(timer);
      reject(error);
    };
    fidWaiters.push({resolve: wrappedResolve, reject: wrappedReject});
  });
}

async function enableNotifications() {
  state.error = null;
  if (!state.initialized) await initializeMessaging();
  if (!state.supported || !messaging) {
    throw new Error("Push notifications are not supported in this browser. On iPhone/iPad, open Duckie Days from its Home Screen icon.");
  }

  const permission = await Notification.requestPermission();
  state.permission = permission;
  emitState();
  if (permission !== "granted") {
    throw new Error("Notification permission was not granted.");
  }

  await ensureAuth();
  const sw = await serviceWorkerRegistration();
  const fidPromise = waitForFid();
  await register(messaging, {
    vapidKey: VAPID_KEY,
    serviceWorkerRegistration: sw
  });
  return fidPromise;
}

async function disableNotifications() {
  if (!messaging) await initializeMessaging();
  if (messaging) await unregister(messaging).catch(() => {});
  await clearFid();
  return true;
}

function reminderDocId(uid, taskId) {
  return `${uid}--${String(taskId).replace(/[^A-Za-z0-9_.-]/g, "_")}`;
}

// Keep the schedule we successfully saved on this device. A previously sent
// reminder must not be armed again merely because Duckie Days was reopened.
const syncedSchedules = new Map();
function cacheKey(uid, taskId) {
  return `duckie-reminder-v273:${uid}:${taskId}`;
}
function cachedSchedule(key) {
  if (syncedSchedules.has(key)) return syncedSchedules.get(key);
  try { return localStorage.getItem(key); } catch (error) { return null; }
}
function rememberSchedule(key, value) {
  syncedSchedules.set(key, value);
  try { localStorage.setItem(key, value); } catch (error) {}
}
function forgetSchedule(key) {
  syncedSchedules.delete(key);
  try { localStorage.removeItem(key); } catch (error) {}
}

async function upsertReminder(reminder) {
  const user = await ensureAuth();
  if (!user) throw new Error("Duckie Days could not sign in to Firebase.");
  if (!state.fid || Notification.permission !== "granted") {
    throw new Error("Phone notifications are not enabled yet.");
  }

  const taskId = String(reminder.taskId || "");
  if (!taskId) throw new Error("Reminder is missing its task ID.");

  const ref = doc(db, "taskReminders", reminderDocId(user.uid, taskId));
  const title = String(reminder.title || "Duckie Days ♡").slice(0, 120);
  const body = String(reminder.body || "You have a task reminder! ♡").slice(0, 240);
  const url = String(reminder.url || location.href).slice(0, 600);
  const leadMinutes = Math.max(0, Number(reminder.leadMinutes) || 0);
  const scheduleKey = JSON.stringify([
    reminder.deadlineAt?.getTime() ?? null, leadMinutes, title, body, url
  ]);
  const key = cacheKey(user.uid, taskId);
  if (cachedSchedule(key) === scheduleKey) return ref.id;

  const fields = () => ({
    uid: user.uid, taskId, title, body, url,
    sendAt: reminder.sendAt, deadlineAt: reminder.deadlineAt || null,
    leadMinutes, scheduleKey, revision: crypto.randomUUID(),
    status: "pending", claimedAt: null, claimId: null, sentAt: null,
    attemptCount: 0, lastError: null, updatedAt: serverTimestamp()
  });
  try {
    // Existing reminders can be read when permitted, so do not rearm one
    // already sent on a device that predates the local schedule cache.
    await runTransaction(db, async transaction => {
      const snapshot = await transaction.get(ref);
      const old = snapshot.exists() ? snapshot.data() : null;
      const sameLegacySchedule = old && !old.scheduleKey &&
        old.deadlineAt?.toMillis?.() === reminder.deadlineAt?.getTime() &&
        Number(old.leadMinutes) === leadMinutes && old.body === body;
      if (old?.scheduleKey === scheduleKey ||
          (sameLegacySchedule && old.status === "sent")) return;
      transaction.set(ref, fields());
    });
  } catch (error) {
    if (error?.code !== "permission-denied") throw error;
    // Some rules allow creating an owned document but cannot read it before
    // creation. setDoc uses only the write permission in that case.
    await setDoc(ref, fields(), {merge: true});
  }
  rememberSchedule(key, scheduleKey);
  return ref.id;
}

async function cancelReminder(taskId) {
  const user = await ensureAuth();
  if (!user || !taskId) return false;
  await deleteDoc(doc(db, "taskReminders", reminderDocId(user.uid, taskId))).catch(error => {
    if (error?.code !== "not-found") throw error;
  });
  forgetSchedule(cacheKey(user.uid, taskId));
  return true;
}

function getState() {
  return { ...state, permission: typeof Notification === "undefined" ? "unsupported" : Notification.permission };
}

window.DuckieFirebaseRemindersV271 = {
  BUILD,
  getState,
  enableNotifications,
  disableNotifications,
  upsertReminder,
  cancelReminder,
  ensureAuth,
  syncRegistration: async () => {
    if (!state.initialized) await initializeMessaging();
    if (state.supported && Notification.permission === "granted" && messaging) {
      const sw = await serviceWorkerRegistration();
      await register(messaging, { vapidKey: VAPID_KEY, serviceWorkerRegistration: sw });
    }
    return getState();
  }
};

initializeMessaging().catch(error => {
  state.error = error?.message || String(error);
  state.initialized = true;
  emitState();
});
