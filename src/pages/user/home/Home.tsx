import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CheckSquare } from "lucide-react";
import "./Home.css";

import TopBar from "./components/TopBar";
import SearchBar from "./components/SearchBar";
import WelcomeCard from "./components/WelcomeCard";
import TaskList from "./components/TaskList";

import BottomNavigation from "./components/BottomNavigation";
import ProgressCard from "./components/ProgressCard";
import UpcomingSchedule from "./components/UpcomingSchedule";
import QuickAddSheet from "./components/QuickAddSheet";

import { getProjectsByUser } from "../../../services/project.service";
import { getSchedules } from "../../../services/schedule.service";
import { supabase } from "../../../lib/supabase";
import { CalendarDays } from "lucide-react";
export default function Home() {
  const [openSheet, setOpenSheet] = useState(false);
  const [tasks, setTasks] = useState<any[]>([]);
  const [showTasksPopup, setShowTasksPopup] = useState(false);
  const [showSchedulePopup, setShowSchedulePopup] = useState(false);
  const [schedules, setSchedules] = useState<any[]>([]);
  const location = useLocation();

  // Load Tasks
  const loadTasks = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    console.log("Logged User:", user);
    console.log("Logged User ID:", user.id);

    if (!user.id) return;

    try {
      const data = await getProjectsByUser(user.id);

      console.log("Projects from Supabase:", data);

      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadSchedules = async () => {
    try {
      const data = await getSchedules();

      setSchedules(data);
    } catch (err) {
      console.error("Failed to load schedules:", err);
    }
  };

  // First Load
  // =====================================================
  // LOAD TASKS + REALTIME UPDATES
  // =====================================================

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    if (!user.id) {
      console.log("No logged user found");
      return;
    }

    // Initial load
    loadTasks();
    loadSchedules();

    console.log(
      "🔴 Starting realtime task listener for:",
      user.id
    );

    // Listen for project changes
    const channel = supabase
      .channel(`user-projects-${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "projects",
          filter: `assigned_user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log(
            "📌 NEW TASK RECEIVED:",
            payload.new
          );

          // Add the new task immediately
          setTasks((currentTasks) => {
            const alreadyExists =
              currentTasks.some(
                (task) =>
                  task.id === payload.new.id
              );

            if (alreadyExists) {
              return currentTasks;
            }

            return [
              payload.new,
              ...currentTasks,
            ];
          });
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "projects",
          filter: `assigned_user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log(
            "🔄 TASK UPDATED:",
            payload.new
          );

          setTasks((currentTasks) =>
            currentTasks.map((task) =>
              task.id === payload.new.id
                ? payload.new
                : task
            )
          );
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "projects",
        },
        (payload) => {
          console.log(
            "🗑️ TASK DELETED:",
            payload.old
          );

          setTasks((currentTasks) =>
            currentTasks.filter(
              (task) =>
                task.id !== payload.old.id
            )
          );
        }
      )
      .subscribe((status) => {
        console.log(
          "Realtime status:",
          status
        );
      });

    // Cleanup
    return () => {
      console.log(
        "🔴 Removing realtime task listener"
      );

      supabase.removeChannel(channel);
    };
  }, []);

  // Reload after completing a task
  useEffect(() => {
    if (location.state?.refresh) {
      loadTasks();
    }

    if (location.state?.openTasks) {
      setShowTasksPopup(true);
    }

    if (location.state?.openSchedule) {
      loadSchedules();
      setShowSchedulePopup(true);
    }

    // Clear navigation state after handling it
    if (
      location.state?.openTasks ||
      location.state?.openSchedule ||
      location.state?.refresh
    ) {
      window.history.replaceState(
        {},
        document.title,
        window.location.href
      );
    }
  }, [location]);

  // Scroll to Today's Tasks
  useEffect(() => {
    if (location.hash === "#today-tasks") {
      setTimeout(() => {
        document
          .getElementById("today-tasks")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);
    }
  }, [location]);

  return (
    <div className="home-page">
      <div id="home-top">
        <TopBar />
        <SearchBar />
        <WelcomeCard tasks={tasks} />
      </div>

      <div id="today-tasks">
        <TaskList
          tasks={tasks.filter(task => task.status !== "Completed")}
        />
      </div>

      <ProgressCard tasks={tasks} />

      <div id="today-schedule">
        <UpcomingSchedule />
      </div>



      <QuickAddSheet
        open={openSheet}
        onClose={() => setOpenSheet(false)}
      />


      {/* =====================================================
    TASKS POPUP
===================================================== */}

      {showTasksPopup && (
        <div
          className="tasks-popup-overlay"
          onClick={() => setShowTasksPopup(false)}
        >

          <div
            className="tasks-popup"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="tasks-popup-header">

              <div>
                <h2>My Tasks</h2>
                <p>
                  {tasks.filter(
                    (task) => task.status !== "Completed"
                  ).length}{" "}
                  pending tasks
                </p>
              </div>

              <button
                className="tasks-popup-close"
                onClick={() => setShowTasksPopup(false)}
              >
                ×
              </button>

            </div>


            <div className="tasks-popup-list">

              {tasks.filter(
                (task) => task.status !== "Completed"
              ).length === 0 ? (

                <div className="no-tasks-popup">
                  <CheckSquare size={40} />
                  <h3>No pending tasks</h3>
                  <p>
                    You're all caught up!
                  </p>
                </div>

              ) : (

                tasks
                  .filter(
                    (task) => task.status !== "Completed"
                  )
                  .map((task) => (

                    <div
                      className="popup-task-card"
                      key={task.id}
                    >

                      <div className="popup-task-icon">
                        <CheckSquare size={20} />
                      </div>

                      <div className="popup-task-content">

                        <h3>
                          {task.project_name}
                        </h3>

                        <p>
                          {task.description ||
                            "No description"}
                        </p>

                        <span
                          className={`popup-task-status ${task.status
                            ?.toLowerCase()
                            .replace(" ", "-")
                            }`}
                        >
                          {task.status}
                        </span>

                      </div>

                    </div>

                  ))

              )}

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
    SCHEDULES POPUP
===================================================== */}

      {showSchedulePopup && (
        <div
          className="tasks-popup-overlay"
          onClick={() => setShowSchedulePopup(false)}
        >

          <div
            className="tasks-popup"
            onClick={(e) => e.stopPropagation()}
          >

            {/* HEADER */}

            <div className="tasks-popup-header">

              <div>
                <h2>My Schedule</h2>

                <p>
                  {schedules.length} upcoming schedule
                  {schedules.length !== 1 ? "s" : ""}
                </p>
              </div>

              <button
                className="tasks-popup-close"
                onClick={() => setShowSchedulePopup(false)}
              >
                ×
              </button>

            </div>


            {/* SCHEDULE LIST */}

            <div className="tasks-popup-list">

              {schedules.length === 0 ? (

                <div className="no-tasks-popup">

                  <CalendarDays size={40} />

                  <h3>No upcoming schedules</h3>

                  <p>
                    You don't have any upcoming schedules.
                  </p>

                </div>

              ) : (

                schedules.map((schedule) => (

                  <div
                    className="popup-task-card"
                    key={schedule.id}
                  >

                    {/* ICON */}

                    <div className="popup-task-icon">
                      <CalendarDays size={20} />
                    </div>


                    {/* CONTENT */}

                    <div className="popup-task-content">

                      <h3>
                        {schedule.meeting_name || "Schedule"}
                      </h3>

                      <p>
                        {schedule.location || "No location"}
                      </p>


                      {/* DATE */}

                      <span className="schedule-popup-date">

                        {schedule.start_date
                          ? new Date(
                            `${schedule.start_date}T00:00:00`
                          ).toLocaleDateString([], {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                          : "Date not available"}

                      </span>


                      {/* TIME */}

                      <span className="schedule-popup-time">

                        {schedule.start_time
                          ? new Date(
                            `1970-01-01T${schedule.start_time}`
                          ).toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })
                          : "Time not available"}

                      </span>

                    </div>

                  </div>

                ))

              )}

            </div>

          </div>

        </div>
      )}


      <BottomNavigation
        onTasksClick={() => setShowTasksPopup(true)}
        onScheduleClick={() => {
          loadSchedules();
          setShowSchedulePopup(true);
        }}
      />


    </div>
  );
}