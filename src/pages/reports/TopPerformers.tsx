import "./TopPerformers.css";
import { Trophy } from "lucide-react";

const performers = [
  {
    rank: 1,
    name: "Mayur",
    role: "Project Manager",
    completed: 96,
    efficiency: "98%",
  },
  {
    rank: 2,
    name: "Rahul",
    role: "Frontend Developer",
    completed: 88,
    efficiency: "95%",
  },
  {
    rank: 3,
    name: "Sneha",
    role: "UI/UX Designer",
    completed: 84,
    efficiency: "93%",
  },
  {
    rank: 4,
    name: "Amit",
    role: "Backend Developer",
    completed: 79,
    efficiency: "90%",
  },
];

export default function TopPerformers() {
  return (
    <div className="top-performers">

      <div className="section-header">

        <h2>
          <Trophy size={22} />
          Top Performers
        </h2>

      </div>

      <table>

        <thead>

          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Role</th>
            <th>Completed</th>
            <th>Efficiency</th>
          </tr>

        </thead>

        <tbody>

          {performers.map((user) => (

            <tr key={user.rank}>

              <td>#{user.rank}</td>

              <td>{user.name}</td>

              <td>{user.role}</td>

              <td>{user.completed}</td>

              <td>
                <span className="efficiency">
                  {user.efficiency}
                </span>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}