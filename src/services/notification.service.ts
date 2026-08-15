import { getToken } from "firebase/messaging";
import { messaging } from "../firebase/firebase";
import { supabase } from "../lib/supabase";
import { LocalNotifications } from "@capacitor/local-notifications";
import { PushNotifications } from "@capacitor/push-notifications";

import type {
  Token,
  PushNotificationSchema,
  ActionPerformed,

} from "@capacitor/push-notifications";


// =====================================================
// WEB FCM TOKEN
// =====================================================

export async function getFCMToken() {
  try {
    console.log("===== WEB FCM START =====");

    const permission = await Notification.requestPermission();

    console.log("Web notification permission:", permission);

    if (permission !== "granted") {
      console.log("Web notification permission denied");
      return null;
    }

    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );

    await navigator.serviceWorker.ready;

    const token = await getToken(messaging, {
      vapidKey:
        "BNXN3l_oLzHcLrFAa3SyH5_HQl0Xd1Glle4pZxTwQ9XLEgyGYIeOImDsMCiV3awF3kdizRyR9LMXF_X1U-4MX58",

      serviceWorkerRegistration: registration,
    });

    console.log("WEB FCM TOKEN =", token);

    console.log("===== WEB FCM END =====");

    return token || null;

  } catch (error) {
    console.error("WEB FCM ERROR:", error);
    return null;
  }
}


// =====================================================
// SAVE FCM TOKEN TO SUPABASE
// =====================================================

export async function saveFCMToken(
  userId: string,
  token: string
) {
  try {
    console.log("Saving FCM token for user:", userId);

    const { error } = await supabase
      .from("users")
      .update({
        fcm_token: token,
      })
      .eq("id", userId);

    if (error) {
      console.error(
        "Failed to save FCM token:",
        error
      );

      throw error;
    }

    console.log(
      "FCM TOKEN SAVED SUCCESSFULLY"
    );

    return true;

  } catch (error) {
    console.error(
      "SAVE FCM TOKEN ERROR:",
      error
    );

    return false;
  }
}



// =====================================================
// ANDROID / CAPACITOR PUSH INITIALIZATION
// =====================================================

