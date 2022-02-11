import React, { useState } from "react";
import './ReactionCounter.css';
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import wow from "../../assets/images/emoji/wow.png";
import angry from "../../assets/images/emoji/angry.png";
import sad from "../../assets/images/emoji/sad.png";
import haha from "../../assets/images/emoji/haha.png";
import love from "../../assets/images/emoji/love.png";

function ReactionCounter({ reaction, currentUserReaction, isComment }) {
  const reactionLike = reaction.filter((like) => like.emoji === "like");
  const reactionHaha = reaction.filter((haha) => haha.emoji === "haha");
  const reactionAngry = reaction.filter((angry) => angry.emoji === "angry");
  const reactionSad = reaction.filter((sad) => sad.emoji === "sad");
  const reactionWow = reaction.filter((wow) => wow.emoji === "wow");
  const reactionLove = reaction.filter((love) => love.emoji === "love");
  const noReaction = reaction.filter((noReact) => noReact.emoji === "");

  const [likeShowUserOpen, setLikeShowUserOpen] = useState(false);
  const [angryShowUserOpen, setAngryShowUserOpen] = useState(false);
  const [wowShowUserOpen, setWowShowUserOpen] = useState(false);
  const [loveShowUserOpen, setLoveShowUserOpen] = useState(false);
  const [hahaShowUserOpen, setHahaShowUserOpen] = useState(false);
  const [sadShowUserOpen, setSadShowUserOpen] = useState(false);
  const [allShowUserOpen, setAllShowUserOpen] = useState(false);

  console.log(currentUserReaction.emoji);
  return (
    <div className="option__count">
      {reactionLike.length > 0 && (
        <div
          className="showUser"
          onMouseEnter={() => setLikeShowUserOpen(true)}
          onMouseLeave={() => setLikeShowUserOpen(false)}
        >
          <ThumbUpIcon />
          {likeShowUserOpen && (
            <div className="showUserDetail">
              <h2>Like</h2>
              {reactionLike.length === 0 && <p>No like yet !</p>}
              {reactionLike.map((user, index) => {
                if (index < 8) {
                  return <p key={index}>{user.user}</p>;
                } else {
                  if (index === 8) {
                    return (
                      <p key={index}>
                        and {reactionLike.length - index} others...
                      </p>
                    );
                  } else {
                    return <></>;
                  }
                }
              })}
            </div>
          )}
        </div>
      )}
      {reactionLove.length > 0 && (
        <div
          className="showUser"
          onMouseEnter={() => setLoveShowUserOpen(true)}
          onMouseLeave={() => setLoveShowUserOpen(false)}
        >
          <img src={love} alt="" />
          {loveShowUserOpen && (
            <div className="showUserDetail">
              <h2>Love</h2>
              {reactionLove.length === 0 && <p>No like yet !</p>}
              {reactionLove.map((user, index) => {
                if (index < 8) {
                  return <p key={index}>{user.user}</p>;
                } else {
                  if (index === 8) {
                    return (
                      <p key={index}>
                        and {reactionLove.length - index} others...
                      </p>
                    );
                  } else {
                    return <></>;
                  }
                }
              })}
            </div>
          )}
        </div>
      )}

      {reactionHaha.length > 0 && (
        <div
          className="showUser"
          onMouseEnter={() => setHahaShowUserOpen(true)}
          onMouseLeave={() => setHahaShowUserOpen(false)}
        >
          <img src={haha} alt="" />
          {hahaShowUserOpen && (
            <div className="showUserDetail">
              <h2>Haha</h2>
              {reactionHaha.length === 0 && <p>No like yet !</p>}
              {reactionHaha.map((user, index) => {
                if (index < 8) {
                  return <p key={index}>{user.user}</p>;
                } else {
                  if (index === 8) {
                    return (
                      <p key={index}>
                        and {reactionHaha.length - index} others...
                      </p>
                    );
                  } else {
                    return <></>;
                  }
                }
              })}
            </div>
          )}
        </div>
      )}
      {reactionWow.length > 0 && (
        <div
          className="showUser"
          onMouseEnter={() => setWowShowUserOpen(true)}
          onMouseLeave={() => setWowShowUserOpen(false)}
        >
          <img src={wow} alt="" />
          {wowShowUserOpen && (
            <div className="showUserDetail">
              <h2>Wow</h2>
              {reactionWow.length === 0 && <p>No like yet !</p>}
              {reactionWow.map((user, index) => {
                if (index < 8) {
                  return <p key={index}>{user.user}</p>;
                } else {
                  if (index === 8) {
                    return (
                      <p key={index}>
                        and {reactionWow.length - index} others...
                      </p>
                    );
                  } else {
                    return <></>;
                  }
                }
              })}
            </div>
          )}
        </div>
      )}
      {reactionSad.length > 0 && (
        <div
          className="showUser"
          onMouseEnter={() => setSadShowUserOpen(true)}
          onMouseLeave={() => setSadShowUserOpen(false)}
        >
          <img src={sad} alt="" />
          {sadShowUserOpen && (
            <div className="showUserDetail">
              <h2>Sad</h2>
              {reactionSad.length === 0 && <p>No like yet !</p>}
              {reactionSad.map((user, index) => {
                if (index < 8) {
                  return <p key={index}>{user.user}</p>;
                } else {
                  if (index === 8) {
                    return (
                      <p key={index}>
                        and {reactionSad.length - index} others...
                      </p>
                    );
                  } else {
                    return <></>;
                  }
                }
              })}
            </div>
          )}
        </div>
      )}

      {reactionAngry.length > 0 && (
        <div
          className="showUser"
          onMouseEnter={() => setAngryShowUserOpen(true)}
          onMouseLeave={() => setAngryShowUserOpen(false)}
        >
          <img src={angry} alt="" />
          {angryShowUserOpen && (
            <div className="showUserDetail">
              <h2>Angry</h2>
              {reactionAngry.length === 0 && <p>No like yet !</p>}
              {reactionAngry.map((user, index) => {
                if (index < 8) {
                  return <p key={index}>{user.user}</p>;
                } else {
                  if (index === 8) {
                    return (
                      <p key={index}>
                        and {reactionAngry.length - index} others...
                      </p>
                    );
                  } else {
                    return <></>;
                  }
                }
              })}
            </div>
          )}
        </div>
      )}

      <div
        className="showUser"
        onMouseEnter={() => setAllShowUserOpen(true)}
        onMouseLeave={() => setAllShowUserOpen(false)}
      >
        {reaction.length === 1 && currentUserReaction.emoji !== "" && currentUserReaction.emoji !== undefined ? (
          <p>{isComment ? reaction.length : reaction[0].user}</p>
        ) : (
          <>
            {reaction.length > 1 && currentUserReaction.emoji !== "" ? (
              <p>{isComment ? reaction.length : `You and ${reaction.length - 1} others`}</p>
            ) : (
              <>
                {reaction.length > noReaction.length && (
                  <p>{reaction.length - noReaction.length}</p>
                )}
              </>
            )}
          </>
        )}
        {allShowUserOpen && (
          <div className="showUserDetail">
            <h2>People</h2>
            {reaction.length === 0 && <p>No reaction yet!</p>}
            {reaction.map((user, index) => {
              if (user.emoji === "") {
                return <div key={index}></div>;
              }
              if (index < 8) {
                return <p key={index}>{user.user}</p>;
              } else {
                if (index === 8) {
                  return (
                    <p key={index}>and {reaction.length - index} others...</p>
                  );
                } else {
                  return <></>;
                }
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ReactionCounter;
