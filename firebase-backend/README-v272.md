# Duckie Days v24.272 task reminders

The app update and the Firebase backend are separate deployments. The GitHub
Pages update copies this source into the app repository but cannot deploy Cloud
Functions on its own. The live backend keeps using the one-minute sender until
this `index.js` is deployed to the `duckie-days` Firebase project.

Copy `index.js` into the Firebase Functions workspace as `functions/index.js`.
Use Node.js 20 or 22, `firebase-functions` with second-generation task queue
support, and `firebase-admin` 14.2.0 or newer. Do not replace any other
functions in that workspace unless you have preserved their exports.

Deploy in this order to ensure the queue exists before the Firestore trigger
starts producing tasks:

    firebase deploy --only functions:dispatchTaskReminder --project duckie-days
    firebase deploy --only functions:queueTaskReminder,functions:queueFutureTaskReminders,functions:sendDueTaskReminders --project duckie-days

The deployer's identity and the producer function need Cloud Tasks queue
creation/enqueue permissions; the queue invocation identity must be allowed to
invoke the task function. Follow the Firebase CLI's IAM prompts if shown.

`taskReminders/{uid}--{taskId}` retains the status history. Each edited reminder
gets a new revision. Old queued revisions safely do nothing after edits or
deletions; the queue entries need not be individually removed. Cloud Tasks can
schedule no more than 30 days ahead, so a daily function moves later reminders
into its scheduling window. The one-minute sender remains a recovery path after
90 seconds. Delivery time depends on queue startup, FCM, network and device.

Test with a task deadline 20–30 minutes away and a 15-minute reminder. Verify
`status: sent` and `sentAt` in Firestore, then reopen the app and confirm the
reminder stays sent. Move another future task and complete one before their
reminder time to verify the old queued revisions do not notify.
