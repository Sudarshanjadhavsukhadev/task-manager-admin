import "./UserSidebar.css";
import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Calendar,
  Users,
  User,
  Settings,
  LogOut,
} from "lucide-react";

interface UserSidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const menu = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/user/dashboard",
  },
  {
    icon: FolderKanban,
    label: "My Projects",
    path: "/user/projects",
  },
  {
    icon: CheckSquare,
    label: "My Tasks",
    path: "/user/tasks",
  },
  {
    icon: Calendar,
    label: "Calendar",
    path: "/user/calendar",
  },
  {
    icon: Users,
    label: "Team",
    path: "/user/team",
  },
  {
    icon: User,
    label: "Profile",
    path: "/user/profile",
  },
  {
    icon: Settings,
    label: "Settings",
    path: "/user/settings",
  },
];

export default function UserSidebar({
  isOpen,
  closeSidebar,
}: UserSidebarProps) {
  return (
    <aside className={`user-sidebar ${isOpen ? "open" : ""}`}>

      <div className="user-sidebar-logo">
        <h1>Task Manager</h1>
      </div>

      <nav className="user-sidebar-nav">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={closeSidebar}
              className={({ isActive }) =>
                isActive
                  ? "user-sidebar-item active"
                  : "user-sidebar-item"
              }
            >
              <Icon size={22} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}

      </nav>

      <button className="user-logout-btn">
        <LogOut size={22} />
        Logout
      </button>

    </aside>
  );
}