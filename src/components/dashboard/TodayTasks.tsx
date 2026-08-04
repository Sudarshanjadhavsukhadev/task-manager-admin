import "./TodayTasks.css";

type Props = {
  tasks: any[];
};

export default function TodayTasks({ tasks }: Props) {

  // Show only incomplete tasks
  const now = new Date();

  const todayTasks = tasks.filter((task) => {

    if (task.status === "Completed") return false;

    const created = new Date(task.created_at);

    const hours =
      (now.getTime() - created.getTime()) /
      (1000 * 60 * 60);

    return hours < 24;
  });

  return (
    <div className="today-tasks">

      <h2>Today's Tasks</h2>

      <div className="tasks-scroll">

        {todayTasks.length === 0 ? (
          <p>No pending tasks.</p>
        ) : (
          todayTasks.map((task) => (
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