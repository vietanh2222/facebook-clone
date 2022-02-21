import React, { useState, useEffect } from "react";
import FriendRequest from "./FriendRequest";
import "./MainFriends.css";
import FriendSuggest from "./FriendSuggest";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../home/firebase";

function MainFriends() {
  const [friendRequests, setFriendRequests] = useState([]);
  const [friendSuggest, setFriendSuggest] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, "friendRequests"), (snapshot) => {
      setFriendRequests(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });

    onSnapshot(collection(db, "friendSuggest"), (snapshot) => {
      setFriendSuggest(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  }, []);

  return (
    <div className="mainfriends">
      <div className="mainfriends__request">
        <div className="mainfriends__header">
          <h2>Friend Request</h2>
          <p>View All</p>
        </div>
        <div className="mainfriends__body">
          {friendRequests.map((friend) => (
            <FriendRequest
              key={friend.id}
              profilePic={friend.profilePic}
              name={friend.name}
            />
          ))}
        </div>
        <hr className="mainfriends__hr"></hr>
      </div>
      <div className="mainfriends__suggest">
        <div className="mainfriends__header">
          <h2>People you may know</h2>
          <p>View All</p>
        </div>
        <div className="friendsuggest__body">
          {friendSuggest.map((friend) => (
            <FriendSuggest
              key={friend.id}
              profilePic={friend.profilePic}
              name={friend.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainFriends;
