import React, {useRef, useEffect, useState} from "react";
import "./CommentReaction.css";
import { FacebookSelector } from "@charkour/react-reactions";
import { collection, doc, updateDoc, addDoc } from "firebase/firestore";
import db from './firebase';
function CommentReaction({userReactionComment, commentId, postId, userLogin}) {
    const [isOpenBar, setIsOpenBar] = useState(false);
    const [userReaction, setUserReaction] = useState('');
    const currentUserReaction = useRef({})
    const listUserReaction = useRef([])
    const reactionList = useRef([])
    useEffect(() => {
        reactionList.current = ['haha', 'sad', 'angry', 'love', 'wow']  
    }, [])

    useEffect(() => {
        currentUserReaction.current = userReactionComment.find((user) => user.user === userLogin) || {};
        setUserReaction(currentUserReaction.current.emoji)
        listUserReaction.current = userReactionComment.filter((user) => user.emoji !== '')
    }, [userReactionComment, userLogin])
   console.log(currentUserReaction.current);
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
      await updateDoc(doc(db, "userReactionComment", currentUserReaction.current.id), {
        emoji: "like",
      });
    } else {
      await updateDoc(doc(db, "userReactionComment", currentUserReaction.current.id), {
        emoji: "",
      });
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
      await updateDoc(doc(db, "userReactionComment", currentUserReaction.current.id), {
        emoji,
      });
    }
  };
  const handleCloseEmojiBar = () => {
    setIsOpenBar(false);
  };

  

  return (
    <div
      onMouseEnter={() => setIsOpenBar(true)}
      onMouseLeave={() => setIsOpenBar(false)}
      className="commentReactionOptions"
    >
      {isOpenBar && (
        <div
          id="commentEmoji"
          className="facebookSelector"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <FacebookSelector 
            onSelect={(emoji) => handleReaction(emoji)}
          />
        </div>
      )}
      <p 
      
      onClick={handleLike}
      style={currentUserReaction.current.emoji === 'like' ? {color:'blue'}:{}}
      >Like</p>
    </div>
  );
}

export default CommentReaction;
