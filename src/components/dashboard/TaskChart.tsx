import "./TaskChart.css";

import { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getProjects } from "../../services/project.service";

const COLORS = ["#2563EB", "#F59E0B", "#EF4444"];

export default function TaskChart() {

  const [data, setData] = useState([
    {
      name: "Completed",
      value: 0,
    },
    {
      name: "Pending",
      value: 0,
    },
    {
      name: "Overdue",
      value: 0,
    },
  ]);

  useEffect(() => {
    loadChart();
  }, []);

  const loadChart = async () => {

    try {

      const projects = await getProjects();

      const completed = projects.filter(
        (p) => p.status === "Completed"
      ).length;

      const pending = projects.filter((p) => {

        return (
          p.status !== "Completed" &&
          new Date(p.created_at).toDateString() ===
            new Date().toDateString()
        );

      }).length;

      const overdue = projects.filter((p) => {

        const created = new Date(p.created_at);

        const dueTime = new Date(
          created.getTime() + 24 * 60 * 60 * 1000
        );

        return (
          p.status !== "Completed" &&
          new Date() > dueTime
        );

      }).length;

      setData([
        {
          name: "Completed",
          value: completed,
        },
        {
          name: "Pending",
          value: pending,
        },
        {
          name: "Overdue",
          value: overdue,
        },
      ]);

    } catch (err) {

      console.error(err);

    }

  };

  return (
    <div className="task-chart">

      <div className="task-chart-header">
        <h2 className="task-chart-title">
          Task Status
        </h2>
      </div>

      <div className="chart-wrapper">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
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

        {data.map((item) => (

          <div
            key={item.name}
            className="legend-item"
          >

            <span
              className={`legend-dot ${
                item.name.toLowerCase()
              }`}
            ></span>

            {item.name} ({item.value})

          </div>

        ))}

      </div>

    </div>
  );

}