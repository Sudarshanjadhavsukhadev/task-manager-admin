import "./StatCard.css";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-content">
        <h4>{title}</h4>
        <h2>{value}</h2>
      </div>

      <div className={`stat-icon ${color}`}>
        <Icon />
      </div>
    </div>
  );
}