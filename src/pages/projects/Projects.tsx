import "./Projects.css";
import { useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import ProjectFilters from "../../components/projects/ProjectFilters";
import ProjectTable from "../../components/projects/ProjectTable";
import AddProjectModal from "../../components/projects/AddProjectModal";

export default function Projects() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <DashboardLayout>
      <div className="projects-page">
        <div className="projects-header">
          <div>
            <h1>Projects</h1>
            <p>Manage all company projects.</p>
          </div>

          <button
            className="add-project-btn"
            onClick={() => setOpenModal(true)}
          >
            Add Project
          </button>
        </div>

        <ProjectFilters />

        <ProjectTable />

        <AddProjectModal
          open={openModal}
          onClose={() => setOpenModal(false)}
        />
      </div>
    </DashboardLayout>
  );
}