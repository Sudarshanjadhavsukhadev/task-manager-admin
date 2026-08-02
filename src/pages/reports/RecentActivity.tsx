import "./RecentActivity.css";
import {
  CheckCircle2,
  Clock3,
  AlertTriangle,
} from "lucide-react";

const activities = [
  {
    icon: CheckCircle2,
    title: "Task Completed",
    description: "Mayur completed 'Landing Page Design'",
    time: "10 mins ago",
    color: "green",
  },
  {
    icon: Clock3,
    title: "Task Assigned",
    description: "Rahul was assigned 'API Integration'",
    time: "35 mins ago",
    color: "blue",
  },
  {
    icon: AlertTriangle,
    title: "Task Overdue",
    description: "Marketing Campaign deadline has passed",
    time: "2 hours ago",
    color: "red",
  },
  {
    icon: CheckCircle2,
    title: "Project Updated",
    description: "Production Website milestone completed",
    time: "Yesterday",
    color: "green",
  },
];

export default function RecentActivity() {
  return (
    <div className="recent-activity">
      <div className="section-header">
        <h2>Recent Activity</h2>
      </div>

      <div className="activity-list">
        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <div className="activity-item" key={index}>
              <div className={`activity-icon ${activity.color}`}>
                <Icon size={18} />
              </div>

              <div className="activity-content">
                <h4>{activity.title}</h4>
                <p>{activity.description}</p>
              </div>

              <span>{activity.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}