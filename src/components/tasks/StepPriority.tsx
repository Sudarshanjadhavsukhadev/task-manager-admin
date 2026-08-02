import "./StepPriority.css";
import { AlertTriangle, MinusCircle, ArrowDownCircle } from "lucide-react";

type Props = {
  priority: string;
  setPriority: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
};

const priorities = [
  {
    name: "High",
    color: "high",
    icon: AlertTriangle,
    description: "Requires immediate attention",
  },
  {
    name: "Medium",
    color: "medium",
    icon: MinusCircle,
    description: "Normal priority task",
  },
  {
    name: "Low",
    color: "low",
    icon: ArrowDownCircle,
    description: "Can be completed later",
  },
];

export default function StepPriority({
  priority,
  setPriority,
  onNext,
  onBack,
}: Props) {
  return (
    <div className="step-page">

      <h2>Select Priority</h2>

      <p>Choose the priority for this task.</p>

      <div className="priority-grid">

        {priorities.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.name}
              className={`priority-card ${item.color} ${
                priority === item.name ? "selected" : ""
              }`}
              onClick={() => setPriority(item.name)}
            >
              <Icon size={42} />

              <h3>{item.name}</h3>

              <p>{item.description}</p>
            </div>
          );
        })}

      </div>

      <div className="wizard-footer">

        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>

        <button
          className="next-btn"
          disabled={!priority}
          onClick={onNext}
        >
          Continue →
        </button>

      </div>

    </div>
  );
}