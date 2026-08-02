import { useEffect, useState } from "react";
import "./Users.css";

import DashboardLayout from "../../components/layout/DashboardLayout";
import UserFilters from "../../components/users/UserFilters";
import UserTable from "../../components/users/UserTable";


import { getUsers } from "../../services/user.service";

export default function Users() {

  

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
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

        <UserTable users={users} />



      </div>

    </DashboardLayout>
  );
}