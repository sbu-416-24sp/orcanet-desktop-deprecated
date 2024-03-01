import SearchBar from "./SearchBar.tsx";
import TimeBar from "./TimeBar.tsx";

export default function Header() {
  return (
    <div className="header">
      <SearchBar />
      <TimeBar />
    </div>
  );
}
