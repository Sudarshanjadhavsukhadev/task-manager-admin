import "./TaskCard.css";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  id: string;
  title: string;
  project: string;
  time: string;
  priority: "High" | "Medium" | "Low";
}

export default function TaskCard({
  id,
  title,
  project,
  time,
  priority,
}: Props) {
  const navigate = useNavigate();

  return (
    <div
      className="task-card"
      onClick={() => navigate(`/user/task/${id}`)}
      style={{ cursor: "pointer" }}
    >
      <div className="task-top">
        <div>
          <h3>{title}</h3>

          <p>{project}</p>
        </div>

        <input
          type="checkbox"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      <div className="task-bottom">
        <div className="task-time">
          <Clock size={15} />
          {time}
        </div>

        <span
          className={`priority ${priority.toLowerCase()}`}
        >
          {priority}
        </span>
      </div>
    </div>
  );
}