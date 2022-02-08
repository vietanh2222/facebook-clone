import React, { useState } from "react";
import './ModifyComment.css';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import db from './firebase';

function ModifyComment({title, id, closeModifyComment}) {

    const [commentTitle, setCommentTitle] = useState(title)

    const handleModifyComment = async (e) => {
        e.preventDefault();
        closeModifyComment();
        await updateDoc(doc(db, 'userComment', id), {
           title: commentTitle,
           timestamp: serverTimestamp() 
        })
    }

  return (
    <div className="modifyComment">
      <form>
        <input 
            autoFocus
            type="text" 
            placeholder="Modify comment"
            value={commentTitle}
            onChange={(e) => setCommentTitle(e.target.value)} 
        />
        <button 
            onClick={handleModifyComment}
            type="submit" 
            className="hiddenButton">
        </button>
      </form>
      {commentTitle !== title && commentTitle !== '' && <span onClick={handleModifyComment}>Modify</span>}    
      <span onClick={closeModifyComment}>Cancel</span>
    </div>
  );
}

export default ModifyComment;
