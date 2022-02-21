import React from "react";
import "./Friends.css";
import MainFriends from "./MainFriends";
import SideBarFriends from "./SideBarFriends";

function Friends() {
  return (
    <div className="friends">
      <SideBarFriends />
      <MainFriends />
    </div>
  );
}

export default Friends;
