import "./ProgressCard.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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

    const pending = tasks.filter((task) => {
        if (task.status === "Completed") {
            return false;
        }

        // No deadline = still pending
        if (!task.due_date || !task.due_time) {
            return true;
        }

        const dueDateTime = new Date(
            `${task.due_date}T${task.due_time}`
        );

        // Only pending if deadline has NOT passed
        return new Date() <= dueDateTime;
    }).length;

    const overdue = tasks.filter((task) => {
        if (
            !task.due_date ||
            !task.due_time ||
            task.status === "Completed"
        ) {
            return false;
        }

        const dueDateTime = new Date(
            `${task.due_date}T${task.due_time}`
        );

        return new Date() > dueDateTime;
    }).length;

    // =====================================================
    // OVERDUE TASK ALERT
    // =====================================================

    useEffect(() => {
        const checkOverdueTasks = () => {
            const now = new Date();

            tasks.forEach((task) => {
                if (
                    task.status === "Completed" ||
                    !task.due_date ||
                    !task.due_time
                ) {
                    return;
                }

                const dueDateTime = new Date(
                    `${task.due_date}T${task.due_time}`
                );

                if (now > dueDateTime) {
                    const alertKey = `overdue_alert_${task.id}`;

                    // Prevent the same task from showing
                    // the overdue message repeatedly
                    if (!sessionStorage.getItem(alertKey)) {

                        toast.error(
                            `⚠️ ${task.project_name} is overdue. Please complete it.`,
                            {
                                duration: 6000,
                            }
                        );

                        sessionStorage.setItem(
                            alertKey,
                            "true"
                        );
                    }
                }
            });
        };

        // Check immediately
        checkOverdueTasks();

        // Check every 1 minute
        const interval = setInterval(
            checkOverdueTasks,
            60 * 1000
        );

        return () => {
            clearInterval(interval);
        };
    }, [tasks]);
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
            tasks.filter((task) => {
                if (task.status === "Completed") {
                    return false;
                }

                // No deadline = pending
                if (!task.due_date || !task.due_time) {
                    return true;
                }

                const dueDateTime = new Date(
                    `${task.due_date}T${task.due_time}`
                );

                // Only show tasks whose deadline
                // has NOT passed
                return new Date() <= dueDateTime;
            })
        );

        setOpen(true);
    };

    const showOverdue = () => {
        setTitle("Overdue Tasks");

        setSelectedTasks(
            tasks.filter((task) => {
                if (
                    !task.due_date ||
                    !task.due_time ||
                    task.status === "Completed"
                ) {
                    return false;
                }

                const dueDateTime = new Date(
                    `${task.due_date}T${task.due_time}`
                );

                return new Date() > dueDateTime;
            })
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