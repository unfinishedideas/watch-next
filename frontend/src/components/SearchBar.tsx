import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import './Components.css';

interface SearchBarProps {
  onSearch: (term: string) => void;
  title: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  title,
}: SearchBarProps) => {
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
    <div className="search-bar-container">
      {title ? <p className="search-bar-title">{title}</p> : <div />}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
