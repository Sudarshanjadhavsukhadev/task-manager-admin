import { useEffect, useState } from "react";
import "./Users.css";

import DashboardLayout from "../../components/layout/DashboardLayout";
import UserFilters from "../../components/users/UserFilters";
import UserTable from "../../components/users/UserTable";


import { getUsers } from "../../services/user.service";

export default function Users() {



  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {

    try {

      setLoading(true);

      const data = await getUsers();

      setUsers(data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  return (
    <DashboardLayout>

      <div className="users-page">

        <div className="users-header">

          <div>

            <h1>Users</h1>

            <p>Manage all registered users.</p>

          </div>



        </div>

        <UserFilters />

        {loading ? (

          <div className="loading-users">

            <div className="loader"></div>

            <p>Loading users...</p>

          </div>

        ) : (

          <UserTable users={users} />

        )}



      </div>

    </DashboardLayout>
  );
}