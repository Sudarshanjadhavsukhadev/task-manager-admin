import "./ProjectFilters.css";
import { Search } from "lucide-react";

export default function ProjectFilters() {
  return (
    <div className="project-filters">

      <div className="search-box">
        <Search size={18} className="search-icon" />

        <input
          type="text"
          placeholder="Search projects..."
        />
      </div>

      <select>
        <option>All Status</option>
        <option>Planning</option>
        <option>Active</option>
        <option>Completed</option>
        <option>On Hold</option>
      </select>

      <select>
        <option>All Priority</option>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

    </div>
  );
}