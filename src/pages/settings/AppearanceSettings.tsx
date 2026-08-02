import "./AppearanceSettings.css";
import { Palette, Monitor, Moon, Sun } from "lucide-react";
import { useState } from "react";

export default function AppearanceSettings() {
  const [theme, setTheme] = useState("light");

  return (
    <div className="appearance-settings">

      <div className="settings-card-header">
        <h2>
          <Palette size={22} />
          Appearance
        </h2>

        <p>Customize the look and feel of your workspace.</p>
      </div>

      <div className="theme-options">

        <div
          className={`theme-card ${theme === "light" ? "active" : ""}`}
          onClick={() => setTheme("light")}
        >
          <Sun size={28} />
          <h4>Light</h4>
          <span>Bright interface</span>
        </div>

        <div
          className={`theme-card ${theme === "dark" ? "active" : ""}`}
          onClick={() => setTheme("dark")}
        >
          <Moon size={28} />
          <h4>Dark</h4>
          <span>Dark workspace</span>
        </div>

        <div
          className={`theme-card ${theme === "system" ? "active" : ""}`}
          onClick={() => setTheme("system")}
        >
          <Monitor size={28} />
          <h4>System</h4>
          <span>Match device theme</span>
        </div>

      </div>

      <div className="appearance-grid">

        <div className="form-group">
          <label>Accent Color</label>

          <input
            type="color"
            defaultValue="#2563eb"
            className="color-picker"
          />
        </div>

        <div className="form-group">
          <label>Sidebar Style</label>

          <select>
            <option>Expanded</option>
            <option>Compact</option>
            <option>Icons Only</option>
          </select>
        </div>

      </div>

      <button className="appearance-btn">
        Save Appearance
      </button>

    </div>
  );
}