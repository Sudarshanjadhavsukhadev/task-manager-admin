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
  const [completing, setCompleting] = useState(false);

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
      if (!id || completing) return;

      setCompleting(true);

      await completeTask(id);

      // Immediately update the UI
      setTask((prev: any) => ({
        ...prev,
        status: "Completed",
      }));

      toast.success("Task completed successfully!");

      setTimeout(() => {
        navigate("/user/home", {
          state: {
            refresh: true,
          },
        });
      }, 1000);

    } catch (err) {
      console.error(err);

      setCompleting(false);

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

          {/* Department */}
          <div className="info-row">
            <Building2 size={18} />

            <div>
              <span>Department</span>
              <p>{task.department}</p>
            </div>
          </div>

          {/* Assigned To */}
          <div className="info-row">
            <ClipboardList size={18} />

            <div>
              <span>Assigned To</span>
              <p>{task.users?.full_name || "Assigned User"}</p>
            </div>
          </div>

          {/* Created On */}
          <div className="info-row">
            <CalendarDays size={18} />

            <div>
              <span>Created On</span>
              <p>
                {task.created_at
                  ? new Date(task.created_at).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* Due Date */}
          <div className="info-row">
            <CalendarDays size={18} />

            <div>
              <span>Due Date</span>
              <p>
                {task.due_date
                  ? new Date(
                    `${task.due_date}T00:00:00`
                  ).toLocaleDateString()
                  : "No due date"}
              </p>
            </div>
          </div>

          {/* Due Time */}
          <div className="info-row">
            <CalendarDays size={18} />

            <div>
              <span>Due Time</span>
              <p>
                {task.due_time
                  ? new Date(
                    `1970-01-01T${task.due_time}`
                  ).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })
                  : "No due time"}
              </p>
            </div>
          </div>

        </div>
        {task.status !== "Completed" ? (
          <button
            className={`complete-btn ${completing ? "completing" : ""
              }`}
            onClick={handleComplete}
            disabled={completing}
          >
            {completing ? (
              <>
                <span className="button-spinner"></span>
                Completing...
              </>
            ) : (
              <>
                ✓ Mark as Completed
              </>
            )}
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

      <BottomNavigation
        onTasksClick={() =>
          navigate("/user/home", {
            state: {
              openTasks: true,
            },
          })
        }

        onScheduleClick={() =>
          navigate("/user/home", {
            state: {
              openSchedule: true,
            },
          })
        }
      />

    </div>
  );
}