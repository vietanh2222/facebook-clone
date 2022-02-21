import React, { useState } from "react";
import "./HidenForm.css";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar } from "@mui/material";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import db from "./firebase";
import { deleteObject } from "firebase/storage";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { SlackSelector } from "@charkour/react-reactions";
import ImageUpload from "./ImageUpload";
import RefreshIcon from "@mui/icons-material/Refresh";
import DoneIcon from "@mui/icons-material/Done";

function HidenForm({
  closeForm,
  userAvatar,
  userLogin,
  messageModify,
  imageModify,
  postId,
  imageNameDelete,
}) {
  const [message, setMessage] = useState(messageModify);
  const [showSlackBar, setShowSlackBar] = useState(false);

  const [imageUpLoadUrl, setImageUpLoadUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(imageModify);
  const [imageRef, setImageRef] = useState();
  const [imageName, setImageName] = useState(imageNameDelete);
  const [isHaveImage, setIsHaveImage] = useState(imageModify !== "");

  const handleModifyPost = async (e) => {
    e.preventDefault();
    closeForm();
    await updateDoc(doc(db, "posts", postId), {
      timesupdate: serverTimestamp(),
      image: imageUpLoadUrl,
      message,
      imageName,
    });
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
    setIsHaveImage(false);
    setImageUpLoadUrl("");
    setProgress(0);
    if (imageUpLoadUrl !== "") {
      setImagePreviewUrl("");
      await deleteObject(imageRef);
    }
  };

  return (
    <div className="hidenForm" onClick={closeForm}>
      <div
        className="hidenForm__wrapper"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="hidenForm__top">
          <h2> Modify Post</h2>
          <CloseIcon onClick={closeForm}></CloseIcon>
        </div>
        <div className="hidenForm__bottom">
          <div className="hidenForm__userInfo">
            <Avatar src={userAvatar} />
            <h4>{userLogin}</h4>
          </div>
          <form>
            <div className="input-icons">
              <input
                autoFocus
                value={message}
                type="text"
                placeholder={`What on your mind, ${userLogin} ?`}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="input-icons__icon">
                <div
                  className="input-icon"
                  onClick={(e) => e.stopPropagation()}
                >
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
                          setMessage(`${message}${e}`);
                          handeCloseShowSlackBar();
                          document
                            .querySelector(".input-icons > input")
                            .focus();
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="input-icon">
                  <ImageUpload
                    getUrlUpLoad={setImageUpLoadUrl}
                    getProgress={setProgress}
                    getUrlPreview={setImagePreviewUrl}
                    getRef={setImageRef}
                    getName={setImageName}
                    id={postId}
                  />
                </div>
              </div>
              {!["", undefined].includes(imagePreviewUrl) && (
                <div className="hidenForm__imagePreview">
                  <div className="imagePreview__progress">
                    {![0, 100].includes(progress) && (
                      <progress value={progress} max="100" />
                    )}

                    <img src={imagePreviewUrl} alt="" />
                    {!isHaveImage && (
                      <>
                        {imageUpLoadUrl !== "" ? (
                          <div className="imagePreview__done">
                            <DoneIcon />
                          </div>
                        ) : (
                          <div className="imagePreview__uploading">
                            <RefreshIcon />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <div className="imagePreview__remove">
                    <CloseIcon onClick={removeUploadImage}></CloseIcon>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={handleModifyPost}
              type="submit"
              className={
                (messageModify !== message && message !== "") ||
                (isHaveImage && imagePreviewUrl !== imageModify) ||
                (!isHaveImage &&
                  imagePreviewUrl !== imageModify &&
                  imageUpLoadUrl !== "")
                  ? ""
                  : `button--disabled`
              }
              disabled={
                (messageModify !== message && message !== "") ||
                (isHaveImage && imagePreviewUrl !== imageModify) ||
                (!isHaveImage &&
                  imagePreviewUrl !== imageModify &&
                  imageUpLoadUrl !== "")
                  ? false
                  : true
              }
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
