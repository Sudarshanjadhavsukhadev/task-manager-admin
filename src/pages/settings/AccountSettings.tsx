import "./AccountSettings.css";
import { Building2 } from "lucide-react";

export default function AccountSettings() {
  return (
    <div className="account-settings">

      <div className="settings-card-header">
        <h2>Account & Workspace</h2>
        <p>Manage your workspace information and localization settings.</p>
      </div>

      <div className="account-grid">

        <div className="form-group">
          <label>Workspace Name</label>
          <input
            type="text"
            placeholder="Enter workspace name"
          />
        </div>

        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            placeholder="Enter company name"
          />
        </div>

        <div className="form-group">
          <label>Timezone</label>

          <select>
            <option>(GMT+05:30) India Standard Time</option>
            <option>(GMT+00:00) UTC</option>
            <option>(GMT-05:00) Eastern Time</option>
            <option>(GMT+01:00) Central European Time</option>
          </select>
        </div>

        <div className="form-group">
          <label>Language</label>

          <select>
            <option>English</option>
            <option>Hindi</option>
            <option>Marathi</option>
          </select>
        </div>

      </div>

      <button className="workspace-btn">
        <Building2 size={18} />
        Save Workspace
      </button>

    </div>
  );
}