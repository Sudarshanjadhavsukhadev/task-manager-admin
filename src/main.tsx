import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Capacitor } from "@capacitor/core";
import { LocalNotifications } from "@capacitor/local-notifications";

import "./index.css";
import App from "./App.tsx";

async function setupNotifications() {
  // Only run native notification setup on Android/iOS
  if (!Capacitor.isNativePlatform()) {
    console.log(
      "Running on web. Local notification setup skipped."
    );
    return;
  }

  try {
    const permission =
      await LocalNotifications.requestPermissions();

    console.log(
      "Notification Permission:",
      permission
    );

    await LocalNotifications.createChannel({
      id: "tasks",
      name: "Task Notifications",
      description:
        "Task Manager Notifications",
      importance: 5,
      visibility: 1,
    });

    console.log(
      "✅ Local notification channel created"
    );
  } catch (err) {
    console.error(
      "Notification setup failed:",
      err
    );
  }
}

setupNotifications();

createRoot(
  document.getElementById("root")!
).render(
  <StrictMode>
    <App />
  </StrictMode>
);