import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { getProjects } from "../../services/project.service";
import "./ProjectTable.css";

export default function ProjectTable() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="project-table-card">
      <table className="project-table">
        <thead>
          <tr>
            <th>Project</th>
            <th>Client</th>
            <th>Start</th>
            <th>Due</th>
            <th>Progress</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.project_name}</td>
              <td>{project.client}</td>
              <td>{project.start_date}</td>
              <td>{project.due_date}</td>

              <td>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <small>{project.progress}%</small>
              </td>

              <td>
                <span className={`priority ${project.priority.toLowerCase()}`}>
                  {project.priority}
                </span>
              </td>

              <td>
                <span className={`status ${project.status.toLowerCase().replace(" ", "-")}`}>
                  {project.status}
                </span>
              </td>

              <td className="actions">
                <button>
                  <Pencil size={18} />
                </button>

                <button className="delete">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}