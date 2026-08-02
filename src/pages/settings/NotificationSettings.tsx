import "./NotificationSettings.css";
import { Bell } from "lucide-react";
import { useState } from "react";

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    email: true,
    push: true,
    reminder: true,
    weekly: false,
    desktop: true,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    });
  };

  const items = [
    {
      key: "email",
      title: "Email Notifications",
      desc: "Receive important updates via email.",
    },
    {
      key: "push",
      title: "Push Notifications",
      desc: "Receive instant push notifications.",
    },
    {
      key: "reminder",
      title: "Task Reminders",
      desc: "Get reminders before due dates.",
    },
    {
      key: "weekly",
      title: "Weekly Reports",
      desc: "Receive a weekly productivity report.",
    },
    {
      key: "desktop",
      title: "Desktop Notifications",
      desc: "Show notifications while using the app.",
    },
  ];

  return (
    <div className="notification-settings">
      <div className="settings-card-header">
        <h2>
          <Bell size={22} />
          Notifications
        </h2>

        <p>Choose how you'd like to receive notifications.</p>
      </div>

      <div className="notification-list">
        {items.map((item) => (
          <div className="notification-item" key={item.key}>
            <div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>

            <label className="switch">
              <input
                type="checkbox"
                checked={settings[item.key as keyof typeof settings]}
                onChange={() =>
                  toggle(item.key as keyof typeof settings)
                }
              />
              <span className="slider"></span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}