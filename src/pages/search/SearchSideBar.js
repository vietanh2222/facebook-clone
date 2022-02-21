import React from "react";
import "./SearchSideBar.css";
import PeopleIcon from "@mui/icons-material/People";

function SearchSideBar() {
  return (
    <div className="searchSideBar">
      <div className="searchSideBar__header">
        <h2>Search result</h2>
      </div>
      <div className="searchSideBar__body">
        <h2>Filter</h2>
        <div className="searchSideBar__type">
          <PeopleIcon />
          <h3>People</h3>
        </div>
      </div>
    </div>
  );
}

export default SearchSideBar;
