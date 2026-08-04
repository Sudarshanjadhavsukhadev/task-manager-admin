import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../services/user.service";
import { getProjects } from "../../services/project.service";
import { supabase } from "../../lib/supabase";
import "./TeamMembers.css";
import { Search } from "lucide-react";


export default function TeamMembers() {
  const [users, setUsers] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadData();

    const projectChannel = supabase
      .channel("team-projects")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "projects",
        },
        () => {
          loadData();
        }
      )
      .subscribe();

    const userChannel = supabase
      .channel("team-users")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "users",
        },
        () => {
          loadData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(projectChannel);
      supabase.removeChannel(userChannel);
    };
  }, []);

  async function loadData() {
    try {
      const userData = await getUsers();
      const projectData = await getProjects();

      setUsers(userData.filter((u: any) => u.role === "user"));
      setProjects(projectData);
    } catch (err) {
      console.error(err);
    }
  }
  const filteredUsers = users.filter((user) =>
    user.full_name
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||
    user.email
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="team-members">

      <div className="team-header">
        <h1>Team Members</h1>

        <p>
          Track performance, assigned tasks and productivity.
        </p>

        <div className="team-search">

          <Search className="team-search-icon" size={20} />

          <input
            type="text"
            placeholder="Search employee by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>
      </div>

      <div className="team-grid">

        {filteredUsers.map((user) => {

          const assigned = projects.filter(
            (p) => p.assigned_user_id === user.id
          );

          const completed = assigned.filter(
            (p) => p.status === "Completed"
          );

          const pending = assigned.filter(
            (p) => p.status !== "Completed"
          );

          const progress =
            assigned.length === 0
              ? 0
              : Math.round(
                (completed.length / assigned.length) * 100
              );

         

          return (
            <div
              key={user.id}
              className="team-card"
              onClick={() =>
                navigate(`/admin/users/${user.id}`)
              }
            >

              <div className="avatar">
                {user.full_name.charAt(0)}
              </div>

              <h2>{user.full_name}</h2>

              <p>{user.email}</p>

              <div className="stats">

                <div>
                  <span>Assigned</span>
                  <strong>{assigned.length}</strong>
                </div>

                <div>
                  <span>Completed</span>
                  <strong>{completed.length}</strong>
                </div>

                <div>
                  <span>Pending</span>
                  <strong>{pending.length}</strong>
                </div>

              </div>

              <div className="progress-text">
                {progress}% Completed
              </div>

              <div className="progress">

                <div
                  className="progress-fill"
                  style={{
                    width: `${progress}%`,
                  }}
                />

              </div>



              <button className="view-btn">
                View Details →
              </button>

            </div>
          );

        })}

      </div>

    </div>
  );
}