import { useEffect, useState } from "react";
import "./VisionHeader.css";
import {
  Target,
  Rocket,
  CalendarDays,
  TrendingUp,
} from "lucide-react";
import {
  getVisions,
} from "../../services/vision.service";

import { getGoals } from "../../services/goal.service";
import CreateGoalModal from "../../components/vision/CreateGoalModal";

export default function VisionHeader() {
  const [visions, setVisions] = useState<any[]>([]);
  const [selectedVision, setSelectedVision] = useState<any>(null);

  const [goals, setGoals] = useState<any[]>([]);


  const [openGoalModal, setOpenGoalModal] = useState(false);

  useEffect(() => {
    fetchVisions();
    fetchGoals();
  }, []);

  const fetchVisions = async () => {
    try {
      const data = await getVisions();

      setVisions(data);

      if (data.length > 0) {
        setSelectedVision(data[0]);
      }

    } catch (err) {
      console.error(err);
    }
  };

  const fetchGoals = async () => {
    try {
      const data = await getGoals();

      console.log("Goals:", data);

      setGoals(data);

      if (data.length > 0) {
        
      }

    } catch (err) {
      console.error(err);
    }
  };



  if (!selectedVision) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="vision-header theme-blue">

      <div className="vision-board-header">

        <div>
          <h1>Vision Board</h1>
          <p>Manage all your company visions</p>
        </div>

        <button className="create-vision-btn">
          <Target size={18} />
          Create Vision
        </button>

      </div>

      <div className="vision-cards">

        {visions.map((vision) => (

          <div
            key={vision.id}
            className={`vision-card ${selectedVision?.id === vision.id ? "active" : ""
              }`}
            onClick={() => setSelectedVision(vision)}
          >

            <div className="vision-card-top">

              <Target size={22} />

              <span>{vision.progress}%</span>

            </div>

            <h3>{vision.title}</h3>

            <p>{vision.description}</p>

            <div className="vision-card-footer">

              <span>{vision.launch_date}</span>

            </div>

          </div>

        ))}

      </div>

      <div className="vision-left">

        <span className="vision-badge">
          <Target size={16} />
          Company Vision
        </span>

        <h1 className="goal-title">
          {selectedVision.title}
        </h1>

        <p className="goal-description">
          {selectedVision.description}
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

              {selectedVision.launch_date}

            </h3>
          </div>

        </div>

        <div className="vision-stat">

          <TrendingUp size={20} />

          <div>

            <span>Overall Progress</span>

            <h3>

              {selectedVision.progress}%

            </h3>

          </div>

        </div>

        <div className="vision-stat">
          <Target size={20} />
          <div>
            <span>Revenue Goal</span>
            <h3>₹{Number(selectedVision.
              revenue_goal).toLocaleString()}</h3>
          </div>
        </div>

        <div className="vision-stat">

          <Target size={20} />

          <div>

            <span>Total Goals</span>

            <h3>{goals.length}</h3>

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