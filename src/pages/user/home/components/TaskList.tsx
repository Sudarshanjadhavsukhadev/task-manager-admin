import "./TaskList.css";
import TaskCard from "./TaskCard";

type Props = {
  tasks: any[];
};

export default function TaskList({ tasks }: Props) {
  return (
    <div className="task-list">

      <div className="task-list-card">

        <div className="task-list-header">
          <h2>Today's Tasks</h2>

          <span>{tasks.length} Tasks</span>
        </div>

        {tasks.length === 0 ? (
          <div className="empty-task">
            <h3>🎉 All tasks completed!</h3>
            <p>You don't have any pending tasks for today.</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.project_name}
              project={task.department}

              time={
                task.due_date && task.due_time
                  ? `${new Date(
                    `${task.due_date}T${task.due_time}`
                  ).toLocaleDateString()} • ${new Date(
                    `1970-01-01T${task.due_time}`
                  ).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}`
                  : "No due date"
              }

              priority={task.priority}
            />
          ))
        )}

      </div>

    </div>
  );
}