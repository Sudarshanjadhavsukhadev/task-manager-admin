import "./Header.css";
import {
  Bell,
  Plus,
} from "lucide-react";

type Props = {
  onAddTask: () => void;
  onAddSchedule: () => void;
};

export default function Header({
  onAddTask,
  onAddSchedule,
}: Props) {
  return (
    <header className="header">

      {/* ================= HEADER BRAND ================= */}

      <div className="header-brand">
        <div className="header-brand-logo">
          MJK
        </div>

        <div className="header-brand-text">
          <span>TM</span>
          <small>Task Manager</small>
        </div>
      </div>


      {/* ================= RIGHT SIDE ================= */}

      <div className="header-right">

        <div className="header-actions">

          <button
            className="add-project-btn"
            onClick={onAddTask}
          >
            <Plus size={18} />
            <span>Add Task</span>
          </button>

          <button
            className="add-schedule-btn"
            onClick={onAddSchedule}
          >
            <Plus size={18} />
            <span>Add Schedule</span>
          </button>

        </div>


        <button className="notification-btn">
          <Bell size={22} />

          <span className="notification-badge">
            3
          </span>
        </button>

      </div>

    </header>
  );
}