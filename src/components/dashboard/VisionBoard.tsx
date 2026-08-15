import { useEffect, useState } from "react";
import "./VisionBoard.css";
import { getVisions } from "../../services/vision.service";

export default function VisionBoard() {
  const [vision, setVision] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVision();
  }, []);

  const fetchVision = async () => {
    try {
      const data = await getVisions();

      console.log("Vision Data:", data);

      if (data.length > 0) {
        setVision(data[0]); // Latest vision
      }

    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!vision) {
    return <h2>No Vision Found</h2>;
  }

  return (
    <div className="vision-board">

      <div className="vision-left">

        <h2>🎯 Company Vision</h2>

        <p>{vision.description}</p>

        <div className="vision-progress">

          <span>{vision.current_focus}</span>

          <div className="progress">
            <div
              className="progress-fill"
              style={{
                width: `${vision.progress}%`,
              }}
            />
          </div>

        </div>

      </div>

      <div className="vision-right">

        <div className="goal-card">

          <h4>Launch Date</h4>

          <span>{vision.launch_date}</span>

        </div>

        <div className="goal-card">

          <h4>Revenue Goal</h4>

          <span>{vision.revenue_goal}</span>

        </div>

        <div className="goal-card">

          <h4>Current Focus</h4>

          <span>{vision.current_focus}</span>

        </div>

      </div>

    </div>
  );
}