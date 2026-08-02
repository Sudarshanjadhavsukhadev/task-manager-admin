import "./Header.css";
import {
  Bell,
  Search,
  UserCircle,
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

      <div className="header-search">
        <Search className="search-icon" size={18} />

        <input
          type="text"
          placeholder="Search projects, tasks..."
          className="search-input"
        />
      </div>

      <div className="header-right">

        <div className="header-actions">

          <button
            className="add-project-btn"
            onClick={onAddTask}
          >

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
          <span className="notification-badge">3</span>
        </button>

        <div className="profile-card">
          <UserCircle size={46} className="profile-icon" />

          <div className="profile-info">
            <h4>Admin</h4>
            <p>Administrator</p>
          </div>
        </div>

      </div>

    </header>
  );
}