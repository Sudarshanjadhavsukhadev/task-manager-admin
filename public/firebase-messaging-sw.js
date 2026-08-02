importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCsBwplrVjPtEm1DaFoeOzcWGq2ObeNG08",
  authDomain: "task-manager-7ebf5.firebaseapp.com",
  projectId: "task-manager-7ebf5",
  storageBucket: "task-manager-7ebf5.firebasestorage.app",
  messagingSenderId: "364413316177",
  appId: "1:364413316177:web:c4b70866c00aca9a041c70",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Background Notification:", payload);

  self.registration.showNotification(
    payload.notification.title,
    {
      body: payload.notification.body,
      icon: "/favicon.ico",
    }
  );
});