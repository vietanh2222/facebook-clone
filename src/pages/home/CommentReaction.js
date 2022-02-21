import React, { useRef, useEffect, useState } from "react";
import "./CommentReaction.css";
import { FacebookSelector } from "@charkour/react-reactions";
import { collection, doc, updateDoc, addDoc } from "firebase/firestore";
import db from "./firebase";
import CommentReactionDisplay from "./CommentReactionDisplay";

function CommentReaction({
  userReactionComment,
  commentId,
  postId,
  userLogin,
}) {
  const [isOpenBar, setIsOpenBar] = useState(false);
  const [userReaction, setUserReaction] = useState("");
  const currentUserReaction = useRef({});
  const listUserReaction = useRef([]);
  const reactionList = useRef([]);
  const timeOutEmojibarOpen = useRef("");
  const timeOutEmojibarClose = useRef("");
  const [isEmojiBarMobileOpen, setIsEmojiMobileOpen] = useState(false);

  useEffect(() => {
    reactionList.current = ["haha", "sad", "angry", "love", "wow"];
  }, []);

  useEffect(() => {
    currentUserReaction.current =
      userReactionComment.find((user) => user.user === userLogin) || {};
    setUserReaction(currentUserReaction.current.emoji);
    listUserReaction.current = userReactionComment.filter(
      (user) => user.emoji !== ""
    );
  }, [userReactionComment, userLogin]);

  const handleLike = async () => {
    if (userReaction === undefined) {
      await addDoc(collection(db, "userReactionComment"), {
        postId,
        commentId,
        user: userLogin,
        emoji: "like",
      });
      handleCloseEmojiBar();
      return;
    }
    if (
      userReaction !== "like" &&
      !reactionList.current.includes(userReaction)
    ) {
      await updateDoc(
        doc(db, "userReactionComment", currentUserReaction.current.id),
        {
          emoji: "like",
        }
      );
    } else {
      await updateDoc(
        doc(db, "userReactionComment", currentUserReaction.current.id),
        {
          emoji: "",
        }
      );
    }
    handleCloseEmojiBar();
  };

  const handleReaction = async (emoji) => {
    if (emoji === userReaction) {
      handleCloseEmojiBar();
      return;
    }
    if (userReaction === undefined) {
      await addDoc(collection(db, "userReactionComment"), {
        postId,
        commentId,
        user: userLogin,
        emoji,
      });
      handleCloseEmojiBar();
    } else {
      handleCloseEmojiBar();
      await updateDoc(
        doc(db, "userReactionComment", currentUserReaction.current.id),
        {
          emoji,
        }
      );
    }
  };
  const handleCloseEmojiBar = () => {
    setIsOpenBar(false);
  };

  const handleOpenEmojiBar = () => {
    setIsOpenBar(true);
  };

  const handleOpenEmojiBarMobile = () => {
    setIsEmojiMobileOpen(true);
    window.addEventListener("click", handleCloseEmojiBarMobile);
  };

  const handleCloseEmojiBarMobile = () => {
    setIsEmojiMobileOpen(false);
    window.removeEventListener("click", handleCloseEmojiBarMobile);
  };
  return (
    <div className="commentReactionOptions">
      {isOpenBar && (
        <div
          className="facebookSelector commentEmoji"
          onMouseEnter={() => {
            clearTimeout(timeOutEmojibarClose.current);
          }}
          onMouseLeave={() => {
            clearTimeout(timeOutEmojibarOpen.current);
            timeOutEmojibarClose.current = setTimeout(
              handleCloseEmojiBar,
              2000
            );
          }}
        >
          <FacebookSelector onSelect={(emoji) => handleReaction(emoji)} />
        </div>
      )}
      <div
        onClick={handleLike}
        onMouseEnter={() => {
          timeOutEmojibarOpen.current = setTimeout(handleOpenEmojiBar, 1000);
          clearTimeout(timeOutEmojibarClose.current);
        }}
        onMouseLeave={() => {
          timeOutEmojibarClose.current = setTimeout(handleCloseEmojiBar, 2000);
          clearTimeout(timeOutEmojibarOpen.current);
        }}
        className="commentReaction__Display"
      >
        <CommentReactionDisplay
          userReaction={currentUserReaction.current.emoji}
          reactionList={reactionList.current}
        />
      </div>
      {isEmojiBarMobileOpen && (
        <div className="facebookSelector" onClick={handleCloseEmojiBarMobile}>
          <FacebookSelector onSelect={(emoji) => handleReaction(emoji)} />
        </div>
      )}
      <div
        className={
          userReaction === "like"
            ? "post__reaction-mobile option--active"
            : "post__reaction-mobile"
        }
        onClick={(e) => {
          e.stopPropagation();
          if (isEmojiBarMobileOpen) {
            handleCloseEmojiBarMobile();
          } else {
            handleOpenEmojiBarMobile();
          }
        }}
      >
        <CommentReactionDisplay
          userReaction={currentUserReaction.current.emoji}
          reactionList={reactionList.current}
        />
      </div>
    </div>
  );
}

export default CommentReaction;
