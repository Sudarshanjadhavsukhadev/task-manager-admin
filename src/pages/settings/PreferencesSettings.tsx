import "./PreferencesSettings.css";
import { Settings, Save } from "lucide-react";
import { useState } from "react";

export default function PreferencesSettings() {
  const [autoSave, setAutoSave] = useState(true);

  return (
    <div className="preferences-settings">

      <div className="settings-card-header">
        <h2>
          <Settings size={22} />
          Preferences
        </h2>

        <p>
          Customize your default workspace preferences.
        </p>
      </div>

      <div className="preferences-grid">

        <div className="form-group">
          <label>Date Format</label>

          <select>
            <option>DD/MM/YYYY</option>
            <option>MM/DD/YYYY</option>
            <option>YYYY-MM-DD</option>
          </select>
        </div>

        <div className="form-group">
          <label>Time Format</label>

          <select>
            <option>12 Hour</option>
            <option>24 Hour</option>
          </select>
        </div>

        <div className="form-group">
          <label>First Day of Week</label>

          <select>
            <option>Monday</option>
            <option>Sunday</option>
          </select>
        </div>

        <div className="form-group">
          <label>Default Task View</label>

          <select>
            <option>Board</option>
            <option>List</option>
            <option>Calendar</option>
          </select>
        </div>

        <div className="form-group">
          <label>Default Priority</label>

          <select>
            <option>Medium</option>
            <option>High</option>
            <option>Low</option>
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

      <div className="autosave-row">

        <div>
          <h4>Auto Save</h4>

          <p>Automatically save changes while editing tasks.</p>
        </div>

        <label className="switch">
          <input
            type="checkbox"
            checked={autoSave}
            onChange={() => setAutoSave(!autoSave)}
          />
          <span className="slider"></span>
        </label>

      </div>

      <button className="preferences-btn">
        <Save size={18} />
        Save Preferences
      </button>

    </div>
  );
}