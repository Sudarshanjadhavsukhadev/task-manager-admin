import "./UserLayout.css";
import { useState } from "react";
import type { ReactNode } from "react";

import UserSidebar from "./UserSidebar";
import UserHeader from "./UserHeader";

interface UserLayoutProps {
  children: ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="user-layout">
      <UserSidebar
        isOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />

      <div className="user-main">
        <UserHeader
          openSidebar={() => setSidebarOpen(true)}
        />

        <main className="user-content">
          {children}
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}