import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import DashboardLayout from "../../components/layout/DashboardLayout";
import "./UserDetails.css";
import {
  ArrowLeft,

  Users,
  CheckCircle2,
  Clock3,
  AlertTriangle,
} from "lucide-react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function UserDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  // User
  const [user, setUser] = useState<any>(null);

  // Projects
  const [projects, setProjects] = useState<any[]>([]);

  // Loading
  const [loading, setLoading] = useState(true);

  const [showCompletedModal, setShowCompletedModal] =
    useState(false);


  // Filter
  const [activeTab, setActiveTab] = useState<
    "progress" | "due" | "completed"
  >("progress");
  const loadData = async () => {
    try {
      setLoading(true);

      // Load User
      const { data: userData, error: userError } =
        await supabase
          .from("users")
          .select("*")
          .eq("id", id)
          .single();

      if (userError) throw userError;

      setUser(userData);

      // Load Projects
      const { data: projectData, error: projectError } =
        await supabase
          .from("projects")
          .select("*")
          .eq("assigned_user_id", id)
          .order("created_at", {
            ascending: false,
          });

      if (projectError) throw projectError;

      setProjects(projectData || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadData();

    const channel = supabase
      .channel(`user-${id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "projects",
        },
        () => {
          loadData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);
  const assigned = projects.length;

  const completed = projects.filter(
    (p) => p.status === "Completed"
  ).length;

  const pending = projects.filter((p) => {

    if (p.status === "Completed") {
      return false;
    }

    // No deadline = pending
    if (!p.due_date || !p.due_time) {
      return true;
    }

    const dueDateTime = new Date(
      `${p.due_date}T${p.due_time}`
    );

    // Deadline has not passed
    return new Date() <= dueDateTime;

  }).length;

  const overdue = projects.filter((p) => {

    // Completed projects can never be overdue
    if (p.status === "Completed") {
      return false;
    }

    // No due date/time = not overdue
    if (!p.due_date || !p.due_time) {
      return false;
    }

    const dueDateTime = new Date(
      `${p.due_date}T${p.due_time}`
    );

    return new Date() > dueDateTime;

  }).length;

  const progress =
    assigned === 0
      ? 0
      : Math.round(
        (completed / assigned) * 100
      );


  const filteredProjects = useMemo(() => {

    let data = [...projects];

    if (activeTab === "progress") {

      data = data.filter(
        (p) => p.status !== "Completed"
      );

    }

    if (activeTab === "completed") {

      data = data.filter(
        (p) => p.status === "Completed"
      );

    }

    if (activeTab === "due") {

      data = data.filter((p) => {

        if (p.status === "Completed") {
          return false;
        }

        if (!p.due_date || !p.due_time) {
          return false;
        }

        const dueDateTime = new Date(
          `${p.due_date}T${p.due_time}`
        );

        return new Date() > dueDateTime;

      });

    }



    return data;

  }, [projects, activeTab]);


  const completedProjects = projects.filter(
    (p) => p.status === "Completed"
  );

  const pieData = {
    labels: ["Completed", "Pending", "Overdue"],
    datasets: [
      {
        data: [
          completed,
          pending,
          overdue,
        ],
        backgroundColor: [
          "#22c55e",
          "#f59e0b",
          "#ef4444",
        ],
        borderWidth: 0,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
    },
  };
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: 22,
          fontWeight: 600,
        }}
      >
        Loading User Details...
      </div>
    );
  }
  return (
    <DashboardLayout>
      <div className="user-details-page">



        {/* Header */}

        <div className="user-profile">



          <div className="profile-avatar">
            {user?.full_name?.charAt(0)}
          </div>

          <div className="profile-info">

            <h1>{user?.full_name}</h1>

            <p>{user?.email}</p>

          </div>

          <button
            className="back-button"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} />
            Back
          </button>

        </div>



        {/* Stats */}

        <div className="stats-grid">

          <div className="stat-card">

            <Users size={28} />

            <h2>{assigned}</h2>

            <span>Assigned</span>

          </div>

          <div className="stat-card">

            <CheckCircle2 size={28} />

            <h2>{completed}</h2>

            <span>Completed</span>

          </div>

          <div className="stat-card">

            <Clock3 size={28} />

            <h2>{pending}</h2>

            <span>Pending</span>

          </div>

          <div className="stat-card">

            <AlertTriangle size={28} />

            <h2>{overdue}</h2>

            <span>Overdue</span>

          </div>

        </div>

        <div className="filter-buttons">

          <button
            className={
              activeTab === "progress"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab("progress")
            }
          >
            In Progress
          </button>

          <button
            className={
              activeTab === "due"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab("due")
            }
          >
            Overdue
          </button>

          <button
            onClick={() => setShowCompletedModal(true)}
          >
            Completed
          </button>

        </div>

        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Priority</th>
                <th>Project</th>
                <th>Status</th>
                <th>Created</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={5}>No Projects Found</td>
                </tr>
              ) : (
                filteredProjects.map((project) => (
                  <tr
                    key={project.id}
                    className={`priority-row ${project.priority.toLowerCase()}`}
                  >
                    <td>
                      <span
                        className={`priority-badge ${project.priority.toLowerCase()}`}
                      >
                        {project.priority}
                      </span>
                    </td>

                    <td>{project.project_name}</td>

                    <td>{project.status}</td>

                    <td>
                      {new Date(project.created_at).toLocaleDateString()}
                    </td>

                    <td>
                      <button
                        className="view-project-btn"
                        onClick={() =>
                          navigate(`/admin/project/${project.id}`)
                        }
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>



        <div className="analytics-section">

          <div className="analytics-card">

            <h2>Task Status Distribution</h2>

            <div className="chart-wrapper">
              <Pie data={pieData} options={pieOptions} />
            </div>

          </div>

          <div className="summary-card">

            <h2>Performance Summary</h2>

            <div className="summary-item">
              <span>Assigned</span>
              <strong>{assigned}</strong>
            </div>

            <div className="summary-item">
              <span>Completed</span>
              <strong>{completed}</strong>
            </div>

            <div className="summary-item">
              <span>Pending</span>
              <strong>{pending}</strong>
            </div>

            <div className="summary-item">
              <span>Overdue</span>
              <strong>{overdue}</strong>
            </div>

            <div className="summary-item">
              <span>Completion Rate</span>
              <strong>{progress}%</strong>
            </div>

          </div>

        </div>

        {/* Progress */}

        <div className="progress-section">

          <div className="progress-header">

            <span>Overall Progress</span>

            <strong>{progress}%</strong>

          </div>

          <div className="user-progress-bar">

            <div
              className="user-progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

        {showCompletedModal && (
          <div
            className="modal-overlay"
            onClick={() => setShowCompletedModal(false)}
          >
            <div
              className="completed-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="completed-header">
                <h2>
                  Completed Tasks ({completedProjects.length})
                </h2>

                <button
                  onClick={() =>
                    setShowCompletedModal(false)
                  }
                >
                  ✕
                </button>
              </div>

              <div className="completed-body">
                <table>
                  <thead>
                    <tr>
                      <th>Project</th>
                      <th>Priority</th>
                      <th>Completed</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {completedProjects.map((project) => (
                      <tr key={project.id}>
                        <td>{project.project_name}</td>

                        <td>{project.priority}</td>

                        <td>
                          {new Date(
                            project.created_at
                          ).toLocaleDateString()}
                        </td>

                        <td>
                          <button
                            className="view-project-btn"
                            onClick={() =>
                              navigate(
                                `/admin/project/${project.id}`
                              )
                            }
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>

    </DashboardLayout>
  );
}
