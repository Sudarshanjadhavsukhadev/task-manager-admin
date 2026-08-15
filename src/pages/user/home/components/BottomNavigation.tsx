import "./BottomNavigation.css";
import {
  House,
  CheckSquare,
  CalendarDays,
  User,
  LogOut,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

type BottomNavigationProps = {
  onTasksClick: () => void;
  onScheduleClick: () => void;
};

export default function BottomNavigation({
  onTasksClick,
  onScheduleClick,
}: BottomNavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("admin");

    navigate("/");
  };


  return (
    <nav className="bottom-nav">

      {/* Home */}
      <button
        className={`nav-item ${location.pathname === "/user/home" ? "active" : ""
          }`}
        onClick={() => {
          document.getElementById("home-top")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }}
      >
        <House size={24} />
        <span>Home</span>
      </button>

      {/* Tasks */}
      {/* Tasks */}
      <button
        className="nav-item"
        onClick={onTasksClick}
      >
        <CheckSquare size={24} />
        <span>Tasks</span>
      </button>

      {/* Schedule */}
      <button
        className={`nav-item ${location.pathname === "/user/schedule" ? "active" : ""
          }`}
        onClick={onScheduleClick}
      >
        <CalendarDays size={24} />
        <span>Schedule</span>
      </button>
      {/* Profile */}
      <button
        className={`nav-item ${location.pathname === "/user/profile" ? "active" : ""
          }`}
        onClick={() => navigate("/user/profile")}
      >
        <User size={24} />
        <span>Profile</span>
      </button>

      {/* Logout */}
      <button
        className="nav-item logout"
        onClick={handleLogout}
      >
        <LogOut size={24} />
        <span>Logout</span>
      </button>

    </nav>
  );
}