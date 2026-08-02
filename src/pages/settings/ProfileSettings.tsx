import "./ProfileSettings.css";
import { Camera, Save } from "lucide-react";

export default function ProfileSettings() {
  return (
    <div className="profile-settings">

      <div className="settings-card-header">
        <h2>Profile Information</h2>
        <p>Update your personal information and profile picture.</p>
      </div>

      <div className="profile-content">

        <div className="profile-avatar">

          <div className="avatar-circle">
            MJ
          </div>

          <button className="upload-btn">
            <Camera size={18} />
            Change Photo
          </button>

        </div>

        <div className="profile-form">

          <div className="form-grid">

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter full name"
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter email"
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                placeholder="Enter phone number"
              />
            </div>

            <div className="form-group">
              <label>Job Title</label>
              <input
                type="text"
                placeholder="Enter designation"
              />
            </div>

          </div>

          <button className="save-btn">
            <Save size={18} />
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}