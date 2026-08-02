import "./ProgressCard.css";
import { useState } from "react";

import {
    CheckCircle2,
    Clock3,
    AlertTriangle,
} from "lucide-react";

interface Props {
    tasks: any[];
}

export default function ProgressCard({
    tasks,
}: Props) {

    const [open, setOpen] = useState(false);

    const [title, setTitle] = useState("");

    const [selectedTasks, setSelectedTasks] = useState<any[]>([]);

    const completed = tasks.filter(
        (t) => t.status === "Completed"
    ).length;

    const pending = tasks.filter(
        (t) => t.status !== "Completed"
    ).length;

    const overdue = tasks.filter((t) => {
        if (!t.due_date) return false;

        return (
            new Date(t.due_date) < new Date() &&
            t.status !== "Completed"
        );
    }).length;

    const total = tasks.length;

    const percentage =
        total === 0
            ? 0
            : Math.round((completed / total) * 100);

    const showCompleted = () => {
        setTitle("Completed Tasks");

        setSelectedTasks(
            tasks.filter(
                task => task.status === "Completed"
            )
        );

        setOpen(true);
    };

    const showPending = () => {
        setTitle("Pending Tasks");

        setSelectedTasks(
            tasks.filter(
                task => task.status !== "Completed"
            )
        );

        setOpen(true);
    };

    const showOverdue = () => {
        setTitle("Overdue Tasks");

        setSelectedTasks(
            tasks.filter(task =>
                task.due_date &&
                new Date(task.due_date) < new Date() &&
                task.status !== "Completed"
            )
        );

        setOpen(true);
    };

    return (
        <div className="progress-card">

            <div className="progress-header">
                <h2>Today's Progress</h2>

                <span>{percentage}%</span>
            </div>

            <div className="progress-bar">
                <div
                    className="progress-value"
                    style={{
                        width: `${percentage}%`,
                    }}
                />
            </div>

            <div className="progress-stats">

                <div
                    className="stat success"
                    onClick={showCompleted}
                >
                    <CheckCircle2 size={18} />

                    <div>
                        <h3>{completed}</h3>
                        <p>Completed</p>
                    </div>
                </div>

                <div
                    className="stat warning"
                    onClick={showPending}
                >
                    <Clock3 size={18} />

                    <div>
                        <h3>{pending}</h3>
                        <p>Pending</p>
                    </div>
                </div>

                <div
                    className="stat danger"
                    onClick={showOverdue}
                >
                    <AlertTriangle size={18} />

                    <div>
                        <h3>{overdue}</h3>
                        <p>Overdue</p>
                    </div>
                </div>

            </div>

            {open && (
                <div className="task-popup-overlay">

                    <div className="task-popup">

                        <h2>{title}</h2>

                        {selectedTasks.length === 0 ? (

                            <p>No Tasks Found</p>

                        ) : (

                            selectedTasks.map((task) => (

                                <div
                                    key={task.id}
                                    className="popup-task"
                                >

                                    <h4>{task.project_name}</h4>

                                    <p>
                                        {task.status}
                                    </p>

                                </div>

                            ))

                        )}

                        <button
                            onClick={() => setOpen(false)}
                        >
                            Close
                        </button>

                    </div>

                </div>
            )}

        </div>
    );
}