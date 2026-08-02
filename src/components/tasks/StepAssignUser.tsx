import "./StepAssignUser.css";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";

type User = {
  id: number;
  name: string;
  role: string;
};

type Props = {
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
  onNext: () => void;
  onBack: () => void;
};

const users: User[] = [
  { id: 1, name: "Mayur", role: "Admin" },
  { id: 2, name: "Rahul", role: "Trainer" },
  { id: 3, name: "Sneha", role: "Manager" },
  { id: 4, name: "Amit", role: "Employee" },
];

export default function StepAssignUser({
  selectedUser,
  setSelectedUser,
  onNext,
  onBack,
}: Props) {
  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="step-page">

      <h2>Assign User</h2>

      <p>Select who will be responsible for this task.</p>

      <div className="search-box">
        <Search size={18} />

        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="user-list">

        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className={`user-card ${
              selectedUser?.id === user.id ? "selected" : ""
            }`}
            onClick={() => setSelectedUser(user)}
          >
            <div className="avatar">
              {user.name.charAt(0)}
            </div>

            <div>
              <h4>{user.name}</h4>
              <span>{user.role}</span>
            </div>
          </div>
        ))}

      </div>

      <div className="wizard-footer">

        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>

        <button
          className="next-btn"
          disabled={!selectedUser}
          onClick={onNext}
        >
          Continue →
        </button>

      </div>

    </div>
  );
}