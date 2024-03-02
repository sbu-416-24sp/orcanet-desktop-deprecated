import SearchBar from "./SearchBar.tsx";
import TimeBar from "./TimeBar.tsx";

export default function Header() {
  return (
    <div className="flex justify-between items-center mb-12">
      <SearchBar />
      <TimeBar />
    </div>
  );
}
