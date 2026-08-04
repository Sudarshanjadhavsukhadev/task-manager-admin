import "./TopBar.css";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getNotifications,
  markNotificationAsRead,
} from "../../../../services/notification.service";
import { subscribeNotifications } from "../../../../services/realtime.service";

export default function TopBar() {
  const [user, setUser] = useState<any>(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) return;

    const currentUser = JSON.parse(storedUser);
    setUser(currentUser);

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

        if (Notification.permission === "granted") {
          new Notification(notification.title, {
            body: notification.message,
            icon: "/favicon.ico",
          });
        }
      }
    );

    return () => {
      channel.unsubscribe();
    };

  }, []);
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
  }

  return (
    <div className="topbar">

      <div>
        <p className="topbar-greeting">
          {greeting} 👋
        </p>

        <h2 className="topbar-name">
          {user?.full_name || user?.email}
        </h2>
      </div>

      <button
        className="notification-button"
        onClick={() => setOpen(!open)}
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
                    await markNotificationAsRead(n.id);

                    setNotifications((prev) =>
                      prev.map((item) =>
                        item.id === n.id
                          ? { ...item, is_read: true }
                          : item
                      )
                    );

                    setNotificationCount((prev) =>
                      Math.max(prev - 1, 0)
                    );

                    setOpen(false);

                    if (n.task_id) {
                      navigate(`/user/task/${n.task_id}`);
                    }

                  } catch (err) {
                    console.error(err);
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