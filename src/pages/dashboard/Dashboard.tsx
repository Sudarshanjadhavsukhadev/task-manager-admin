import "./Dashboard.css";
import { getProjects } from "../../services/project.service";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/dashboard/StatCard";
import TaskChart from "../../components/dashboard/TaskChart";
import TodayTasks from "../../components/dashboard/TodayTasks";
import RecentActivity from "../../components/dashboard/RecentActivity";
import { useEffect, useState } from "react";
import { getUsers } from "../../services/user.service";
import TodaySchedule from "../../components/schedule/TodaySchedule";

import {
    Users,
    FolderKanban,
    CheckSquare,
    Clock,
} from "lucide-react";

export default function Dashboard() {
    const [userCount, setUserCount] = useState(0);
    const [tasks, setTasks] = useState<any[]>([]);
    useEffect(() => {
        fetchUsers();
        fetchProjects();
    }, []);
    const fetchProjects = async () => {
        try {
            const data = await getProjects();
            setTasks(data);
        } catch (err) {
            console.error(err);
        }
    };
    const fetchUsers = async () => {
        try {
            const users = await getUsers();
            setUserCount(users.length);
        } catch (err) {
            console.error(err);
        }
    };

    const totalTasks = tasks.length;

    const pendingTasks = tasks.filter(
        (p) => p.status !== "Completed"
    ).length;

    const completedTasks = tasks.filter(
        (p) => p.status === "Completed"
    ).length;
    return (
        <DashboardLayout>
            <div className="dashboard">



                <div className="stats-grid">
                    <StatCard
                        title="Users"
                        value={userCount}
                        icon={Users}
                        color="bg-blue-600"
                    />

                    <StatCard
                        title="Tasks"
                        value={totalTasks}
                        icon={FolderKanban}
                        color="bg-green-600"
                    />

                    <StatCard
                        title="Pending Tasks"
                        value={pendingTasks}
                        icon={Clock}
                        color="bg-orange-500"
                    />

                    <StatCard
                        title="Completed"
                        value={completedTasks}
                        icon={CheckSquare}
                        color="bg-purple-600"
                    />
                </div>

                <div className="dashboard-grid">

                    <div className="left-panel">

                        <TaskChart />

                        <RecentActivity />

                    </div>

                    <div className="right-panel">

                        <TodayTasks tasks={tasks} />

                        <TodaySchedule />

                    </div>

                </div>


            </div>
        </DashboardLayout>
    );
}