import "./SecuritySettings.css";
import {
  Shield,
  KeyRound,
  Smartphone,
  LogOut,
} from "lucide-react";

export default function SecuritySettings() {
  return (
    <div className="security-settings">

      <div className="settings-card-header">
        <h2>
          <Shield size={22} />
          Security
        </h2>

        <p>
          Protect your account with advanced security options.
        </p>
      </div>

      <div className="security-list">

        <div className="security-item">

          <div className="security-info">
            <KeyRound size={22} />

            <div>
              <h4>Change Password</h4>

              <p>Update your account password regularly.</p>
            </div>
          </div>

          <button className="security-btn">
            Change
          </button>

        </div>

        <div className="security-item">

          <div className="security-info">
            <Smartphone size={22} />

            <div>
              <h4>Two-Factor Authentication</h4>

              <p>Add an extra layer of protection.</p>
            </div>
          </div>

          <button className="security-btn">
            Enable
          </button>

        </div>

        <div className="security-item">

          <div className="security-info">
            <LogOut size={22} />

            <div>
              <h4>Logout From All Devices</h4>

              <p>End all active sessions immediately.</p>
            </div>
          </div>

          <button className="logout-btn">
            Logout All
          </button>

        </div>

      </div>

      <div className="session-card">

        <h3>Active Session</h3>

        <div className="session-row">
          <span>Windows • Chrome</span>

          <span className="session-active">
            Current Device
          </span>
        </div>

      </div>

    </div>
  );
}