import "./WelcomeCard.css";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  tasks: any[];
};

export default function WelcomeCard({ tasks }: Props) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status !== "Completed"
  ).length;

  const percentage =
    totalTasks === 0
      ? 100
      : Math.round((completedTasks / totalTasks) * 100);

  let message = "🚀 Keep Going";

  if (percentage === 100) {
    message = "🎉 Great Job!";
  } else if (percentage >= 75) {
    message = "🔥 Almost Done";
  } else if (percentage >= 50) {
    message = "💪 Keep Going";
  } else {
    message = "🚀 Let's Get Started";
  }

  return (
    <div className="welcomeTrainer-card">

      <div className="welcomeTrainer-top">

        <div>

          <p className="welcomeTrainer-subtitle">
            👋 Welcome Back
          </p>

          <h2>
            {user?.full_name || user?.email}
          </h2>

        </div>

        <button className="welcomeTrainer-btn">
          <ArrowUpRight size={20} />
        </button>

      </div>

      <p className="welcomeTrainer-text">
        You have <strong>{pendingTasks}</strong> task{pendingTasks !== 1 ? "s" : ""} to complete today.
      </p>

      <div className="Trainer-progress">

        <div
          className="Trainer-progress-fill"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      <div className="welcomeTrainer-footer">

        <span>{percentage}% Completed</span>

        <span>{message}</span>

      </div>

    </div>
  );
}