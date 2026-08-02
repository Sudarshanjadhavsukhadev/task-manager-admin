import "./UserTable.css";
import { Pencil, Trash2 } from "lucide-react";

interface UserTableProps {
  users: any[];
}

export default function UserTable({
  users,
}: UserTableProps) {
  return (
    <div className="user-table-card">
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Created</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user: any) => (
            <tr key={user.id}>

              <td>{user.full_name}</td>

              <td>{user.email}</td>

              <td>{user.role}</td>

              <td>
                <span className="status active">
                  Active
                </span>
              </td>

              <td>
                {new Date(user.created_at).toLocaleDateString()}
              </td>

              <td className="actions">
                <button>
                  <Pencil size={18} />
                </button>

                <button className="delete">
                  <Trash2 size={18} />
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}