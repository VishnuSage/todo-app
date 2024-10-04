// src/components/SearchBar.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../redux/todoSlice";
import { FaSearch } from "react-icons/fa"; // Import the magnifying glass icon

const SearchBar = () => {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <input
        type="text"
        placeholder="Search todos..."
        onChange={handleSearch}
        style={{
          width: "100%",
          padding: "10px 40px 10px 10px", // Adjust padding for the icon
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginBottom: "10px",
        }}
      />
      <FaSearch
        style={{
          position: "absolute",
          right: "10px",
          top: "42%",
          transform: "translateY(-50%)",
          color: "#aaa",
        }}
      />
    </div>
  );
};

export default SearchBar;
