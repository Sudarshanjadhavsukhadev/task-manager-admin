import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import {
    LayoutDashboard,
    Users,
    FolderKanban,
    CheckSquare,

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

    const navigate = useNavigate();

    const handleLogout = async () => {
        const confirmLogout = window.confirm(
            "Are you sure you want to logout?"
        );

        if (!confirmLogout) return;

        await supabase.auth.signOut();

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");
    };
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
                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    <LogOut size={22} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}