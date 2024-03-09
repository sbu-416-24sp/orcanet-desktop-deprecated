import { Input } from "@/components/ui/input";
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onSearch(newValue);
  };

  return (
    <div>
       <Input
        type="search"
        className="max-w-sm inline text-black"
        value={inputValue}
        onChange={handleChange}
        placeholder="hash | url"
      />
    </div>
  );
};

export default SearchBar;
