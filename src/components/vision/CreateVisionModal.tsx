import { useState } from "react";
import "./CreateVisionModal.css";
import { createVision } from "../../services/vision.service";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
};

export default function CreateVisionModal({
  open,
  onClose,
  onCreated,
}: Props) {

  const [step, setStep] = useState<
    | "welcome"
    | "q1"
    | "q2"
    | "q3"
    | "q4"
    | "q5"
    | "q6"
    | "review"
  >("welcome");
  const [visionName, setVisionName] = useState("");
  const [visionReason, setVisionReason] = useState("");

  const [targetDate, setTargetDate] = useState("");

  const [revenueGoal, setRevenueGoal] = useState("");

  const [category, setCategory] = useState("");
  const [ambition, setAmbition] = useState("");
  if (!open) return null;

  const handleCreateVision = async () => {
    try {
      await createVision({
        title: visionName,
        reason: visionReason,
        launch_date: targetDate,
        revenue_goal: Number(revenueGoal),
        category,
        ambition,
        progress: 0,
      });

      alert("Vision Created Successfully!");

      onCreated();

    } catch (err) {
      console.error(err);
      alert("Failed to create vision");
    }
  };

  return (
    <div className="vision-modal-overlay">

      <div className="vision-modal">



        {step === "welcome" && (
          <div className="vision-welcome">

            <div className="welcome-icon">

              <div className="icon-circle">

                🎯

              </div>

            </div>

            <h1 className="welcome-title">

              Create Your Company Vision

            </h1>

            <p className="welcome-description">

              Define the long-term direction of your company.

              Every goal, milestone and roadmap you create

              will be connected to this vision.

            </p>

            <button

              className="start-btn"

              onClick={() => setStep("q1")}

            >

              ✨ Create My Vision →

            </button>

          </div>
        )}

        {step === "q1" && (

          <div className="vision-question">

            <div className="question-progress">

              <span>Building Your Vision</span>

              <div className="progress-bar">

                <div className="progress-fill"></div>

              </div>

            </div>

            <div className="question-number">

              Question 1 of 6

            </div>

            <div className="question-icon">

              🎯

            </div>

            <h2 className="question-title">

              What is your vision?

            </h2>

            <p className="question-subtitle">

              Describe the future you want your company to achieve.

            </p>

            <input
              className="vision-input"
              placeholder="Start typing..."
              value={visionName}
              onChange={(e) => setVisionName(e.target.value)}
            />

          </div>

        )}

        {step === "q1" && (

          <div className="vision-modal-footer">

            <button
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              className="continue-btn"
              disabled={!visionName.trim()}
              onClick={() => setStep("q2")}
            >
              Continue →
            </button>

          </div>

        )}

        {step === "q2" && (

          <div className="vision-question">

            <div className="question-progress">

              <span>Building Your Vision</span>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{ width: "33%" }}
                ></div>

              </div>

            </div>

            <div className="question-number">

              Question 2 of 6

            </div>

            <div className="question-icon">

              💡

            </div>

            <h2 className="question-title">

              Why is this vision important?

            </h2>

            <p className="question-subtitle">

              Tell us why this vision matters to your company.

            </p>

            <textarea
              className="vision-input"
              rows={5}
              placeholder="Start typing..."
              value={visionReason}
              onChange={(e) => setVisionReason(e.target.value)}
            />

          </div>

        )}

        {step === "q2" && (

          <div className="vision-modal-footer">

            <button
              className="cancel-btn"
              onClick={() => setStep("q1")}
            >
              ← Back
            </button>

            <button
              className="continue-btn"
              disabled={!visionReason.trim()}
              onClick={() => setStep("q3")}
            >
              Continue →
            </button>

          </div>

        )}

        {step === "q3" && (

          <div className="vision-question">

            <div className="question-progress">

              <span>Building Your Vision</span>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{ width: "50%" }}
                ></div>

              </div>

            </div>

            <div className="question-number">

              Question 3 of 6

            </div>

            <div className="question-icon">

              📅

            </div>

            <h2 className="question-title">

              When do you want to achieve it?

            </h2>

            <p className="question-subtitle">

              Choose the target completion date for this vision.

            </p>

            <input
              type="date"
              className="vision-input"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
            />

          </div>

        )}

        {step === "q3" && (

          <div className="vision-modal-footer">

            <button
              className="cancel-btn"
              onClick={() => setStep("q2")}
            >
              ← Back
            </button>

            <button
              className="continue-btn"
              disabled={!targetDate}
              onClick={() => setStep("q4")}
            >
              Continue →
            </button>

          </div>

        )}

        {step === "q4" && (

          <div className="vision-question">

            <div className="question-progress">

              <span>Building Your Vision</span>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{ width: "66%" }}
                ></div>

              </div>

            </div>

            <div className="question-number">
              Question 4 of 6
            </div>

            <div className="question-icon">
              💰
            </div>

            <h2 className="question-title">
              What's your revenue goal?
            </h2>

            <p className="question-subtitle">
              Pick a milestone or enter your own amount.
            </p>

            <div className="revenue-options">

              {[
                { label: "₹10 Lakh", value: 1000000 },
                { label: "₹50 Lakh", value: 5000000 },
                { label: "₹1 Crore", value: 10000000 },
                { label: "₹5 Crore", value: 50000000 },
                { label: "₹10 Crore", value: 100000000 },
              ].map((item) => (

                <button
                  key={item.label}
                  className={
                    revenueGoal === item.value.toString()
                      ? "revenue-chip active"
                      : "revenue-chip"
                  }
                  onClick={() => setRevenueGoal(item.value.toString())}
                >
                  {item.label}
                </button>

              ))}

            </div>

            <input
              className="vision-input"
              placeholder="Or enter custom amount"
              value={revenueGoal}
              onChange={(e) => setRevenueGoal(e.target.value)}
            />

          </div>

        )}

        {step === "q4" && (

          <div className="vision-modal-footer">

            <button
              className="cancel-btn"
              onClick={() => setStep("q3")}
            >
              ← Back
            </button>

            <button
              className="continue-btn"
              disabled={!revenueGoal.trim()}
              onClick={() => setStep("q5")}
            >
              Continue →
            </button>

          </div>

        )}

        {step === "q5" && (

          <div className="vision-question">

            <div className="question-progress">

              <span>Building Your Vision</span>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: "83%" }}
                ></div>
              </div>

            </div>

            <div className="question-number">
              Question 5 of 6
            </div>

            <div className="question-icon">
              🚀
            </div>

            <h2 className="question-title">
              What type of vision are you creating?
            </h2>

            <p className="question-subtitle">
              Choose where this vision belongs.
            </p>

            <div className="category-grid">

              {[
                {
                  icon: "🥋",
                  name: "MJK Academy",
                  desc: "Karate • Dance • Sports"
                },
                {
                  icon: "🎬",
                  name: "MJK Production",
                  desc: "Films • Ads • Photography"
                },
                {
                  icon: "👤",
                  name: "Personal",
                  desc: "Career • Health • Finance"
                }
              ]
                .map((item) => (

                  <div
                    key={item.name}
                    className={
                      category === item.name
                        ? "category-card active"
                        : "category-card"
                    }
                    onClick={() => setCategory(item.name)}
                  >

                    <div className="category-icon">
                      {item.icon}
                    </div>

                    <h4>{item.name}</h4>

                    <p>{item.desc}</p>

                  </div>

                ))}

            </div>

          </div>

        )}

        {step === "q5" && (

          <div className="vision-modal-footer">

            <button
              className="cancel-btn"
              onClick={() => setStep("q4")}
            >
              ← Back
            </button>

            <button
              className="continue-btn"
              disabled={!category}
              onClick={() => setStep("q6")}
            >
              Review →
            </button>

          </div>

        )}

        {step === "q6" && (

          <div className="vision-question">

            <div className="question-progress">

              <span>Building Your Vision</span>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{ width: "100%" }}
                />

              </div>

            </div>

            <div className="question-number">
              Question 6 of 6
            </div>

            <div className="question-icon">
              🚀
            </div>

            <h2 className="question-title">
              How ambitious is this vision?
            </h2>

            <p className="question-subtitle">
              Choose the ambition level that best represents your goal.
            </p>

            <div className="category-grid">

              {[
                {
                  icon: "🌱",
                  title: "Steady Growth",
                  desc: "Build a stable and sustainable future."
                },
                {
                  icon: "🚀",
                  title: "Big Ambition",
                  desc: "Become a leader in your field."
                },
                {
                  icon: "🌍",
                  title: "Change The World",
                  desc: "Create something extraordinary."
                }
              ].map((item) => (

                <div
                  key={item.title}
                  className={
                    ambition === item.title
                      ? "category-card active"
                      : "category-card"
                  }
                  onClick={() => setAmbition(item.title)}
                >

                  <div className="category-icon">
                    {item.icon}
                  </div>

                  <h4>{item.title}</h4>

                  <p>{item.desc}</p>

                </div>

              ))}

            </div>

          </div>

        )}

        {step === "q6" && (

          <div className="vision-modal-footer">

            <button
              className="cancel-btn"
              onClick={() => setStep("q5")}
            >
              ← Back
            </button>

            <button
              className="continue-btn"
              disabled={!ambition}
              onClick={() => setStep("review")}
            >
              Review →
            </button>

          </div>

        )}

        {step === "review" && (

          <div className="vision-question">

            <div className="question-progress">

              <span>Ready to Launch</span>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{ width: "100%" }}
                />

              </div>

            </div>

            <div className="question-icon">
              🎉
            </div>

            <h2 className="question-title">
              Review Your Vision
            </h2>

            <p className="question-subtitle">
              Please review everything before creating your vision.
            </p>

            <div className="review-card">

              <div className="review-row">
                <span>🎯 Vision</span>
                <strong>{visionName}</strong>
              </div>

              <div className="review-row">
                <span>💡 Purpose</span>
                <strong>{visionReason}</strong>
              </div>

              <div className="review-row">
                <span>📅 Target Date</span>
                <strong>{targetDate}</strong>
              </div>

              <div className="review-row">
                <span>💰 Revenue Goal</span>
                <strong>{revenueGoal}</strong>
              </div>

              <div className="review-row">
                <span>🏢 Vision Type</span>
                <strong>{category}</strong>
              </div>

              <div className="review-row">
                <span>🚀 Ambition</span>
                <strong>{ambition}</strong>
              </div>

            </div>

          </div>

        )}

        {step === "review" && (

          <div className="vision-modal-footer">

            <button
              className="cancel-btn"
              onClick={() => setStep("q6")}
            >
              ← Back
            </button>

            <button
              className="continue-btn"
              onClick={handleCreateVision}
            >
              ✨ Create Vision
            </button>

          </div>

        )}

        {step === "welcome" && (

          <div className="vision-modal-footer">

            <button
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

          </div>

        )}







      </div>

    </div>


  );
}