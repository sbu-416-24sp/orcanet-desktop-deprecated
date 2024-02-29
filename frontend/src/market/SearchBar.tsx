import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchBar = () => {
  return (
    <div>
      <Input
        type="search"
        className="max-w-sm inline"
        placeholder="hash | url"
      />
      <Button type="submit">Search</Button>
    </div>
  );
};

export default SearchBar;
