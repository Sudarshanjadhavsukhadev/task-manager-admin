import "./BackupSettings.css";
import {
  Database,
  FileSpreadsheet,
  FileText,
  Download,
  Upload,
} from "lucide-react";

export default function BackupSettings() {
  return (
    <div className="backup-settings">

      <div className="settings-card-header">
        <h2>
          <Database size={22} />
          Backup & Export
        </h2>

        <p>
          Backup your workspace data or export reports in different formats.
        </p>
      </div>

      <div className="backup-grid">

        <div className="backup-card">

          <Database size={34} />

          <h3>Create Backup</h3>

          <p>
            Generate a complete backup of your workspace.
          </p>

          <button>Create Backup</button>

        </div>

        <div className="backup-card">

          <FileSpreadsheet size={34} />

          <h3>Export Excel</h3>

          <p>
            Download tasks and reports as an Excel file.
          </p>

          <button>
            <Download size={18} />
            Export
          </button>

        </div>

        <div className="backup-card">

          <FileText size={34} />

          <h3>Export PDF</h3>

          <p>
            Download printable reports in PDF format.
          </p>

          <button>
            <Download size={18} />
            Export
          </button>

        </div>

        <div className="backup-card">

          <Upload size={34} />

          <h3>Restore Backup</h3>

          <p>
            Restore your workspace using a backup file.
          </p>

          <button>Restore</button>

        </div>

      </div>

    </div>
  );
}