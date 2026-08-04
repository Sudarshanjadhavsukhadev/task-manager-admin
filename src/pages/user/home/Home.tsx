import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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

export default function Home() {
  const [openSheet, setOpenSheet] = useState(false);
  const [tasks, setTasks] = useState<any[]>([]);

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

  // First Load
  useEffect(() => {
    loadTasks();
  }, []);

  // Reload after completing a task
  useEffect(() => {
    if (location.state?.refresh) {
      loadTasks();
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

      <BottomNavigation />
    </div>
  );
}