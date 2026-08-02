import "./StepTaskName.css";

type Props = {
  taskName: string;
  setTaskName: (value: string) => void;
  onNext: () => void;
};

export default function StepTaskName({
  taskName,
  setTaskName,
  onNext,
}: Props) {
  return (
    <div className="step-page">

      <h2>Create New Task</h2>

      <p>
        Let's start by giving your task a name.
      </p>

      <div className="task-input">

        <label>Task Name *</label>

        <input
          type="text"
          value={taskName}
          placeholder="Enter task name..."
          onChange={(e) => setTaskName(e.target.value)}
        />

      </div>

      <div className="wizard-footer">

        <button
          className="next-btn"
          disabled={!taskName.trim()}
          onClick={onNext}
        >
          Continue →
        </button>

      </div>

    </div>
  );
}