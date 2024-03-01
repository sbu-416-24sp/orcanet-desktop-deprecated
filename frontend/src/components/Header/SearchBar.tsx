import { Search } from "react-bootstrap-icons";

const SearchBar = () => {
  return (
    <div className="searchBar">
      <Search size={15} className="search-icon" />

      <input
        type="text"
        placeholder="Search File/CID"
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
