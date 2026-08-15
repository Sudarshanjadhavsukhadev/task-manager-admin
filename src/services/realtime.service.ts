import { supabase } from "../lib/supabase";

export const subscribeNotifications = (
  userId: string,
  callback: (notification: any) => void
) => {
  console.log("👂 Listening for user:", userId);

  return supabase
    .channel(`notifications-${userId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "notifications",
      },
      (payload) => {
        console.log("🔥 REALTIME EVENT:", payload);
        callback(payload.new);
      }
    )
    .subscribe((status) => {
      console.log("📡 Realtime Status:", status);
    });
};