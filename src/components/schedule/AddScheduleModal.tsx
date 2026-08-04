import { useEffect, useState } from "react";
import "./AddScheduleModal.css";


import { getUsers } from "../../services/user.service";
import toast from "react-hot-toast";
import {
  createSchedule,
  getSchedules,
  deleteSchedule,
} from "../../services/schedule.service";
import { Trash2 } from "lucide-react";

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
  const [endTime, setEndTime] = useState("");
  const [meetingPlace, setMeetingPlace] = useState("");

  const [users, setUsers] = useState<any[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [schedules, setSchedules] = useState<any[]>([]);
  useEffect(() => {
    loadUsers();
    loadSchedules();
  }, []);

  async function loadUsers() {
    try {
      const data = await getUsers();

      console.log("All Users:", data);

      const onlyUsers = data.filter(
        (user: any) => user.role === "user"
      );

      console.log("Only Users:", onlyUsers);

      setUsers(onlyUsers);

    } catch (err) {
      console.error(err);
    }
  }

  async function loadSchedules() {
    try {
      const data = await getSchedules();
      setSchedules(data);
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
      if (!endTime) {
        return toast.error("End Time missing");
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
        end_time: endTime,
        location: meetingPlace,
        assigned_users: selectedUsers,
      });

      toast.success("Schedule Added");

      await loadSchedules();

      setMeetingName("");
      setMeetingDate("");
      setMeetingTime("");
      setEndTime("");
      setMeetingPlace("");
      setSelectedUsers([]);



    } catch (err) {
      console.error(err);
      toast.error("Failed to add schedule");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Delete this schedule?"
    );

    if (!confirmDelete) return;

    try {
      await deleteSchedule(id);

      toast.success("Schedule deleted");

      loadSchedules();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete schedule");
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

          <div className="form-group">
            <label>Meeting Name</label>

            <input
              type="text"
              placeholder="Enter meeting name"
              value={meetingName}
              onChange={(e) => setMeetingName(e.target.value)}
            />
          </div>

          <div className="schedule-row">

            <div className="form-group">
              <label>Meeting Date</label>

              <input
                type="date"
                value={meetingDate}
                onChange={(e) => setMeetingDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Start Time</label>

              <input
                type="time"
                value={meetingTime}
                onChange={(e) => setMeetingTime(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>End Time</label>

              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>

          </div>

          <div className="form-group">
            <label>Meeting Location</label>

            <input
              type="text"
              placeholder="Enter meeting location"
              value={meetingPlace}
              onChange={(e) => setMeetingPlace(e.target.value)}
            />
          </div>

          <label className="users-label">
            Assign Users
          </label>

          <div className="users-list">

            {users
              .filter((user) => user.role === "user")
              .map((user) => (

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

          <h3 className="previous-title">
            Previous Schedules
          </h3>

          <div className="previous-schedules">

            {schedules.length === 0 ? (

              <p>No schedules found.</p>

            ) : (

              schedules.map((schedule) => (

                <div
                  key={schedule.id}
                  className="schedule-card"
                >

                  <div className="schedule-top">

                    <div>

                      <h4>{schedule.meeting_name}</h4>

                      <p>📅 {schedule.meeting_date}</p>

                      <p>
                        🕒 {schedule.start_time} - {schedule.end_time}
                      </p>

                      <p>📍 {schedule.location}</p>

                    </div>

                    <button
                      className="delete-schedule-btn"
                      onClick={() => handleDelete(schedule.id)}
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </div>

              ))

            )}

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