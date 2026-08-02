import "./SearchBar.css";
import { Search, SlidersHorizontal } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="search-container">

      <div className="search-input">

        <Search size={20} />

        <input
          type="text"
          placeholder="Search tasks, projects..."
        />

      </div>

      <button className="filter-btn">
        <SlidersHorizontal size={20} />
      </button>

    </div>
  );
}