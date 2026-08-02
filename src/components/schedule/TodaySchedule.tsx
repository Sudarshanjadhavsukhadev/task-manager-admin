import { useEffect, useState } from "react";
import { getSchedules } from "../../services/schedule.service";

import "./TodaySchedule.css";

export default function TodaySchedule() {

  const [schedules, setSchedules] = useState<any[]>([]);

  useEffect(() => {
    loadSchedules();
  }, []);

  async function loadSchedules() {

    try {

      const data = await getSchedules();

      const today = new Date()
        .toISOString()
        .split("T")[0];

      const todaySchedules = data.filter(
        (schedule: any) =>
          schedule.meeting_date === today
      );

      setSchedules(todaySchedules);

    } catch (err) {
      console.error(err);
    }

  }

  return (

    <div className="today-schedule">

      <h2>Today's Schedule</h2>

      {schedules.length === 0 ? (

        <p className="no-schedule">
          No meetings scheduled today.
        </p>

      ) : (

        schedules.map((schedule) => (

          <div
            key={schedule.id}
            className="schedule-card"
          >

            <h3>{schedule.meeting_name}</h3>

            <p>🕒 {schedule.start_time}</p>

            <p>📍 {schedule.location}</p>

          </div>

        ))

      )}

    </div>

  );

}