import "./TopPerformers.css";
import { Trophy } from "lucide-react";
import { useEffect, useState } from "react";

import { getUsers } from "../../services/user.service";
import { getProjects } from "../../services/project.service";
import { supabase } from "../../lib/supabase";

interface Performer {
  id: string;
  name: string;
  role: string;
  assigned: number;
  completed: number;
  efficiency: number;
}

export default function TopPerformers() {

  const [performers, setPerformers] = useState<Performer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadPerformers();

    // Realtime project updates
    const projectChannel = supabase
      .channel("top-performers-projects")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "projects",
        },
        () => {
          loadPerformers();
        }
      )
      .subscribe();

    // Realtime user updates
    const userChannel = supabase
      .channel("top-performers-users")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "users",
        },
        () => {
          loadPerformers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(projectChannel);
      supabase.removeChannel(userChannel);
    };

  }, []);


  const loadPerformers = async () => {

    try {

      setLoading(true);

      const [users, projects] = await Promise.all([
        getUsers(),
        getProjects(),
      ]);

      // Only normal users
      const normalUsers = users.filter(
        (user: any) => user.role === "user"
      );

      const calculatedPerformers: Performer[] =
        normalUsers.map((user: any) => {

          const assignedProjects = projects.filter(
            (project: any) =>
              project.assigned_user_id === user.id
          );

          const completedProjects =
            assignedProjects.filter(
              (project: any) =>
                project.status === "Completed"
            );

          const assigned = assignedProjects.length;

          const completed = completedProjects.length;

          const efficiency =
            assigned === 0
              ? 0
              : Math.round(
                  (completed / assigned) * 100
                );

          return {
            id: user.id,

            name:
              user.full_name ||
              user.name ||
              "Unknown User",

            role:
              user.role === "user"
                ? "Team Member"
                : user.role || "Team Member",

            assigned,

            completed,

            efficiency,
          };

        });

      // Highest completed projects first
      calculatedPerformers.sort(
        (a, b) => {

          // First priority: completed projects
          if (b.completed !== a.completed) {
            return b.completed - a.completed;
          }

          // Second priority: efficiency
          return b.efficiency - a.efficiency;

        }
      );

      setPerformers(calculatedPerformers);

    } catch (error) {

      console.error(
        "Failed to load top performers:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  if (loading) {
    return (
      <div className="top-performers">

        <div className="section-header">

          <h2>
            <Trophy size={22} />
            Top Performers
          </h2>

        </div>

        <div className="top-performers-loading">
          Loading performers...
        </div>

      </div>
    );
  }


  return (

    <div className="top-performers">

      <div className="section-header">

        <h2>
          <Trophy size={22} />
          Top Performers
        </h2>

      </div>


      {performers.length === 0 ? (

        <div className="top-performers-empty">
          No team members found.
        </div>

      ) : (

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

            {performers.map(
              (user, index) => (

                <tr key={user.id}>

                  <td>
                    #{index + 1}
                  </td>

                  <td>
                    {user.name}
                  </td>

                  <td>
                    {user.role}
                  </td>

                  <td>
                    {user.completed}
                  </td>

                  <td>

                    <span className="efficiency">

                      {user.efficiency}%

                    </span>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      )}

    </div>

  );
}