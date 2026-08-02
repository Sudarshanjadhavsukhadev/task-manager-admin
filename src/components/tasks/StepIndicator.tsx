import "./StepIndicator.css";

type Props = {
  currentStep: number;
  totalSteps: number;
};

export default function StepIndicator({
  currentStep,
  totalSteps,
}: Props) {
  return (
    <div className="step-indicator">

      <div className="step-progress">

        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`step-dot ${
              index + 1 <= currentStep ? "active" : ""
            }`}
          />
        ))}

      </div>

      <p>
        Step {currentStep} of {totalSteps}
      </p>

    </div>
  );
}