import "./GoalsSection.css";
import {
  Rocket,
  Smartphone,
  Globe,
  Users,
  Brain,
  IndianRupee,
} from "lucide-react";

const goals = [
  {
    title: "Launch AI Assistant",
    progress: 75,
    icon: Brain,
    color: "purple",
  },
  {
    title: "Release Mobile App",
    progress: 40,
    icon: Smartphone,
    color: "blue",
  },
  {
    title: "Reach 100,000 Users",
    progress: 55,
    icon: Users,
    color: "green",
  },
  {
    title: "Expand Internationally",
    progress: 30,
    icon: Globe,
    color: "orange",
  },
  {
    title: "₹10 Crore Revenue",
    progress: 62,
    icon: IndianRupee,
    color: "red",
  },
  {
    title: "Launch Enterprise Edition",
    progress: 85,
    icon: Rocket,
    color: "indigo",
  },
];

export default function GoalsSection() {
  return (
    <div className="goals-section">

      <div className="section-title">
        <h2>Strategic Goals</h2>
        <p>Track the progress of your long-term company objectives.</p>
      </div>

      <div className="goals-grid">

        {goals.map((goal) => {
          const Icon = goal.icon;

          return (
            <div className="goal-card" key={goal.title}>

              <div className={`goal-icon ${goal.color}`}>
                <Icon size={28} />
              </div>

              <h3>{goal.title}</h3>

              <div className="goal-progress">

                <div className="progress-top">
                  <span>Progress</span>
                  <span>{goal.progress}%</span>
                </div>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}