import { useEffect, useState } from "react";
import "./UserHeader.css";

import {
  Bell,
  Search,
  Menu,
} from "lucide-react";

interface UserHeaderProps {
  openSidebar: () => void;
}

export default function UserHeader({
  openSidebar,
}: UserHeaderProps) {

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <header className="user-header">

      <div className="header-left">

        <button
          className="menu-btn"
          onClick={openSidebar}
        >
          <Menu size={24} />
        </button>

        <div className="search-box">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search projects, tasks..."
          />

        </div>

      </div>

      <div className="header-right">

        <button className="notification-btn">

          <Bell size={20} />

          <span className="notification-dot"></span>

        </button>

        <div className="user-profile">

          <img
            src="https://i.pravatar.cc/100"
            alt="User"
          />

          <div>

            <h4>
              {user?.full_name || user?.email}
            </h4>

            <span>Team Member</span>

          </div>

        </div>

      </div>

    </header>
  );
}