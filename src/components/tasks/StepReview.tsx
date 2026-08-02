import "./StepReview.css";

type User = {
  id: number;
  name: string;
  role: string;
};

type Props = {
  taskName: string;
  department: string;
  priority: string;
  urgent: boolean | null;
  selectedUser: User | null;
  dueDate: string;
  onBack: () => void;
  onSubmit: () => void;
};

export default function StepReview({
  taskName,
  department,
  priority,
  urgent,
  selectedUser,
  dueDate,
  onBack,
  onSubmit,
}: Props) {
  return (
    <div className="step-page">

      <h2>Review Task</h2>

      <p>Please verify the information before creating the task.</p>

      <div className="review-card">

        <div className="review-row">
          <span>Task Name</span>
          <strong>{taskName}</strong>
        </div>

        <div className="review-row">
          <span>Department</span>
          <strong>{department}</strong>
        </div>

        <div className="review-row">
          <span>Priority</span>
          <strong>{priority}</strong>
        </div>

        <div className="review-row">
          <span>Urgent</span>
          <strong>{urgent ? "Yes" : "No"}</strong>
        </div>

        <div className="review-row">
          <span>Assigned To</span>
          <strong>{selectedUser?.name}</strong>
        </div>

        <div className="review-row">
          <span>Completion Date</span>
          <strong>{dueDate}</strong>
        </div>

      </div>

      <div className="wizard-footer">

        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>

        <button
          className="next-btn"
          onClick={onSubmit}
        >
          ✅ Create Task
        </button>

      </div>

    </div>
  );
}