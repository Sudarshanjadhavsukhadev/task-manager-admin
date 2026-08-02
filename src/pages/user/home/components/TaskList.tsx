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
              time={new Date(task.created_at).toLocaleDateString()}
              priority={task.priority}
            />
          ))
        )}

      </div>

    </div>
  );
}