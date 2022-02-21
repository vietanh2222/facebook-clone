import React, { useState } from "react";
import "./CommentOptions.css";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteConfirm from "./DeleteConfirm";

function CommentOptions({
  isOpen,
  indexToOpen,
  handleRemoveComment,
  handleModifyComment,
  handleCloseChangeComment,
}) {
  const [showDeleteConfirmComment, setShowDeleteConFirmComment] =
    useState(false);

  const handleShowDeleteConfirmComment = () => {
    setShowDeleteConFirmComment(true);
  };

  const handleCloseDeleteConfirmComment = () => {
    setShowDeleteConFirmComment(false);
    handleCloseChangeComment();
  };

  return isOpen === indexToOpen ? (
    <div
      className={
        !showDeleteConfirmComment
          ? "comment__options"
          : "comment__deleteConfirm"
      }
    >
      {!showDeleteConfirmComment && (
        <>
          <div
            onClick={handleShowDeleteConfirmComment}
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
        </>
      )}
      {showDeleteConfirmComment && (
        <DeleteConfirm
          isPost={false}
          handleRemoveComment={handleRemoveComment}
          handleCloseDeleteConfirmComment={handleCloseDeleteConfirmComment}
        />
      )}
    </div>
  ) : (
    <></>
  );
}

export default CommentOptions;
