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

  return (
    <div className="dashboard-layout">

      <Sidebar />

      <Header
        onAddTask={() => setOpenTaskModal(true)}
        onAddSchedule={() => setOpenScheduleModal(true)}
      />

      <main className="dashboard-main">
        {children}
      </main>

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