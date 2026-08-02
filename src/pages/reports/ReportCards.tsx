import "./ReportCards.css";
import {
  ClipboardList,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  Users,
  FolderKanban,
} from "lucide-react";

const cards = [
  {
    title: "Total Tasks",
    value: "245",
    change: "+12%",
    icon: ClipboardList,
    color: "blue",
  },
  {
    title: "Completed",
    value: "180",
    change: "+8%",
    icon: CheckCircle2,
    color: "green",
  },
  {
    title: "Pending",
    value: "40",
    change: "-3%",
    icon: Clock3,
    color: "orange",
  },
  {
    title: "Overdue",
    value: "25",
    change: "+5%",
    icon: AlertTriangle,
    color: "red",
  },
  {
    title: "Active Users",
    value: "28",
    change: "+4%",
    icon: Users,
    color: "purple",
  },
  {
    title: "Projects",
    value: "12",
    change: "+2%",
    icon: FolderKanban,
    color: "indigo",
  },
];

export default function ReportCards() {
  return (
    <div className="report-cards">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div className="report-card" key={card.title}>
            <div className={`card-icon ${card.color}`}>
              <Icon size={26} />
            </div>

            <div className="card-content">
              <span>{card.title}</span>

              <h2>{card.value}</h2>

              <small>{card.change} this month</small>
            </div>
          </div>
        );
      })}
    </div>
  );
}