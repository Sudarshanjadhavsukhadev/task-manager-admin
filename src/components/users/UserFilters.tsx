import "./UserFilters.css";
import { Search } from "lucide-react";

export default function UserFilters() {
  return (
    <div className="user-filters">

      <div className="search-box">
        <Search size={18} className="search-icon" />

        <input
          type="text"
          placeholder="Search users..."
        />
      </div>

      <select>
        <option>All Roles</option>
        <option>Admin</option>
        <option>Manager</option>
        <option>User</option>
      </select>

      <select>
        <option>All Status</option>
        <option>Active</option>
        <option>Inactive</option>
        <option>Blocked</option>
      </select>

    </div>
  );
}