import { useEffect, useState } from "react";
import "./VisionHeader.css";
import {
  Target,
  Rocket,
  CalendarDays,
  TrendingUp,
} from "lucide-react";

import { getVision } from "../../services/vision.service";
import { getGoals } from "../../services/goal.service";
import CreateGoalModal from "../../components/vision/CreateGoalModal";

export default function VisionHeader() {
  const [vision, setVision] = useState<any>(null);

  const [goals, setGoals] = useState<any[]>([]);
  const [currentGoal, setCurrentGoal] = useState(0);

  const [openGoalModal, setOpenGoalModal] = useState(false);

  useEffect(() => {
    fetchVision();
    fetchGoals();
  }, []);

  const fetchVision = async () => {
    try {
      const data = await getVision();
      console.log("Vision:", data);
      setVision(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchGoals = async () => {
    try {
      const data = await getGoals();

      console.log("Goals:", data);

      setGoals(data);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {

    if (!goals.length) return;

    const timer = setInterval(() => {

      setCurrentGoal((prev) => {

        if (prev === goals.length - 1) {

          return 0;

        }

        return prev + 1;

      });

    }, 5000);

    return () => clearInterval(timer);

  }, [goals]);

  if (!vision) {
    return <h2>Loading...</h2>;
  }

  return (
    <div
      className={`vision-header ${goals.length > 0
          ? [
            "theme-blue",
            "theme-purple",
            "theme-green",
            "theme-orange",
          ][currentGoal % 4]
          : "theme-blue"
        }`}
    >

      <div className="vision-left">

        <span className="vision-badge">
          <Target size={16} />
          Company Vision
        </span>

        <h1 className="goal-title">

          {goals.length > 0
            ? goals[currentGoal].title
            : vision.company_vision}

        </h1>

        <p className="goal-description">

          {goals.length > 0
            ? goals[currentGoal].description
            : "Our mission is to simplify productivity, empower teams and build the most powerful task management platform."}

        </p>

        <div className="vision-buttons">

          <div className="top-buttons">

            <button className="primary-btn">
              <Rocket size={18} />
              View Roadmap
            </button>

            <button className="secondary-btn">
              Update Vision
            </button>

          </div>

          <button
            className="create-goal-btn"
            onClick={() => setOpenGoalModal(true)}
          >
            <Target size={18} />
            Create New Goal
          </button>

        </div>

      </div>

      <div className="vision-right">

        <div className="vision-stat">

          <CalendarDays size={20} />

          <div>

            <span>Target Year</span>

            <h3>

              {goals.length > 0
                ? goals[currentGoal].due_date
                : vision.launch_date}

            </h3>
          </div>

        </div>

        <div className="vision-stat">

          <TrendingUp size={20} />

          <div>

            <span>Overall Progress</span>

            <h3>

              {goals.length > 0
                ? `${goals[currentGoal].progress}%`
                : `${vision.progress}%`}

            </h3>

          </div>

        </div>

        <div className="vision-stat">
          <Target size={20} />
          <div>
            <span>Revenue Goal</span>
            <h3>₹{Number(vision.revenue_goal).toLocaleString()}</h3>
          </div>
        </div>

        <div className="vision-stat">

          <Target size={20} />

          <div>

            <span>Major Goals</span>

            <h3>{vision.major_goals}</h3>

          </div>

        </div>

        {/* ================= Goal Slider ================= */}



      </div>

      <CreateGoalModal
        open={openGoalModal}
        onClose={() => {
          setOpenGoalModal(false);
          fetchGoals();
        }}
      />

    </div>
  );
}