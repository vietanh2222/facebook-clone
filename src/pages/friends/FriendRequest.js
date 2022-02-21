import { Button } from "@mui/material";
import React from "react";
import "./FriendRequest.css";

function FriendRequest({ profilePic, name }) {
  return (
    <div className="friendrequest">
      <img alt="" src={profilePic}></img>
      <div className="friendrequest__title">
        <h4>{name}</h4>
        <Button>Confirm</Button>
        <Button>Delete</Button>
      </div>
    </div>
  );
}

export default FriendRequest;
