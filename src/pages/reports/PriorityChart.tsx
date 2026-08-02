import "./PriorityChart.css";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const data = {
  labels: [
    "High",
    "Medium",
    "Low",
  ],

  datasets: [
    {
      data: [40, 35, 25],

      backgroundColor: [
        "#ef4444",
        "#f59e0b",
        "#16a34a",
      ],

      borderWidth: 0,
    },
  ],
};

const options = {
  responsive: true,

  maintainAspectRatio: false,

  plugins: {
    legend: {
      position: "bottom" as const,
    },
  },
};

export default function PriorityChart() {
  return (
    <div className="priority-chart">

      <div className="priority-chart-header">
        <h2>Priority Distribution</h2>
      </div>

      <div className="priority-chart-body">
        <Doughnut
          data={data}
          options={options}
        />
      </div>

    </div>
  );
}