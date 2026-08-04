import { useEffect, useState } from "react";
import "./AddProjectModal.css";

import { getUsers } from "../../services/user.service";
import { createProject } from "../../services/project.service";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AddProjectModal({
  open,
  onClose,
}: Props) {

  const [projectName, setProjectName] = useState("");

  const [description, setDescription] = useState("");

  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Planning");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [department, setDepartment] = useState("");

  const [assignedUser, setAssignedUser] = useState("");
  const [users, setUsers] = useState<any[]>([]);

  const [assignedUserId, setAssignedUserId] = useState("");


  useEffect(() => {
    if (!open) return;

    async function loadUsers() {
      try {
        const data = await getUsers();

        const onlyUsers = data.filter(
          (user: any) => user.role === "user"
        );

        setUsers(onlyUsers);
      } catch (err) {
        console.error(err);
      }
    }

    loadUsers();
  }, [open]);

  if (!open) return null;

  const handleNext = () => {
    switch (step) {
      case 1:
        if (!projectName.trim()) {
          alert("Please enter task name");
          return;
        }
        break;

      case 2:
        if (!department) {
          alert("Please select a department");
          return;
        }
        break;

      case 3:
        if (!assignedUser.trim()) {
          alert("Please assign a user");
          return;
        }
        break;

      case 4:
        if (!priority) {
          alert("Please select priority");
          return;
        }
        break;


      case 5:
        if (!description.trim()) {
          alert("Please enter task description");
          return;
        }
        break;
    }

    setStep(step + 1);
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      if (!projectName.trim()) {
        alert("Please enter project name");
        return;
      }





      await createProject({
        project_name: projectName,
        department,
        assigned_user_id: assignedUserId,
        description,
        priority,
        status,
        progress: 0,
      });
      alert("Project Created Successfully");

      onClose();

      setProjectName("");

      setDescription("");
      setPriority("Medium");
      setStatus("Planning");



    } catch (err) {
      console.error(err);
      alert("Failed to create project");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">

          <div>

            <h2>Create New Task</h2>

            <p className="modal-subtitle">
              Complete the steps to create a task.
            </p>

          </div>

          <div className="step-info">

            <span>Step {step} of 6</span>

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{
                  width: `${(step / 6) * 100}%`,
                }}
              />

            </div>

          </div>

        </div>

        <div className="modal-body">

          {step === 1 && (

            <div className="wizard-step">

              <h1 className="step-title">
                What do you want to accomplish?
              </h1>

              <p className="step-description">
                Give your task a clear and meaningful name.
              </p>

              <input
                type="text"
                placeholder="Example : Build Dashboard"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />

            </div>

          )}

          {step === 2 && (

            <div className="wizard-step">

              <h2>Select Department</h2>

              <div className="department-grid">

                <div
                  className={department === "MJK Academy" ? "selected" : ""}
                  onClick={() => setDepartment("MJK Academy")}
                >
                  🎓 MJK Academy
                </div>

                <div
                  className={department === "MJK Production" ? "selected" : ""}
                  onClick={() => setDepartment("MJK Production")}
                >
                  🎬 MJK Production
                </div>

                <div
                  className={department === "Personal" ? "selected" : ""}
                  onClick={() => setDepartment("Personal")}
                >
                  👤 Personal
                </div>

              </div>

            </div>

          )}

          {step === 3 && (

            <div className="wizard-step">

              <h2>Assign User</h2>

              <div className="user-list">

                {users
                  .filter((user: any) => user.role === "user")
                  .map((user: any) => (

                    <div
                      key={user.id}
                      className={`user-card ${assignedUserId === user.id ? "selected" : ""
                        }`}
                      onClick={() => {
                        setAssignedUser(user.full_name);
                        setAssignedUserId(user.id);
                      }}
                    >

                      <div className="user-avatar">
                        {user.full_name.charAt(0)}
                      </div>

                      <div className="user-info">

                        <h4>{user.full_name}</h4>

                        <p>{user.email}</p>

                      </div>

                    </div>

                  ))}

              </div>

            </div>

          )}

          {step === 4 && (

            <div className="wizard-step">

              <h2>Priority</h2>

              <div className="priority-grid">

                <div
                  className={priority === "High" ? "selected" : ""}
                  onClick={() => setPriority("High")}
                >
                  🔴 High
                </div>

                <div
                  className={priority === "Medium" ? "selected" : ""}
                  onClick={() => setPriority("Medium")}
                >
                  🟡 Medium
                </div>

                <div
                  className={priority === "Low" ? "selected" : ""}
                  onClick={() => setPriority("Low")}
                >
                  🟢 Low
                </div>

              </div>

            </div>

          )}



          {step === 5 && (

            <div className="wizard-step">

              <h2>Description</h2>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your task"
              />

            </div>

          )}

          {step === 6 && (

            <div className="wizard-step">

              <h2>Review</h2>

              <p><b>Task :</b> {projectName}</p>

              <p><b>Department :</b> {department}</p>

              <p><b>Assigned :</b> {assignedUser}</p>

              <p><b>Priority :</b> {priority}</p>



              <p><b>Description :</b> {description}</p>

            </div>

          )}

        </div>

        <div className="modal-footer">

          {step > 1 && (
            <button
              className="back-btn"
              onClick={() => setStep(step - 1)}
            >
              ← Back
            </button>
          )}

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          {step < 6 ? (
            <button
              className="save-btn"
              onClick={handleNext}
            >
              Next →
            </button>
          ) : (
            <button
              className="save-btn"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Task"}
            </button>
          )}

        </div>

      </div>
    </div>
  );
}