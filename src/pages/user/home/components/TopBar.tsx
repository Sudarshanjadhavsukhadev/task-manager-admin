import "./TopBar.css";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getNotifications,

} from "../../../../services/notification.service";
import { subscribeNotifications } from "../../../../services/realtime.service";

import { supabase } from "../../../../lib/supabase";

export default function TopBar() {

  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) return;

    const currentUser = JSON.parse(storedUser);

    const loadData = async () => {
      try {
        const notifications = await getNotifications(
          currentUser.id
        );

        setNotificationCount(
          notifications.filter(
            (n: any) => !n.is_read
          ).length
        );

        setNotifications(notifications);

      } catch (err) {
        console.error(err);
      }
    };

    loadData();

    const channel = subscribeNotifications(
      currentUser.id,
      async (notification) => {
        console.log("🔥 REALTIME RECEIVED:", notification);
        console.log(notification);

        setNotifications((prev) => [
          notification,
          ...prev,
        ]);

        setNotificationCount((prev) => prev + 1);


      }
    );

    return () => {
      channel.unsubscribe();
    };

  }, []);


  return (
    <div className="topbar">

      <div>
        <h2 className="topbar-name">
          MJK TM
        </h2>
      </div>

      <button
        className="notification-button"
        onClick={async () => {
          // =====================================================
          // CLOSE BELL
          // DELETE ALL NOTIFICATIONS PERMANENTLY
          // =====================================================

          if (open) {
            try {
              const storedUser = localStorage.getItem("user");

              if (storedUser) {
                const currentUser = JSON.parse(storedUser);

                const { error } = await supabase
                  .from("notifications")
                  .delete()
                  .eq("user_id", currentUser.id);

                if (error) {
                  throw error;
                }

                console.log(
                  "✅ ALL NOTIFICATIONS PERMANENTLY DELETED"
                );
              }

              // Clear notifications from UI
              setNotifications([]);

              // Reset badge
              setNotificationCount(0);

            } catch (error) {
              console.error(
                "❌ Failed to delete notifications:",
                error
              );
            }

            setOpen(false);
            return;
          }

          // =====================================================
          // OPEN BELL
          // =====================================================

          setOpen(true);
        }}
      >
        <Bell size={22} />

        {notificationCount > 0 && (
          <span className="notification-badge">
            {notificationCount}
          </span>
        )}
      </button>

      {open && (
        <div className="notification-dropdown">

          {notifications.length === 0 ? (
            <p className="no-notification">
              No notifications
            </p>
          ) : (
            notifications.map((n: any) => (
              <div
                key={n.id}
                className={`notification-item ${!n.is_read ? "unread" : ""
                  }`}
                onClick={async () => {
                  try {
                    // =====================================================
                    // DELETE THIS NOTIFICATION PERMANENTLY
                    // =====================================================

                    const { error } = await supabase
                      .from("notifications")
                      .delete()
                      .eq("id", n.id);

                    if (error) {
                      throw error;
                    }

                    console.log(
                      "✅ Notification permanently deleted:",
                      n.id
                    );

                    // Remove from UI
                    setNotifications((prev) =>
                      prev.filter((item) => item.id !== n.id)
                    );

                    // Decrease badge
                    setNotificationCount((prev) =>
                      Math.max(prev - 1, 0)
                    );

                    // Close notification dropdown
                    setOpen(false);

                    // Open task
                    if (n.task_id) {
                      navigate(`/user/task/${n.task_id}`);
                    }

                  } catch (err) {
                    console.error(
                      "❌ Failed to delete notification:",
                      err
                    );
                  }
                }}
              >
                <strong>{n.title}</strong>

                <p>{n.message}</p>
              </div>
            ))
          )}

        </div>
      )}

    </div>
  );
}