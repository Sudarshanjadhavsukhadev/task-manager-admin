import "./TodayTasks.css";

type Props = {
  tasks: any[];
};

export default function TodayTasks({ tasks }: Props) {
  return (
    <div className="today-tasks">

      <h2>Today's Tasks</h2>

      <div className="tasks-scroll">

        {tasks.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="today-task-card"
            >
              <div>

                <h3>{task.project_name}</h3>

                <p>
                  {new Date(task.created_at).toLocaleDateString()}
                </p>

              </div>

              <span
                className={`priority ${task.priority.toLowerCase()}`}
              >
                {task.priority}
              </span>

            </div>
          ))
        )}

      </div>

    </div>
  );
}