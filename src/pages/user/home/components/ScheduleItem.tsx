import "./ScheduleItem.css";

interface Props {
  time: string;
  title: string;
  project: string;
  color: string;
}

export default function ScheduleItem({
  time,
  title,
  project,
  color,
}: Props) {
  return (
    <div className="schedule-item">

      <div
        className="schedule-dot"
        style={{ background: color }}
      />

      <div className="schedule-info">
        <h4>{title}</h4>
        <p>{project}</p>
      </div>

      <div className="schedule-time">
        {time}
      </div>

    </div>
  );
}