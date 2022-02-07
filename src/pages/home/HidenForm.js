import React, { useState } from "react";
import "./HidenForm.css";
import CloseIcon from '@mui/icons-material/Close';
import { Avatar } from '@mui/material';
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import db from "./firebase";

function HidenForm({closeForm, userAvatar, 
    userLogin, messageModify, 
    imageModify, postId}) {
    const [message, setMessage] = useState(messageModify)
    const [image, setImage] = useState(imageModify)

    const handleModifyPost = async (e) => {
        e.preventDefault();
        await updateDoc(doc(db, 'posts', postId), {
            timestamp: serverTimestamp(),
            image,
            message
        })
        closeForm();
    }
  return (
    <div className="hidenForm" onClick={closeForm}>
      <div 
        className="hidenForm__wrapper" 
        onClick={e => { e.stopPropagation() }}
      >
        <div className="hidenForm__top">
          <h2> Modify Post</h2>
          <CloseIcon onClick={closeForm}></CloseIcon>
        </div>
        <div className="hidenForm__bottom">
          <div className="hidenForm__userInfo">
            <Avatar src={userAvatar}/>
            <h4>{userLogin}</h4>
          </div>
          <form>
            <input
            autoFocus
            value={message}
              type="text"
              placeholder={`What on your mind, ${userLogin} ?`}
              onChange={e => setMessage(e.target.value)}
            />
            <input
              type="text"
              value={image}
              placeholder="image URL (Optional)"
              onChange={e => setImage(e.target.value)}
            />
            <button
                onClick={handleModifyPost}
              type="submit"
              className={messageModify !== message && message !== '' ? '' : `button--disabled`}
                disabled={messageModify === message && message === ""}
            >
              SAVE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HidenForm;
