import "./Settings.css";

import DashboardLayout from "../../components/layout/DashboardLayout";

import ProfileSettings from "./ProfileSettings";
import AccountSettings from "./AccountSettings";
import NotificationSettings from "./NotificationSettings";
import AppearanceSettings from "./AppearanceSettings";
import SecuritySettings from "./SecuritySettings";
import TeamSettings from "./TeamSettings";
import BackupSettings from "./BackupSettings";
import IntegrationSettings from "./IntegrationSettings";
import PreferencesSettings from "./PreferencesSettings";

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

        <AccountSettings />

        <NotificationSettings />

        <AppearanceSettings />

        <SecuritySettings />

        <TeamSettings />

        <BackupSettings />

        <IntegrationSettings />

        <PreferencesSettings />

      </div>
    </DashboardLayout>
  );
}