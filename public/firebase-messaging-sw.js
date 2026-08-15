importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

// =====================================================
// FIREBASE INITIALIZATION
// =====================================================

firebase.initializeApp({
  apiKey: "AIzaSyCsBwplrVjPtEm1DaFoeOzcWGq2ObeNG08",
  authDomain: "task-manager-7ebf5.firebaseapp.com",
  projectId: "task-manager-7ebf5",
  storageBucket: "task-manager-7ebf5.firebasestorage.app",
  messagingSenderId: "364413316177",
  appId: "1:364413316177:web:c4b70866c00aca9a041c70",
});

const messaging = firebase.messaging();

// =====================================================
// BACKGROUND PUSH NOTIFICATION
// =====================================================

messaging.onBackgroundMessage((payload) => {
  console.log(
    "================================"
  );

  console.log(
    "📩 BACKGROUND NOTIFICATION"
  );

  console.log(payload);

  console.log(
    "================================"
  );

  const title =
    payload.notification?.title ||
    "Task Manager";

  const body =
    payload.notification?.body ||
    "You have a new notification.";

  const taskId =
    payload.data?.taskId || "";

  self.registration.showNotification(
    title,
    {
      body: body,

      icon: "/favicon.ico",

      badge: "/favicon.ico",

      data: {
        taskId: taskId,
        type:
          payload.data?.type ||
          "notification",
      },

      tag: "task-manager-notification",

      requireInteraction: false,
    }
  );
});

// =====================================================
// NOTIFICATION CLICK
// =====================================================

self.addEventListener(
  "notificationclick",
  (event) => {
    console.log(
      "📲 BACKGROUND NOTIFICATION CLICKED"
    );

    event.notification.close();

    const taskId =
      event.notification.data?.taskId;

    let url =
      "https://task-manager-7ebf5.web.app/#/dashboard";

    if (taskId) {
      // Admin can later be taken directly
      // to the task if required.
      url =
        `https://task-manager-7ebf5.web.app/#/dashboard`;
    }

    event.waitUntil(
      clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      }).then((clientList) => {

        for (const client of clientList) {
          if (
            "focus" in client
          ) {
            client.focus();
            return;
          }
        }

        if (
          clients.openWindow
        ) {
          return clients.openWindow(
            url
          );
        }
      })
    );
  }
);