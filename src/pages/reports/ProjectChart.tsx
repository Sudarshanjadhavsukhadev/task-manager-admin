import "./ProjectChart.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const data = {
  labels: [
    "Academy",
    "Production",
    "Personal",
    "Marketing",
    "HR",
  ],

  datasets: [
    {
      label: "Tasks",

      data: [75, 48, 26, 35, 18],

      backgroundColor: [
        "#2563eb",
        "#16a34a",
        "#f59e0b",
        "#8b5cf6",
        "#ef4444",
      ],

      borderRadius: 10,
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

export default function ProjectChart() {
  return (
    <div className="project-chart">

      <div className="project-chart-header">
        <h2>Tasks by Project</h2>
      </div>

      <div className="project-chart-body">
        <Bar
          data={data}
          options={options}
        />
      </div>

    </div>
  );
}