import React from "react";
import "./SidebarfriendsRow.css";

function SidebarfriendsRow({ Icon, Arrow, title }) {
  return (
    <div className="sidebarfriendsRow">
      <Icon />
      <h4>{title}</h4>
      {Arrow && <Arrow />}
    </div>
  );
}

export default SidebarfriendsRow;
