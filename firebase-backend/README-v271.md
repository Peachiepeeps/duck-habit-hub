# Duckie Days Firebase reminder backend

This folder is a source-code backup of the Cloud Function deployed for v24.271.

The live Firebase function is deployed separately from GitHub Pages and is not
overwritten by normal Duckie Days GitHub updates.

Live function:
- Name: `sendDueTaskReminders`
- Region: `us-west2`
- Schedule: once per minute
- Purpose: send FCM Web Push reminders whose `sendAt` time has arrived.

The browser/PWA stores the current Firebase Installation ID at:
`users/{uid}/settings/notifications`

Task reminders live at:
`taskReminders/{uid}--{taskId}`

The live function was already deployed before this source backup was added.
If it ever needs to be redeployed, copy this file to the Firebase Functions
workspace as `functions/index.js`, run `node --check functions/index.js`, then:
`firebase deploy --only functions:sendDueTaskReminders --project duckie-days`
