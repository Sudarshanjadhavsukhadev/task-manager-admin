import { useEffect, useState } from "react";
import "./AddScheduleModal.css";

import { createSchedule } from "../../services/schedule.service";
import { getUsers } from "../../services/user.service";
import toast from "react-hot-toast";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AddScheduleModal({
  open,
  onClose,
}: Props) {
  const [meetingName, setMeetingName] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [meetingPlace, setMeetingPlace] = useState("");

  const [users, setUsers] = useState<any[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  }

  const handleSubmit = async () => {
    console.log({
      meetingName,
      meetingDate,
      meetingTime,
      meetingPlace,
      selectedUsers,
    });

    try {

      if (!meetingName) {
        return toast.error("Meeting Name missing");
      }

      if (!meetingDate) {
        return toast.error("Meeting Date missing");
      }

      if (!meetingTime) {
        return toast.error("Meeting Time missing");
      }

      if (!meetingPlace) {
        return toast.error("Meeting Place missing");
      }

      if (selectedUsers.length === 0) {
        return toast.error("Select at least one user");
      }

      await createSchedule({
        meeting_name: meetingName,
        meeting_date: meetingDate,
        start_time: meetingTime,
        location: meetingPlace,
        assigned_users: selectedUsers,
      });

      toast.success("Schedule Added");

      setMeetingName("");
      setMeetingDate("");
      setMeetingTime("");
      setMeetingPlace("");
      setSelectedUsers([]);

      onClose();

    } catch (err) {
      console.error(err);
      toast.error("Failed to add schedule");
    }
  };

  if (!open) return null;

  return (
    <div className="schedule-overlay">
      <div className="schedule-modal">

        <div className="schedule-header">
          <h2>Add Schedule</h2>

          <button onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="schedule-body">

          <input
            type="text"
            placeholder="Meeting Name"
            value={meetingName}
            onChange={(e) =>
              setMeetingName(e.target.value)
            }
          />

          <div className="schedule-row">

            <input
              type="date"
              value={meetingDate}
              onChange={(e) =>
                setMeetingDate(e.target.value)
              }
            />

            <input
              type="time"
              value={meetingTime}
              onChange={(e) =>
                setMeetingTime(e.target.value)
              }
            />

          </div>

          <input
            type="text"
            placeholder="Meeting Place"
            value={meetingPlace}
            onChange={(e) =>
              setMeetingPlace(e.target.value)
            }
          />

          <label>
            Select Users
          </label>

          <div className="users-list">

            {users.map((user) => (

              <label
                key={user.id}
                className="user-item"
              >

                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={(e) => {

                    if (e.target.checked) {

                      setSelectedUsers([
                        ...selectedUsers,
                        user.id,
                      ]);

                    } else {

                      setSelectedUsers(
                        selectedUsers.filter(
                          (id) => id !== user.id
                        )
                      );

                    }

                  }}
                />

                <span>{user.full_name}</span>

              </label>

            ))}

          </div>

        </div>

        <div className="schedule-footer">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="save-btn"
            onClick={handleSubmit}
          >
            Save Schedule
          </button>

        </div>

      </div>
    </div>
  );
}