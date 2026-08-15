import { useState } from "react";
import type { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";

import AddProjectModal from "../projects/AddProjectModal";
import AddScheduleModal from "../schedule/AddScheduleModal";

import "./DashboardLayout.css";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {

  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [openScheduleModal, setOpenScheduleModal] = useState(false);

  // Sidebar state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div
      className={`dashboard-layout ${
        sidebarCollapsed ? "sidebar-collapsed" : ""
      }`}
    >

      {/* ================= SIDEBAR ================= */}

      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />


      {/* ================= HEADER ================= */}

      <Header
        onAddTask={() => setOpenTaskModal(true)}
        onAddSchedule={() => setOpenScheduleModal(true)}
      />


      {/* ================= MAIN ================= */}

      <main className="dashboard-main">
        {children}
      </main>


      {/* ================= MODALS ================= */}

      <AddProjectModal
        open={openTaskModal}
        onClose={() => setOpenTaskModal(false)}
      />

      <AddScheduleModal
        open={openScheduleModal}
        onClose={() => setOpenScheduleModal(false)}
      />

    </div>
  );
}