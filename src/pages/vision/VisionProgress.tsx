import "./VisionProgress.css";
import {
  Target,
  CheckCircle2,
  Clock3,
  TrendingUp,
} from "lucide-react";

export default function VisionProgress() {
  return (
    <div className="vision-progress">

      <div className="section-title">
        <h2>Vision Progress</h2>
        <p>Overall performance towards company goals.</p>
      </div>

      <div className="progress-circle">

        <svg width="180" height="180">

          <circle
            cx="90"
            cy="90"
            r="70"
            className="circle-bg"
          />

          <circle
            cx="90"
            cy="90"
            r="70"
            className="circle-progress"
            style={{
              strokeDasharray: 440,
              strokeDashoffset: 141,
            }}
          />

        </svg>

        <div className="progress-text">
          <h1>68%</h1>
          <span>Completed</span>
        </div>

      </div>

      <div className="progress-stats">

        <div className="progress-item">
          <Target size={20} />
          <div>
            <h3>12</h3>
            <span>Total Goals</span>
          </div>
        </div>

        <div className="progress-item">
          <CheckCircle2 size={20} />
          <div>
            <h3>8</h3>
            <span>Completed</span>
          </div>
        </div>

        <div className="progress-item">
          <Clock3 size={20} />
          <div>
            <h3>4</h3>
            <span>Remaining</span>
          </div>
        </div>

        <div className="progress-item">
          <TrendingUp size={20} />
          <div>
            <h3>+15%</h3>
            <span>This Quarter</span>
          </div>
        </div>

      </div>

    </div>
  );
}