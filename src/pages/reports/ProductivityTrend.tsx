import "./ProductivityTrend.css";
import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

import { getProjects } from "../../services/project.service";
import { supabase } from "../../lib/supabase";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function ProductivityTrend() {

  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadProjects();

    const channel = supabase
      .channel("productivity-trend")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "projects",
        },
        () => {
          loadProjects();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };

  }, []);


  const loadProjects = async () => {

    try {

      setLoading(true);

      const data = await getProjects();

      setProjects(data);

    } catch (error) {

      console.error(
        "Failed to load productivity data:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // LAST 7 DAYS
  // =====================================================

  const last7Days = Array.from(
    { length: 7 },
    (_, index) => {

      const date = new Date();

      date.setHours(0, 0, 0, 0);

      date.setDate(
        date.getDate() - (6 - index)
      );

      return date;

    }
  );


  // =====================================================
  // COUNT COMPLETED PROJECTS
  // =====================================================

  const completedPerDay = last7Days.map(
    (date) => {

      const year = date.getFullYear();

      const month = String(
        date.getMonth() + 1
      ).padStart(2, "0");

      const day = String(
        date.getDate()
      ).padStart(2, "0");

      const selectedDate =
        `${year}-${month}-${day}`;

      return projects.filter(
        (project) => {

          if (
            project.status !== "Completed"
          ) {
            return false;
          }

          /*
           * Use updated_at because the project
           * changes when its status becomes Completed.
           */
          if (!project.updated_at) {
            return false;
          }

          const updatedDate =
            new Date(project.updated_at);

          const updatedYear =
            updatedDate.getFullYear();

          const updatedMonth =
            String(
              updatedDate.getMonth() + 1
            ).padStart(2, "0");

          const updatedDay =
            String(
              updatedDate.getDate()
            ).padStart(2, "0");

          const completedDate =
            `${updatedYear}-${updatedMonth}-${updatedDay}`;

          return completedDate === selectedDate;

        }
      ).length;

    }
  );


  const labels = last7Days.map(
    (date) =>
      date.toLocaleDateString(
        "en-IN",
        {
          weekday: "short",
        }
      )
  );


  const chartData = {

    labels,

    datasets: [
      {
        label: "Completed Projects",

        data: completedPerDay,

        borderWidth: 3,

        tension: 0.4,

        fill: false,

        pointRadius: 5,

        pointHoverRadius: 7,
      },
    ],

  };


  const chartOptions = {

    responsive: true,

    maintainAspectRatio: false,

    plugins: {

      legend: {
        display: false,
      },

      tooltip: {
        displayColors: false,

        callbacks: {
          label: (context: any) =>
            `${context.parsed.y} completed`,
        },
      },

    },

    scales: {

      x: {
        grid: {
          display: false,
        },

        ticks: {
          color: "#64748b",
        },
      },

      y: {

        beginAtZero: true,

        ticks: {
          precision: 0,
          color: "#64748b",
        },

        grid: {
          color: "#e2e8f0",
        },

      },

    },

  };


  if (loading) {

    return (
      <div className="productivity-trend">

        <div className="productivity-header">

          <h2>
            <TrendingUp size={22} />
            Productivity Trend
          </h2>

        </div>

        <div className="productivity-loading">
          Loading productivity...
        </div>

      </div>
    );

  }


  return (

    <div className="productivity-trend">

      <div className="productivity-header">

        <div>

          <h2>
            <TrendingUp size={22} />
            Productivity Trend
          </h2>

          <p>
            Completed projects over the last 7 days
          </p>

        </div>

      </div>


      <div className="productivity-chart">

        <Line
          data={chartData}
          options={chartOptions}
        />

      </div>

    </div>

  );

}