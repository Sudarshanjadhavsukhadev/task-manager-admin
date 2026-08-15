import "./Settings.css";

import DashboardLayout from "../../components/layout/DashboardLayout";

import ProfileSettings from "./ProfileSettings";




export default function Settings() {
  return (
    <DashboardLayout>
      <div className="settings-page">

        <div className="settings-header">
          <h1>Settings</h1>

          <p>
            Manage your account, workspace, security, notifications,
            integrations and preferences.
          </p>
        </div>

        <ProfileSettings />

       
       

        

      </div>
    </DashboardLayout>
  );
}