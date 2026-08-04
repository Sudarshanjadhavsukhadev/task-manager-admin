import { getToken } from "firebase/messaging";
import { messaging } from "../firebase/firebase";
import { supabase } from "../lib/supabase";

// Existing FCM function
export async function getFCMToken() {
  try {
    console.log("===== FCM START =====");

    const permission = await Notification.requestPermission();
    console.log("Permission:", permission);

    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );

    // Wait until the service worker is active
    await navigator.serviceWorker.ready;

    const token = await getToken(messaging, {
      vapidKey:
        "BNXN3l_oLzHcLrFAa3SyH5_HQl0Xd1Glle4pZxTwQ9XLEgyGYIeOImDsMCiV3awF3kdizRyR9LMXF_X1U-4MX58",
      serviceWorkerRegistration: registration,
    });

    console.log("TOKEN =", token);

    console.log("===== FCM END =====");

    return token;
  } catch (e) {
    console.error("FCM ERROR");
    console.error(e);
    return null;
  }
}

// ADD THIS BELOW


export const getNotifications = async (
  userId: string
) => {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

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

  if (error) throw error;

  return data;
};