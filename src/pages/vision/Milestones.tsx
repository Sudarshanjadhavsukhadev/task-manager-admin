import "./Milestones.css";
import {
  CheckCircle2,
  Clock3,
  Rocket,
  Flag,
} from "lucide-react";

const milestones = [
  {
    quarter: "Q1 2026",
    title: "Launch MVP",
    status: "Completed",
    icon: CheckCircle2,
  },
  {
    quarter: "Q2 2026",
    title: "1000 Active Users",
    status: "Completed",
    icon: Rocket,
  },
  {
    quarter: "Q3 2026",
    title: "Mobile App Release",
    status: "In Progress",
    icon: Clock3,
  },
  {
    quarter: "Q4 2026",
    title: "Enterprise Launch",
    status: "Upcoming",
    icon: Flag,
  },
];

export default function Milestones() {
  return (
    <div className="milestones">

      <div className="section-title">
        <h2>Quarterly Milestones</h2>

        <p>
          Track the major achievements planned throughout the year.
        </p>
      </div>

      <div className="timeline">

        {milestones.map((item) => {
          const Icon = item.icon;

          return (
            <div className="timeline-item" key={item.quarter}>

              <div className="timeline-icon">
                <Icon size={20} />
              </div>

              <div className="timeline-content">

                <span>{item.quarter}</span>

                <h3>{item.title}</h3>

                <div
                  className={`status-badge ${item.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {item.status}
                </div>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}