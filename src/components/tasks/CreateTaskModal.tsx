import { useState } from "react";
import "./CreateTaskModal.css";

import StepIndicator from "./StepIndicator";
import StepTaskName from "./StepTaskName";
import StepDepartment from "./StepDepartment";
import StepPriority from "./StepPriority";
import StepUrgent from "./StepUrgent";
import StepAssignUser from "./StepAssignUser";
import StepCompletionDate from "./StepCompletionDate";
import StepReview from "./StepReview";

type Props = {
  open: boolean;
  onClose: () => void;
};

type User = {
  id: number;
  name: string;
  role: string;
};

export default function CreateTaskModal({
  open,
  onClose,
}: Props) {
  if (!open) return null;

  const totalSteps = 7;

  const [step, setStep] = useState(1);

  const [taskName, setTaskName] = useState("");
  const [department, setDepartment] = useState("");
  const [priority, setPriority] = useState("");
  const [urgent, setUrgent] = useState<boolean | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = () => {
    console.log({
      taskName,
      department,
      priority,
      urgent,
      selectedUser,
      dueDate,
    });

    alert("Task Created Successfully!");

    onClose();

    setStep(1);
    setTaskName("");
    setDepartment("");
    setPriority("");
    setUrgent(null);
    setSelectedUser(null);
    setDueDate("");
  };

  return (
    <div className="modal-overlay">
      <div className="task-modal">

        <div className="task-modal-header">
          <h2>Create New Task</h2>

          <button onClick={onClose}>✕</button>
        </div>

        <div className="task-modal-body">

          <StepIndicator
            currentStep={step}
            totalSteps={totalSteps}
          />

          {step === 1 && (
            <StepTaskName
              taskName={taskName}
              setTaskName={setTaskName}
              onNext={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <StepDepartment
              department={department}
              setDepartment={setDepartment}
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
            />
          )}

          {step === 3 && (
            <StepPriority
              priority={priority}
              setPriority={setPriority}
              onBack={() => setStep(2)}
              onNext={() => setStep(4)}
            />
          )}

          {step === 4 && (
            <StepUrgent
              urgent={urgent}
              setUrgent={setUrgent}
              onBack={() => setStep(3)}
              onNext={() => setStep(5)}
            />
          )}

          {step === 5 && (
            <StepAssignUser
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              onBack={() => setStep(4)}
              onNext={() => setStep(6)}
            />
          )}

          {step === 6 && (
            <StepCompletionDate
              dueDate={dueDate}
              setDueDate={setDueDate}
              onBack={() => setStep(5)}
              onNext={() => setStep(7)}
            />
          )}

          {step === 7 && (
            <StepReview
              taskName={taskName}
              department={department}
              priority={priority}
              urgent={urgent}
              selectedUser={selectedUser}
              dueDate={dueDate}
              onBack={() => setStep(6)}
              onSubmit={handleSubmit}
            />
          )}

        </div>

      </div>
    </div>
  );
}