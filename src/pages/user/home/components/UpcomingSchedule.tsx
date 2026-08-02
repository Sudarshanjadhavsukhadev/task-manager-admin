import "./UpcomingSchedule.css";
import ScheduleItem from "./ScheduleItem";
import { useEffect, useState } from "react";
import { getSchedules } from "../../../../services/schedule.service";

export default function UpcomingSchedule() {
  const [schedules, setSchedules] = useState<any[]>([]);

  useEffect(() => {
    loadSchedules();
  }, []);

  async function loadSchedules() {
    try {
      const data = await getSchedules();
      setSchedules(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section className="upcoming-schedule">

      <div className="schedule-header">

        <h2>Upcoming Schedule</h2>

        <button>See All</button>

      </div>

      {schedules.length === 0 ? (

        <p className="no-schedule">
          No upcoming schedules
        </p>

      ) : (

        schedules.map((schedule) => (

          <ScheduleItem
            key={schedule.id}
            time={schedule.start_time}
            title={schedule.meeting_name}
            project={schedule.location}
            color="#2563eb"
          />

        ))

      )}

    </section>
  );
}