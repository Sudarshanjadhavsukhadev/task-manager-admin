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
    PanelLeftClose,
    PanelLeftOpen,
} from "lucide-react";

import type { Dispatch, SetStateAction } from "react";

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

/* ================= SIDEBAR PROPS ================= */

interface SidebarProps {
    collapsed: boolean;
    setCollapsed: Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({
    collapsed,
    setCollapsed,
}: SidebarProps) {

    const navigate = useNavigate();

    /* ================= LOGOUT ================= */

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
        <aside
            className={`sidebar ${
                collapsed ? "collapsed" : ""
            }`}
        >

            {/* ================= LOGO ================= */}

            <div className="sidebar-logo">

               

                <button
                    className="sidebar-toggle"
                    onClick={() =>
                        setCollapsed((prev) => !prev)
                    }
                    title={
                        collapsed
                            ? "Open sidebar"
                            : "Hide sidebar"
                    }
                >
                    {collapsed ? (
                        <PanelLeftOpen size={21} />
                    ) : (
                        <PanelLeftClose size={21} />
                    )}
                </button>

            </div>


            {/* ================= NAVIGATION ================= */}

            <nav className="sidebar-nav">

                <ul>

                    {menu.map((item) => {

                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.label}
                                to={item.path}
                                title={
                                    collapsed
                                        ? item.label
                                        : ""
                                }
                                className={({ isActive }) =>
                                    isActive
                                        ? "sidebar-item active"
                                        : "sidebar-item"
                                }
                            >

                                <Icon size={22} />

                                <span>
                                    {item.label}
                                </span>

                            </NavLink>
                        );

                    })}

                </ul>

            </nav>


            {/* ================= LOGOUT ================= */}

            <div className="sidebar-footer">

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                    title={
                        collapsed
                            ? "Logout"
                            : ""
                    }
                >

                    <LogOut size={22} />

                    <span>
                        Logout
                    </span>

                </button>

            </div>

        </aside>
    );
}