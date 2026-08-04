import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import DashboardLayout from "../../components/layout/DashboardLayout";
import "./UserDetails.css";
import {
  ArrowLeft,
  Search,
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

  // Search
  const [search, setSearch] = useState("");

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

  const pending = projects.filter(
    (p) => p.status !== "Completed"
  ).length;

  const due = projects.filter((p) => {

    if (p.status === "Completed") return false;

    const created = new Date(p.created_at);

    const dueDate = new Date(
      created.getTime() + 24 * 60 * 60 * 1000
    );

    return new Date() >= dueDate;

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

        if (p.status === "Completed") return false;

        const created = new Date(p.created_at);

        const dueDate = new Date(
          created.getTime() + 24 * 60 * 60 * 1000
        );

        return new Date() >= dueDate;

      });

    }

    if (search.trim()) {

      data = data.filter((p) =>
        p.project_name
          .toLowerCase()
          .includes(search.toLowerCase())
      );

    }

    return data;

  }, [projects, search, activeTab]);
  const highProjects = filteredProjects.filter(
    (p) => p.priority === "High"
  );

  const mediumProjects = filteredProjects.filter(
    (p) => p.priority === "Medium"
  );

  const lowProjects = filteredProjects.filter(
    (p) => p.priority === "Low"
  );

  const pieData = {
    labels: ["Completed", "Pending", "Due"],
    datasets: [
      {
        data: [
          completed,
          pending,
          due,
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

        <button
          className="back-button"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {/* Header */}

        <div className="user-profile">

          <div className="profile-avatar">
            {user?.full_name?.charAt(0)}
          </div>

          <div className="profile-info">

            <h1>{user?.full_name}</h1>

            <p>{user?.email}</p>

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

            <h2>{due}</h2>

            <span>Due</span>

          </div>

        </div>
        <div className="search-box">

          <Search size={20} />

          <input
            type="text"
            placeholder="Search project..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

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
            Due
          </button>

          <button
            className={
              activeTab === "completed"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab("completed")
            }
          >
            Completed
          </button>

        </div>

        {[
          {
            title: "🔴 High Priority",
            projects: highProjects,
            className: "high-title",
          },
          {
            title: "🟡 Medium Priority",
            projects: mediumProjects,
            className: "medium-title",
          },
          {
            title: "🟢 Low Priority",
            projects: lowProjects,
            className: "low-title",
          },
        ].map((group) => (
          <div key={group.title} className="priority-section">

            <h2 className={group.className}>
              {group.title} ({group.projects.length})
            </h2>

            <div className="table-card">

              <table>

                <thead>

                  <tr>
                    <th>Project</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Action</th>
                  </tr>

                </thead>

                <tbody>

                  {group.projects.length === 0 ? (

                    <tr>

                      <td colSpan={4}>
                        No Projects
                      </td>

                    </tr>

                  ) : (

                    group.projects.map((project) => (

                      <tr key={project.id}>

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



          </div>
        ))}

        <div className="analytics-section">

          <div className="analytics-card">

            <h2>Task Status Distribution</h2>

            <Pie
              data={pieData}
              options={pieOptions}
            />

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
              <span>Due</span>
              <strong>{due}</strong>
            </div>

            <div className="summary-item">
              <span>Completion Rate</span>
              <strong>{progress}%</strong>
            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
