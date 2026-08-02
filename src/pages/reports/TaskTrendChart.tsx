import "./TaskTrendChart.css";

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],

  datasets: [
    {
      label: "Completed Tasks",

      data: [40, 58, 72, 95, 110, 140],

      borderColor: "#2563eb",

      backgroundColor: "rgba(37,99,235,.15)",

      fill: true,

      tension: 0.4,

      pointRadius: 5,

      pointHoverRadius: 7,
    },
  ],
};

const options = {
  responsive: true,

  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: false,
    },
  },

  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: "#eef2f7",
      },
    },

    x: {
      grid: {
        display: false,
      },
    },
  },
};

export default function TaskTrendChart() {
  return (
    <div className="task-trend-chart">

      <div className="chart-header">

        <h2>Task Completion Trend</h2>

        <span>Last 6 Months</span>

      </div>

      <div className="chart-body">

        <Line
          data={data}
          options={options}
        />

      </div>

    </div>
  );
}