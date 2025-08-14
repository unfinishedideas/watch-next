import React, { useState, useEffect, useRef, ChangeEvent } from "react";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const prevSearchTerm = useRef<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm !== prevSearchTerm.current) {
        onSearch(searchTerm);
        prevSearchTerm.current = searchTerm;
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, onSearch]);

  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={handleChange}
    />
  );
};

export default SearchBar;
