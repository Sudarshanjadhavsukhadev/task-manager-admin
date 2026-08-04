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

      const todaySchedules = data.filter((schedule: any) => {

        const created = new Date(schedule.created_at);

        const hours =
          (Date.now() - created.getTime()) /
          (1000 * 60 * 60);

        return hours < 24;

      });

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

            <p>
              🕒 {schedule.start_time} - {schedule.end_time}
            </p>

            <p>📍 {schedule.location}</p>

            <p>
              📅 {new Date(schedule.created_at).toLocaleString("en-GB", {
                day: "2-digit",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

          </div>

        ))

      )}

    </div>

  );

}