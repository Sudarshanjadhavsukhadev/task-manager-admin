import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Building2,
  ClipboardList,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import {
  completeTask,
  getTaskById,
} from "../../../../services/project.service";

import "./TaskDetails.css";
import BottomNavigation from "../components/BottomNavigation";
import toast from "react-hot-toast";

export default function TaskDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [task, setTask] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    async function loadTask() {
      try {
        const data = await getTaskById(id as string);

        setTask(data);

      } catch (err) {
        console.error(err);
      }
    }

    loadTask();
  }, [id]);

  if (!task) {
    return (
      <div className="task-details-page">
        <h2 style={{ textAlign: "center", marginTop: "50px" }}>
          Loading...
        </h2>
      </div>
    );
  }
  const handleComplete = async () => {
    try {
      if (!id) return;

      await completeTask(id);

      toast.success("Task completed successfully!");

      // Wait 1 second so the user sees the message
      setTimeout(() => {
        navigate("/user/home", {
          state: {
            refresh: true,
          },
        });
      }, 1000);

    } catch (err) {
      console.error(err);

      toast.error("Failed to complete task");
    }
  };

  return (
    <div className="task-details-page">

      <div className="task-header">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} />
        </button>

        <h1>Task Details</h1>

      </div>

      <div className="task-card">

        <div className="task-title">

          <h2>{task.project_name}</h2>

          <div className="badges">

            <span
              className={`priority ${task.priority.toLowerCase()}`}
            >
              {task.priority}
            </span>

            <span
              className={`status ${task.status.toLowerCase().replace(" ", "-")}`}
            >
              {task.status}
            </span>

          </div>

        </div>

        <div className="description-card">

          <h3>Description</h3>

          <p>
            {task.description}
          </p>

        </div>

        <div className="info-card">

          <h3>Task Information</h3>

          <div className="info-row">
            <Building2 size={18} />

            <div>
              <span>Department</span>
              <p>{task.department}</p>
            </div>
          </div>

          <div className="info-row">
            <ClipboardList size={18} />

            <div>
              <span>Assigned To</span>
              <p>{task.users?.full_name}</p>
            </div>
          </div>

          <div className="info-row">
            <CalendarDays size={18} />

            <div>
              <span>Created On</span>
              <p>{new Date(task.created_at).toLocaleDateString()}</p>
            </div>
          </div>

        </div>

        {task.status !== "Completed" ? (
          <button
            className="complete-btn"
            onClick={handleComplete}
          >
            ✓ Mark as Completed
          </button>
        ) : (
          <button
            className="complete-btn completed"
            disabled
          >
            ✓ Task Completed
          </button>
        )}

      </div>

      <BottomNavigation />

    </div>
  );
}