import "./QuickAddSheet.css";
import {
  ClipboardList,
  FolderKanban,
  CalendarPlus,
  Users,
  X,
} from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function QuickAddSheet({
  open,
  onClose,
}: Props) {
  return (
    <>
      <div
        className={`sheet-overlay ${open ? "show" : ""}`}
        onClick={onClose}
      />

      <div className={`quick-sheet ${open ? "show" : ""}`}>

        <div className="sheet-handle" />

        <h2>Create New</h2>

        <button className="sheet-item">
          <ClipboardList size={22} />
          <span>New Task</span>
        </button>

        <button className="sheet-item">
          <FolderKanban size={22} />
          <span>New Project</span>
        </button>

        <button className="sheet-item">
          <CalendarPlus size={22} />
          <span>New Event</span>
        </button>

        <button className="sheet-item">
          <Users size={22} />
          <span>New Team</span>
        </button>

        <button
          className="close-btn"
          onClick={onClose}
        >
          <X size={20} />
          Close
        </button>

      </div>
    </>
  );
}