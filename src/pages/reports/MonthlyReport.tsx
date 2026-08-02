import "./MonthlyReport.css";

const reports = [
  {
    task: "Landing Page Design",
    assigned: "Mayur",
    project: "MJK Academy",
    priority: "High",
    due: "25 Jul 2026",
    status: "Completed",
  },
  {
    task: "API Integration",
    assigned: "Rahul",
    project: "Production",
    priority: "Medium",
    due: "28 Jul 2026",
    status: "Pending",
  },
  {
    task: "Marketing Campaign",
    assigned: "Sneha",
    project: "Marketing",
    priority: "High",
    due: "22 Jul 2026",
    status: "Overdue",
  },
  {
    task: "Database Backup",
    assigned: "Amit",
    project: "Infrastructure",
    priority: "Low",
    due: "30 Jul 2026",
    status: "Completed",
  },
];

export default function MonthlyReport() {
  return (
    <div className="monthly-report">
      <div className="section-header">
        <h2>Monthly Task Report</h2>
      </div>

      <div className="report-table-wrapper">
        <table className="report-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Assigned To</th>
              <th>Project</th>
              <th>Priority</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((item, index) => (
              <tr key={index}>
                <td>{item.task}</td>

                <td>{item.assigned}</td>

                <td>{item.project}</td>

                <td>
                  <span
                    className={`badge priority ${item.priority.toLowerCase()}`}
                  >
                    {item.priority}
                  </span>
                </td>

                <td>{item.due}</td>

                <td>
                  <span
                    className={`badge status ${item.status.toLowerCase()}`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}