type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AddUserModal({
  open,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">

        {/* Your form goes here */}

        <button onClick={onClose}>
          Close
        </button>

      </div>
    </div>
  );
}