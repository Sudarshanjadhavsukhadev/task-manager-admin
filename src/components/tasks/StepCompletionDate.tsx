import "./StepCompletionDate.css";

type Props = {
  dueDate: string;
  setDueDate: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function StepCompletionDate({
  dueDate,
  setDueDate,
  onNext,
  onBack,
}: Props) {
  return (
    <div className="step-page">

      <h2>Completion Date</h2>

      <p>When should this task be completed?</p>

      <div className="date-box">
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div className="wizard-footer">
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>

        <button
          className="next-btn"
          disabled={!dueDate}
          onClick={onNext}
        >
          Review →
        </button>
      </div>

    </div>
  );
}