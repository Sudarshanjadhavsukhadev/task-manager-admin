import {
  Target,
  CalendarDays,
  ArrowRight,
} from "lucide-react";
import "./VisionCard.css";
type Vision = {
  id: string;
  title: string;
  description: string;
  progress: number;
  launch_date: string;
};

type Props = {
  vision: Vision;
  goalCount: number;
  active: boolean;
  onClick: () => void;
};

export default function VisionCard({
  vision,
  goalCount,
  active,
  onClick,
}: Props) {
  return (
    <div
      className={`vision-card ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <div className="vision-card-header">
        <div className="vision-icon">
          <Target size={22} />
        </div>

        <span className="vision-progress">
          {vision.progress}%
        </span>
      </div>

      <h3>{vision.title}</h3>

      <p>{vision.description}</p>

      <div className="vision-progress-bar">
        <div
          className="vision-progress-fill"
          style={{ width: `${vision.progress}%` }}
        />
      </div>

      <div className="vision-info">

        <div>
          <Target size={16} />
          <span>{goalCount} Goals</span>
        </div>

        <div>
          <CalendarDays size={16} />
          <span>{vision.launch_date}</span>
        </div>

      </div>

      <button className="open-vision-btn">
        Open Vision
        <ArrowRight size={16} />
      </button>
    </div>
  );
}