import React, { useState } from "react";
import "./ModifyComment.css";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import CloseIcon from "@mui/icons-material/Close";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import db, { storage } from "./firebase";
import { SlackSelector } from "@charkour/react-reactions";
import ImageUpload from "./ImageUpload";
import { deleteObject, ref } from "firebase/storage";

function ModifyComment({
  title,
  id,
  closeModifyComment,
  imageModify,
  imageModifyName,
}) {
  const [commentTitle, setCommentTitle] = useState(title);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(imageModify);
  const [progress, setProgress] = useState(0);
  const [showSlackBar, setShowSlackBar] = useState(false);
  const [imageUploadUrl, setImageUpLoadUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [imageRef, setImageRef] = useState("");

  const handleModifyComment = async (e) => {
    e.preventDefault();
    closeModifyComment();
    if(imageUploadUrl !== ''){
      await updateDoc(doc(db, "userComment", id), {
        title: commentTitle,
        timesupdate: serverTimestamp(),
        imageName: imageName,
        image: imageUploadUrl,
      });
    }else{
      await deleteObject(ref(storage, `images/${imageModifyName}`));
      await updateDoc(doc(db, "userComment", id), {
        title: commentTitle,
        timesupdate: serverTimestamp(),
        imageName: '',
        image: '',
      });
    }
 
  };
  
  const handleToggleShowSlackBar = () => {
    if (showSlackBar) {
      setShowSlackBar(false);
      window.removeEventListener("click", handeCloseShowSlackBar);
    } else {
      setShowSlackBar(true);
      window.addEventListener("click", handeCloseShowSlackBar);
    }
  };

  const handeCloseShowSlackBar = () => {
    setShowSlackBar(false);
  };

  const removeUploadImage = async () => {
    setImagePreviewUrl("");
    setProgress(0);
    if (!["", undefined].includes(imageModifyName)) {
      // await deleteObject(ref(storage, `images/${imageModifyName}`));
      // // await updateDoc(doc(db, "userComment", id), {
      // //   image: "",
      // //   imageName: "",
      // // });
      return
    } else {
      await deleteObject(imageRef);
    }
  };

  return (
    <div className="modifyComment">
      <form>
        <div className="input-icons">
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
            className="hiddenButton"
          ></button>
          <div className="input-icons__icon">
            <div className="input-icon" onClick={(e) => e.stopPropagation()}>
              <InsertEmoticonIcon
                style={{
                  color: "rgb(247, 177, 37)",
                }}
                onClick={handleToggleShowSlackBar}
              />
              {showSlackBar && (
                <div className="slack">
                  <SlackSelector
                    onSelect={(e) => {
                      setCommentTitle(`${commentTitle}${e}`);
                      handeCloseShowSlackBar();
                      document.querySelector(".input-icons > input").focus();
                    }}
                  />
                </div>
              )}
            </div>
            <div className="input-icon">
              {!imagePreviewUrl && (
                <ImageUpload
                  getProgress={setProgress}
                  getUrlPreview={setImagePreviewUrl}
                  getName={setImageName}
                  getUrlUpLoad={setImageUpLoadUrl}
                  getRef={setImageRef}
                />
              )}
            </div>
          </div>
          {imagePreviewUrl && (
            <div className="hidenForm__imagePreview">
              <div className="imagePreview__progress">
                {![0, 100].includes(progress) && (
                  <progress value={progress} max="100" />
                )}

                <img src={imagePreviewUrl} alt="" />
              </div>
              <div className="imagePreview__remove">
                <CloseIcon onClick={removeUploadImage}></CloseIcon>
              </div>
            </div>
          )}
        </div>
      </form>

      {((commentTitle !== title && commentTitle !== "") ||
        (imagePreviewUrl !== '' && progress === 100 && imageUploadUrl !== "") 
        || (imagePreviewUrl === '' && imagePreviewUrl !== imageModify) ) && (
        <span onClick={handleModifyComment}>Modify</span>
      )}
      <span
        onClick={async () => {
          if(imagePreviewUrl !== ''){
            await deleteObject(imageRef);
          }
          closeModifyComment();
        }}
      >
        Cancel
      </span>
    </div>
  );
}

export default ModifyComment;
