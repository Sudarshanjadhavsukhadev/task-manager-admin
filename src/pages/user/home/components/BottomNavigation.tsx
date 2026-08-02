import "./BottomNavigation.css";
import {
  House,
  CheckSquare,
  CalendarDays,
  User,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="bottom-nav">

      {/* Home */}
      <button
        className={`nav-item ${location.pathname === "/user/home" ? "active" : ""
          }`}
        onClick={() => {
          document
            .getElementById("home-top")
            ?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
        }}
      >
        <House size={24} />
        <span>Home</span>
      </button>

      {/* Tasks */}
      <button
        className="nav-item"
        onClick={() => {
          document
            .getElementById("today-tasks")
            ?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
        }}
      >
        <CheckSquare size={24} />
        <span>Tasks</span>
      </button>

      {/* Schedule */}
      <button
        className={`nav-item ${location.pathname === "/user/schedule" ? "active" : ""
          }`}
        onClick={() => {
          document
            .getElementById("today-schedule")
            ?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
        }}
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

    </nav>
  );
}