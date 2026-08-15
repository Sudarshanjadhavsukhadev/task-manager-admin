import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import {
  getProjects,
  deleteProject,
} from "../../services/project.service";
import "./ProjectTable.css";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";
import { supabase } from "../../lib/supabase";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);



export default function ProjectTable() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    fetchProjects();

    const channel = supabase
      .channel("projects-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "projects",
        },
        () => {
          fetchProjects();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchProjects = async () => {

    try {

      setLoading(true);

      const data = await getProjects();

      setProjects(data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  };
  const handleDelete = async (id: string) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {

      await deleteProject(id);

      alert("Project deleted successfully.");

      fetchProjects();

    } catch (err) {
      console.error(err);
      alert("Failed to delete project.");
    }
  };

  if (loading) {

    return (
      <div className="project-loading">

        <div className="loader"></div>

        <p>Loading projects...</p>

      </div>
    );

  }

  const academyCount = projects.filter(
    (p) => p.department === "MJK Academy"
  ).length;

  const productionCount = projects.filter(
    (p) => p.department === "MJK Production"
  ).length;

  const personalCount = projects.filter(
    (p) => p.department === "Personal"
  ).length;

  const departmentData = {
    labels: [
      "MJK Academy",
      "MJK Production",
      "Personal",
    ],
    datasets: [
      {
        data: [
          academyCount,
          productionCount,
          personalCount,
        ],
        backgroundColor: [
          "#2563eb",
          "#10b981",
          "#f59e0b",
        ],
        borderWidth: 0,
      },
    ],
  };

  const filteredProjects = selectedDate
    ? projects.filter((project) => {
      const projectDate = new Date(project.created_at);

      const year = projectDate.getFullYear();
      const month = String(
        projectDate.getMonth() + 1
      ).padStart(2, "0");
      const day = String(
        projectDate.getDate()
      ).padStart(2, "0");

      const formattedProjectDate =
        `${year}-${month}-${day}`;

      return formattedProjectDate === selectedDate;
    })
    : projects;

  return (
    <>

      <div className="department-card">

        <h2>Department Distribution</h2>

        <div className="department-chart">

          <div className="chart-box">

            <Doughnut
              data={departmentData}
              options={{
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                  legend: {
                    position: "right",
                  },
                },

                cutout: "68%",
              }}
            />

          </div>

          <div className="department-summary">

            <div>
              🎓 <strong>MJK Academy</strong>
              <span>{academyCount} Projects</span>
            </div>

            <div>
              🎬 <strong>MJK Production</strong>
              <span>{productionCount} Projects</span>
            </div>

            <div>
              👤 <strong>Personal</strong>
              <span>{personalCount} Projects</span>
            </div>

          </div>

        </div>

      </div>

      <div className="project-table-section">

        <div className="project-date-filter">

          <div className="date-filter-left">

            <label htmlFor="project-date">
              View Projects By Date
            </label>

            <input
              id="project-date"
              type="date"
              value={selectedDate}
              onChange={(e) =>
                setSelectedDate(e.target.value)
              }
            />

          </div>

          {selectedDate && (
            <button
              className="clear-date-btn"
              onClick={() =>
                setSelectedDate(
                  new Date().toISOString().split("T")[0]
                )
              }
            >
              Clear Date
            </button>
          )}

        </div>


        <div className="project-table-card">
          <table className="project-table">

            <thead>

              <tr>

                <th>Project</th>

                <th>Start Date</th>

                <th>Priority</th>

                <th>Status</th>

                <th>Delete</th>

              </tr>

            </thead>



            <tbody>

              {filteredProjects.map((project) => (

                <tr key={project.id}>

                  <td>{project.project_name}</td>



                  <td>

                    {new Date(project.created_at).toLocaleDateString("en-GB")}

                  </td>



                  <td>

                    <span

                      className={`priority ${project.priority.toLowerCase()}`}

                    >

                      {project.priority}

                    </span>

                  </td>



                  <td>

                    <span

                      className={`status ${project.status

                        .toLowerCase()

                        .replace(" ", "-")}`}

                    >

                      {project.status}

                    </span>

                  </td>



                  <td className="actions">

                    <button

                      className="delete"

                      onClick={() => handleDelete(project.id)}

                    >

                      <Trash2 size={18} />

                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>
        </div>

      </div>

    </>
  );
}