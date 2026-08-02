import "./ReportsHeader.css";
import { FileDown, FileSpreadsheet } from "lucide-react";

export default function ReportsHeader() {
  return (
    <div className="reports-header">

      <div className="reports-title">

        <h1>Reports</h1>

        <p>
          Monitor project performance, task completion and team productivity.
        </p>

      </div>

      <div className="reports-actions">

        <button className="export-btn pdf-btn">
          <FileDown size={18} />
          Export PDF
        </button>

        <button className="export-btn excel-btn">
          <FileSpreadsheet size={18} />
          Export Excel
        </button>

      </div>

    </div>
  );
}