import "./StepDepartment.css";
import { GraduationCap, Film, User } from "lucide-react";

type Props = {
  department: string;
  setDepartment: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
};

const departments = [
  {
    name: "MJK Academy",
    icon: GraduationCap,
    description: "Academy related tasks",
  },
  {
    name: "MJK Production",
    icon: Film,
    description: "Production & media work",
  },
  {
    name: "Personal Use",
    icon: User,
    description: "Personal reminders & tasks",
  },
];

export default function StepDepartment({
  department,
  setDepartment,
  onNext,
  onBack,
}: Props) {
  return (
    <div className="step-page">

      <h2>Select Department</h2>

      <p>Choose where this task belongs.</p>

      <div className="department-grid">

        {departments.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.name}
              className={`department-card ${
                department === item.name ? "selected" : ""
              }`}
              onClick={() => setDepartment(item.name)}
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
          disabled={!department}
          onClick={onNext}
        >
          Continue →
        </button>

      </div>

    </div>
  );
}