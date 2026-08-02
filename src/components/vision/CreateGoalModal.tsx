import { useState } from "react";
import "./CreateGoalModal.css";
import { createGoal } from "../../services/goal.service";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateGoalModal({
  open,
  onClose,
}: Props) {

  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0);

  if (!open) return null;

  const handleSave = async () => {
    try {
      await createGoal({
        title,
        description,
        due_date: dueDate,
        progress,
        status:
          progress === 100
            ? "Completed"
            : progress === 0
              ? "Pending"
              : "In Progress",
      });

      toast.success("Goal created successfully!");

      setStep(1);
      setTitle("");
      setDueDate("");
      setDescription("");
      setProgress(0);

      onClose();

    } catch (err) {
      console.error(err);
      toast.error("Failed to create goal!");
    }
  };

  return (
    <div className="goal-modal-overlay">

      <div className="goal-modal">

        <div className="goal-modal-content">

          {/* Header */}

          <div className="wizard-header">

            <h2>🎯 Goal Planner</h2>

            <p>Create your future goal step by step.</p>

          </div>

          {/* Progress */}

          <div className="wizard-progress">

            <div className={step >= 1 ? "circle active" : "circle"}>
              1
            </div>

            <div className="line" />

            <div className={step >= 2 ? "circle active" : "circle"}>
              2
            </div>

            <div className="line" />

            <div className={step >= 3 ? "circle active" : "circle"}>
              3
            </div>

            <div className="line" />

            <div className={step >= 4 ? "circle active" : "circle"}>
              4
            </div>

          </div>

          {/* STEP 1 */}

          {step === 1 && (

            <div className="wizard-step">

              <div className="step-icon">
                🎯
              </div>

              <h3>What is your future target?</h3>

              <p className="step-description">
                Every successful company starts with one clear goal.
                Tell us what you want to achieve.
              </p>

              <input
                className="goal-input"
                type="text"
                placeholder="Example : Build AI Assistant"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />


            </div>

          )}

          {/* STEP 2 */}

          {step === 2 && (

            <div className="wizard-step">

              <h3>📅 Target Completion Date</h3>

              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />

            </div>

          )}

          {/* STEP 3 */}

          {step === 3 && (

            <div className="wizard-step">

              <h3>💡 How will you achieve this?</h3>

              <textarea
                placeholder="Write your complete plan..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

            </div>

          )}

          {/* STEP 4 */}

          {step === 4 && (

            <div className="wizard-step">

              <div className="step-icon">
                📈
              </div>

              <h3>How far have you reached?</h3>

              <p className="step-description">
                If this is a brand new goal, leave it at <strong>0%</strong>.
                Otherwise, tell us how much progress you've already made.
              </p>

              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="progress-slider"
              />

              <div className="progress-percent">
                {progress}%
              </div>

              <div className="progress-status">

                {progress === 0 && "🚀 Just Started"}

                {progress > 0 && progress <= 25 && "🌱 Getting Started"}

                {progress > 25 && progress <= 50 && "⚡ Making Progress"}

                {progress > 50 && progress <= 75 && "🔥 More Than Halfway"}

                {progress > 75 && progress < 100 && "🏆 Almost Finished"}

                {progress === 100 && "✅ Goal Completed"}

              </div>

            </div>

          )}

          {/* Footer */}

          <div className="wizard-footer">

            {step > 1 && (

              <button
                onClick={() => setStep(step - 1)}
              >
                ← Back
              </button>

            )}

            {step < 4 ? (

              <button
                className="next-btn"
                onClick={() => setStep(step + 1)}
              >
                Next →
              </button>

            ) : (

              <button
                className="next-btn"
                onClick={handleSave}
              >
                🚀 Save Goal
              </button>

            )}

          </div>

        </div>

      </div>
    </div>
  );
}