import React, { useState } from "react";
import "./searchbar.css";
import { FiSearch, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const trending = [
  "Paper Craft",
  "Wedding Gift",
  "Baby Shower",
  "Festive Gift",
  "Custom Art"
];

const categories = [
  { label: "All", value: "" },
  { label: "Gifts", value: "gifts" },
  { label: "Decor", value: "decor" },
  { label: "Art", value: "art" },
];

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/products?tag=${encodeURIComponent(query)}`);
    }
  };

  const handleClear = () => setQuery("");

  return (
    <div className="searchbar-section">
      <form className={`searchbar-form ${isFocused ? "focused" : ""}`} onSubmit={handleSubmit}>
        <select
          className="category-dropdown"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search for gifts, decor, and more..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {query && (
          <button type="button" className="clear-btn" onClick={handleClear} aria-label="Clear search">
            <FiX />
          </button>
        )}
        <button type="submit" className="submit-btn">Search</button>
      </form>

      <div className="trending-searches">
        <span>Trending: </span>
        {trending.map((item) => (
          <button
            key={item}
            className="trending-tag"
            onClick={() => setQuery(item)} // only sets input value now
            tabIndex={0}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
