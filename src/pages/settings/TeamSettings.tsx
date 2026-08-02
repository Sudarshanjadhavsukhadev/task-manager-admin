import "./TeamSettings.css";
import { Users, UserPlus } from "lucide-react";

const members = [
  {
    name: "Mayur",
    role: "Admin",
    department: "Management",
  },
  {
    name: "Rahul",
    role: "Manager",
    department: "Development",
  },
  {
    name: "Sneha",
    role: "Member",
    department: "Design",
  },
];

export default function TeamSettings() {
  return (
    <div className="team-settings">

      <div className="settings-card-header">
        <h2>
          <Users size={22} />
          Team Settings
        </h2>

        <p>
          Manage your team members, roles and departments.
        </p>
      </div>

      <div className="team-header">

        <button className="invite-btn">
          <UserPlus size={18} />
          Invite Member
        </button>

      </div>

      <div className="team-table-wrapper">

        <table className="team-table">

          <thead>

            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Department</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {members.map((member, index) => (

              <tr key={index}>

                <td>{member.name}</td>

                <td>
                  <span className={`role ${member.role.toLowerCase()}`}>
                    {member.role}
                  </span>
                </td>

                <td>{member.department}</td>

                <td>
                  <span className="status active">
                    Active
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