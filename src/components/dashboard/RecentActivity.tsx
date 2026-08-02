import "./RecentActivity.css";
import {
  CheckCircle,
  UserPlus,
  FolderPlus,
} from "lucide-react";

const activities = [
  {
    icon: CheckCircle,
    title: "Task Completed",
    description: "Rahul completed the Dashboard UI task.",
    time: "10 minutes ago",
  },
  {
    icon: UserPlus,
    title: "New User Added",
    description: "Aman was added to the Development Team.",
    time: "1 hour ago",
  },
  {
    icon: FolderPlus,
    title: "Project Created",
    description: "Mobile App project was created.",
    time: "Today, 9:30 AM",
  },
];

export default function RecentActivity() {
  return (
    <div className="recent-activity">
      <div className="activity-header">
        <h2>Recent Activity</h2>
      </div>

      <div className="activity-list">
        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <div className="activity-item" key={index}>
              <div className="activity-icon">
                <Icon size={22} />
              </div>

              <div className="activity-content">
                <div className="activity-title">
                  {activity.title}
                </div>

                <div className="activity-description">
                  {activity.description}
                </div>

                <div className="activity-time">
                  {activity.time}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}