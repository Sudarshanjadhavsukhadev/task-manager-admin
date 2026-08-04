import "./Dashboard.css";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useEffect } from "react";
import { supabase } from "../../lib/supabase";

// We will create this next
import TeamMembers from "../../components/dashboard/TeamMembers";

export default function Dashboard() {
  useEffect(() => {
    const channel = supabase
      .channel("dashboard-refresh")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "projects",
        },
        () => {
          // TeamMembers will automatically refresh itself
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <DashboardLayout>
      <div className="dashboard">

        <TeamMembers />

      </div>
    </DashboardLayout>
  );
}