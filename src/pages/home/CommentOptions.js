import React from "react";
import  DeleteIcon from '@mui/icons-material/Delete';
import  BorderColorIcon  from '@mui/icons-material/BorderColor';

function CommentOptions({isOpen, indexToOpen, handleRemoveComment, handleModifyComment}) {

  return (
    isOpen === indexToOpen ?
    <div className="comment__options">
      <div 
        onClick={handleRemoveComment}
        className="comment__remove change__option"
    >
        <DeleteIcon className="post__close" />
        <p>Delete comment</p>
      </div>
      <div
        onClick={handleModifyComment}
        className="comment__modify change__option"
      >
        <BorderColorIcon />
        <p>Modify comment</p>
      </div>
    </div>
    : <></>
  );
}

export default CommentOptions;
