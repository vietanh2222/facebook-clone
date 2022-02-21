import { Avatar } from "@mui/material";
import React from "react";
import "./SearchMain.css";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { useLocation, useNavigate } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

function SearchMain() {
  let { state } = useLocation();
  if (state === null) {
    state = [];
  }
  const navigate = useNavigate();
  return (
    <div className="searchMain">
      {state.length === 0 ? (
        <div className="searchMain__result">
          <h1>No result found</h1>
        </div>
      ) : (
        <>
          {state.map((result) => (
            <div key={result.id} className="searchMain__result">
              <Avatar src={result.avatar || result.profilePic} />
              <div className="result__info">
                <h2
                  onClick={() => {
                    navigate(`/profile/${result.name.replace(/\s/g, "")}`, {
                      state: {
                        name: result.name,
                        avatar: result.avatar || result.profilePic,
                        isFriend: result.isFriend,
                      },
                    });
                  }}
                >
                  {result.name}
                </h2>
                <p>
                  {result.isFriend === "yes"
                    ? `Friend`
                    : `${Math.floor(Math.random() * 1000)} follower `}
                </p>
              </div>
              {result.isFriend === "yes" ? (
                <ChatBubbleIcon />
              ) : (
                <PersonAddIcon />
              )}
            </div>
          ))}
          <p>All results are found</p>
        </>
      )}
    </div>
  );
}

export default SearchMain;
