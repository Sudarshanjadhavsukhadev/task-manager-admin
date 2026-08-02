import "./TaskChart.css";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Completed", value: 60 },
  { name: "Pending", value: 25 },
  { name: "Overdue", value: 15 },
];

const COLORS = ["#2563EB", "#F59E0B", "#EF4444"];

export default function TaskChart() {
  return (
    <div className="task-chart">

      <div className="task-chart-header">
        <h2 className="task-chart-title">
          Task Status
        </h2>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={65}
              outerRadius={110}
              paddingAngle={4}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-legend">

        <div className="legend-item">
          <span className="legend-dot completed"></span>
          Completed
        </div>

        <div className="legend-item">
          <span className="legend-dot pending"></span>
          Pending
        </div>

        <div className="legend-item">
          <span className="legend-dot overdue"></span>
          Overdue
        </div>

      </div>

    </div>
  );
}