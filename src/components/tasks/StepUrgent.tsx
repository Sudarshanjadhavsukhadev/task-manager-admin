import "./StepUrgent.css";
import { Siren, Clock3 } from "lucide-react";

type Props = {
  urgent: boolean | null;
  setUrgent: (value: boolean) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function StepUrgent({
  urgent,
  setUrgent,
  onNext,
  onBack,
}: Props) {
  return (
    <div className="step-page">

      <h2>Is this task urgent?</h2>

      <p>Select whether this task needs immediate attention.</p>

      <div className="urgent-grid">

        <div
          className={`urgent-card ${urgent === true ? "selected" : ""}`}
          onClick={() => setUrgent(true)}
        >
          <Siren size={42} />

          <h3>Yes</h3>

          <p>Requires immediate action</p>
        </div>

        <div
          className={`urgent-card ${urgent === false ? "selected" : ""}`}
          onClick={() => setUrgent(false)}
        >
          <Clock3 size={42} />

          <h3>No</h3>

          <p>Can be completed as scheduled</p>
        </div>

      </div>

      <div className="wizard-footer">

        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>

        <button
          className="next-btn"
          disabled={urgent === null}
          onClick={onNext}
        >
          Continue →
        </button>

      </div>

    </div>
  );
}