export async function initializePushNotifications(
  userId: string
) {
  try {
    console.log("================================");
    console.log("ANDROID PUSH INITIALIZATION");
    console.log("USER ID:", userId);
    console.log("================================");

    // -------------------------------------------------
    // 1. ADD LISTENERS BEFORE REGISTER()
    // -------------------------------------------------

    await PushNotifications.addListener(
      "registration",
      async (token: Token) => {
        console.log("================================");
        console.log("ANDROID FCM TOKEN:");
        console.log(token.value);
        console.log("================================");

        const saved = await saveFCMToken(
          userId,
          token.value
        );

        if (saved) {
          console.log(
            "✅ ANDROID FCM TOKEN SAVED TO SUPABASE"
          );
        } else {
          console.error(
            "❌ FAILED TO SAVE ANDROID FCM TOKEN"
          );
        }
      }
    );

    await PushNotifications.addListener(
      "registrationError",
      (error) => {
        console.error(
          "❌ ANDROID FCM REGISTRATION ERROR:",
          error
        );
      }
    );

    // -------------------------------------------------
    // 2. RECEIVE PUSH WHILE APP IS OPEN
    // -------------------------------------------------

    await PushNotifications.addListener(
      "pushNotificationReceived",
      async (notification: PushNotificationSchema) => {
        console.log("================================");
        console.log("📩 FOREGROUND PUSH RECEIVED");
        console.log("TITLE:", notification.title);
        console.log("BODY:", notification.body);
        console.log("DATA:", notification.data);
        console.log("================================");

        try {
          await LocalNotifications.schedule({
            notifications: [
              {
                id: Math.floor(
                  Math.random() * 2147483647
                ),

                title:
                  notification.title ||
                  "Task Manager",

                body:
                  notification.body ||
                  "You have a new task",

                channelId: "tasks",

                extra: notification.data,
              },
            ],
          });

          console.log(
            "✅ FOREGROUND LOCAL NOTIFICATION DISPLAYED"
          );

        } catch (error) {
          console.error(
            "❌ FOREGROUND LOCAL NOTIFICATION ERROR:",
            error
          );
        }
      }
    );

    // -------------------------------------------------
    // 3. USER TAPPED PUSH
    // -------------------------------------------------

    await PushNotifications.addListener(
      "pushNotificationActionPerformed",
      (action: ActionPerformed) => {
        console.log("================================");
        console.log("📲 PUSH NOTIFICATION TAPPED");
        console.log(action);
        console.log("================================");

        const taskId =
          action.notification.data?.taskId;

        if (!taskId) {
          console.log("No task ID found in notification");
          return;
        }

        console.log("Opening task:", taskId);

        // Your app uses HashRouter
        window.location.hash =
          `/user/task/${taskId}`;
      }
    );

    // -------------------------------------------------
    // 4. CHECK PERMISSION
    // -------------------------------------------------

    let permissionStatus =
      await PushNotifications.checkPermissions();

    console.log(
      "Current push permission:",
      permissionStatus.receive
    );

    // -------------------------------------------------
    // 5. REQUEST PERMISSION
    // -------------------------------------------------

    if (
      permissionStatus.receive === "prompt"
    ) {
      permissionStatus =
        await PushNotifications.requestPermissions();

      console.log(
        "Requested push permission:",
        permissionStatus.receive
      );
    }

    // -------------------------------------------------
    // 6. STOP IF NOT GRANTED
    // -------------------------------------------------

    if (
      permissionStatus.receive !== "granted"
    ) {
      console.error(
        "❌ PUSH NOTIFICATION PERMISSION NOT GRANTED"
      );

      return false;
    }

    // -------------------------------------------------
    // 6.5 CHECK LOCAL NOTIFICATION PERMISSION
    // -------------------------------------------------

    let localPermission =
      await LocalNotifications.checkPermissions();

    console.log(
      "Local notification permission:",
      localPermission.display
    );

    if (localPermission.display === "prompt") {
      localPermission =
        await LocalNotifications.requestPermissions();

      console.log(
        "Requested local notification permission:",
        localPermission.display
      );
    }

    if (
      localPermission.display !== "granted"
    ) {
      console.error(
        "❌ LOCAL NOTIFICATION PERMISSION NOT GRANTED"
      );

      return false;
    }

    // -------------------------------------------------
    // 7. CREATE ANDROID NOTIFICATION CHANNEL
    // -------------------------------------------------

    try {
      await LocalNotifications.createChannel({
        id: "tasks",
        name: "Task Notifications",
        description: "Task Manager Notifications",
        importance: 5,
        visibility: 1,
        sound: "default",
      });

      console.log(
        "✅ Local notification channel created"
      );
    } catch (channelError) {
      console.error(
        "❌ Notification channel error:",
        channelError
      );
    }

    // -------------------------------------------------
    // 8. REGISTER DEVICE WITH FCM
    // -------------------------------------------------

    console.log(
      "Registering Android device with FCM..."
    );

    await PushNotifications.register();

    console.log(
      "✅ Android FCM registration requested"
    );

    return true;

  } catch (error) {
    console.error(
      "❌ ANDROID PUSH INITIALIZATION ERROR:",
      error
    );

    return false;
  }
}


// =====================================================
// GET IN-APP NOTIFICATIONS
// =====================================================

export const getNotifications = async (
  userId: string
) => {

  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data;
};


// =====================================================
// MARK NOTIFICATION AS READ
// =====================================================

export const markNotificationAsRead = async (
  id: string
) => {

  const { data, error } = await supabase
    .from("notifications")
    .update({
      is_read: true,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};