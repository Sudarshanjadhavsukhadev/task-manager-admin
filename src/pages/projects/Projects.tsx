import "./Projects.css";
import { useState, useEffect } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import ProjectTable from "../../components/projects/ProjectTable";
import AddProjectModal from "../../components/projects/AddProjectModal";

export default function Projects() {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // or "auto" if you don't want animation
    });
  }, []);



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



        <ProjectTable />

        <AddProjectModal
          open={openModal}
          onClose={() => setOpenModal(false)}
        />
      </div>
    </DashboardLayout>
  );
}