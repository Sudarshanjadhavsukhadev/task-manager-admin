import { getToken } from "firebase/messaging";
import { messaging } from "../firebase/firebase";

// Existing FCM function
export async function getFCMToken() {
  try {
    console.log("===== FCM START =====");

    const permission = await Notification.requestPermission();
    console.log("Permission:", permission);

    const token = await getToken(messaging, {
      vapidKey:
        "BNXN3l_oLzHcLrFAa3SyH5_HQl0Xd1Glle4pZxTwQ9XLEgyGYIeOImDsMCiV3awF3kdizRyR9LMXF_X1U-4MX58",
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
const API_URL = "http://localhost:5000/api/notifications";

export const getNotifications = async (
  userId: string
) => {
  const res = await fetch(`${API_URL}/${userId}`);

  if (!res.ok) {
    throw new Error("Failed to load notifications");
  }

  return res.json();
};

export const markNotificationAsRead = async (
  id: string
) => {
  const res = await fetch(
    `${API_URL}/${id}/read`,
    {
      method: "PUT",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update notification");
  }

  return res.json();
};