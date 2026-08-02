import "./Sidebar.css";
import { NavLink } from "react-router-dom";

import {
    LayoutDashboard,
    Users,
    FolderKanban,
    CheckSquare,
    Calendar,
    BarChart3,
    Settings,
    LogOut,
} from "lucide-react";

const menu = [
    {
        icon: LayoutDashboard,
        label: "Dashboard",
        path: "/dashboard",
    },
    {
        icon: Users,
        label: "Users",
        path: "/users",
    },
    {
        icon: FolderKanban,
        label: "Projects",
        path: "/projects",
    },
    {
        icon: CheckSquare,
        label: "Vision",
        path: "/vision",
    },
    {
        icon: Calendar,
        label: "Calendar",
        path: "/calendar",
    },
    {
        icon: BarChart3,
        label: "Reports",
        path: "/reports",
    },
    {
        icon: Settings,
        label: "Settings",
        path: "/settings",
    },
];

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <h1>Task Manager</h1>
            </div>

            <nav className="sidebar-nav">
                <ul>
                    {menu.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.label}
                                to={item.path}
                                className={({ isActive }) =>
                                    isActive ? "sidebar-item active" : "sidebar-item"
                                }
                            >
                                <Icon size={22} />
                                <span>{item.label}</span>
                            </NavLink>
                        );
                    })}
                </ul>
            </nav>

            <div className="sidebar-footer">
                <button className="logout-btn">
                    <LogOut size={22} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}