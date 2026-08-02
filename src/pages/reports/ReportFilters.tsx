import "./ReportFilters.css";
import { Search } from "lucide-react";

export default function ReportFilters() {
  return (
    <div className="report-filters">

      <div className="filter-group">
        <label>Date Range</label>
        <select>
          <option>Today</option>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Project</label>
        <select>
          <option>All Projects</option>
          <option>MJK Academy</option>
          <option>MJK Production</option>
          <option>Personal</option>
        </select>
      </div>

      <div className="filter-group">
        <label>User</label>
        <select>
          <option>All Users</option>
          <option>Mayur</option>
          <option>Rahul</option>
          <option>Sneha</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Status</label>
        <select>
          <option>All Status</option>
          <option>Completed</option>
          <option>Pending</option>
          <option>Overdue</option>
        </select>
      </div>

      <div className="filter-search">
        <Search size={18} />

        <input
          type="text"
          placeholder="Search reports..."
        />
      </div>

    </div>
  );
}