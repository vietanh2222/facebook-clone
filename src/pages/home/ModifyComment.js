import React, { useState } from "react";
import "./ModifyComment.css";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import CloseIcon from "@mui/icons-material/Close";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import db, { storage } from "./firebase";
import { SlackSelector } from "@charkour/react-reactions";
import ImageUpload from "./ImageUpload";
import { deleteObject, ref } from "firebase/storage";
import RefreshIcon from '@mui/icons-material/Refresh';
import DoneIcon from '@mui/icons-material/Done';

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
  const [isHaveImage, setIsHaveImage] = useState(imageModify !== '')

  const handleModifyComment = async (e) => {
    e.preventDefault();
    closeModifyComment();
    if(imageUploadUrl !== ''){
      if(imageModify !== ""){
        setIsHaveImage(false);
        await deleteObject(ref(storage, `images/${imageModifyName}`));
      }
      await updateDoc(doc(db, "userComment", id), {
        title: commentTitle,
        timesupdate: serverTimestamp(),
        imageName: imageName,
        image: imageUploadUrl,
      });
      
    }else{
      if(imagePreviewUrl === ''){
        await deleteObject(ref(storage, `images/${imageModifyName}`));
        setIsHaveImage(false);
      }
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
    setIsHaveImage(false);
    if(imageUploadUrl !== ""){
      setImagePreviewUrl('');
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
                {!isHaveImage && 
                  <>
                    {imageUploadUrl !== "" ? (
                      <div className="imagePreview__done">
                        <DoneIcon />
                      </div>
                    ) : (
                      <div className="imagePreview__uploading">
                        <RefreshIcon />
                      </div>
                    )}
                  </>
                }
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
          if(imageUploadUrl !== ''){
            await deleteObject(imageRef);
          }
          closeModifyComment();
          setIsHaveImage(imageModify !== '');
        }}
      >
        Cancel
      </span>
    </div>
  );
}

export default ModifyComment;
