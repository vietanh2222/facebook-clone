import { Avatar } from "@mui/material";
import React, { useState } from "react";
import "./MessageSender.css";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { useStateValue } from "../../store/StateProvider";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import db, { auth } from "./firebase";
import CloseIcon from "@mui/icons-material/Close";
import ImageUpload from "./ImageUpload";
import { deleteObject } from "firebase/storage";
import { SlackSelector } from "@charkour/react-reactions";
import RefreshIcon from "@mui/icons-material/Refresh";
import DoneIcon from "@mui/icons-material/Done";

function MessageSender() {
  const [{ user }] = useStateValue();
  const [input, setInput] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [imageUpLoadUrl, setImageUpLoadUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [imageRef, setImageRef] = useState();
  const [imageName, setImageName] = useState("");
  const [showSlackBar, setShowSlackBar] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert(`Sorry you can't add a new post because you sign in Anomyous`);
      setInput("");
      return;
    }
    addDoc(collection(db, "posts"), {
      profilePic: user.photoURL,
      username: user.displayName,
      timestamp: serverTimestamp(),
      message: input,
      image: imageUpLoadUrl,
      imageName: imageName,
    });

    setInput("");
    setImageUpLoadUrl("");
    setImagePreviewUrl("");
    setShowForm(false);
  };
  const removeUploadImage = async () => {
    setImagePreviewUrl("");
    setImageUpLoadUrl("");
    setProgress(0);
    await deleteObject(imageRef);
  };
  const showHidenForm = (e) => {
    e.preventDefault();
    setShowForm(true);
    if (showForm) {
      document.querySelector(".messageSender__hidenForm").style.display =
        "flex";
      document.querySelector(".hidenForm__bottom > form > input").focus();
    }
  };
  const closeHidenForm = () => {
    document.querySelector(".messageSender__hidenForm").style.display = "none";
  };

  const stopCloseHidenForm = (e) => {
    e.stopPropagation();
  };

  const handleToggleShowSlackBar = () => {
    if (showSlackBar) {
      setShowSlackBar(false);
      document
        .querySelector(".messageSender__hidenForm > .hidenForm__wrapper")
        .removeEventListener("click", handeCloseShowSlackBar);
    } else {
      setShowSlackBar(true);
      document
        .querySelector(".messageSender__hidenForm > .hidenForm__wrapper")
        .addEventListener("click", handeCloseShowSlackBar);
    }
  };

  const handeCloseShowSlackBar = () => {
    setShowSlackBar(false);
  };

  return (
    <div className="messageSender">
      <div className="messageSender__top">
        <Avatar src={user.photoURL} />
        <form>
          <button
            type="submit"
            onClick={showHidenForm}
            className="messageSender__button"
          >
            {`What's on your mind, ${user.displayName} ?`}
          </button>
        </form>
        {showForm && (
          <div className="messageSender__hidenForm" onClick={closeHidenForm}>
            <div className="hidenForm__wrapper" onClick={stopCloseHidenForm}>
              <div className="hidenForm__top">
                <h1> New post</h1>
                <CloseIcon onClick={closeHidenForm}></CloseIcon>
              </div>
              <div className="hidenForm__bottom">
                <div className="hidenForm__userInfo">
                  <Avatar src={user.photoURL} />
                  <h3>{user.displayName}</h3>
                </div>
                <form>
                  <input
                    type="text"
                    autoFocus
                    value={input}
                    placeholder={`What's on your mind, ${user.displayName} ?`}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  {imagePreviewUrl && (
                    <div className="hidenForm__imagePreview">
                      <div className="imagePreview__progress">
                        {![0, 100].includes(progress) && (
                          <progress value={progress} max="100" />
                        )}

                        <img src={imagePreviewUrl} alt="" />
                        {imageUpLoadUrl !== "" ? (
                          <div className="imagePreview__done">
                            <DoneIcon />
                          </div>
                        ) : (
                          <div className="imagePreview__uploading">
                            <RefreshIcon />
                          </div>
                        )}
                      </div>
                      <div className="imagePreview__remove">
                        <CloseIcon onClick={removeUploadImage}></CloseIcon>
                      </div>
                    </div>
                  )}
                  <div className="hidenForm__add">
                    <h3>Add to your post</h3>

                    <div className="add__options">
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
                                setInput(`${input}${e}`);
                                handeCloseShowSlackBar();
                                document
                                  .querySelector(
                                    ".hidenForm__bottom > form > input"
                                  )
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
                          id={"messageSender"}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className={
                      (input !== "" &&
                        imageUpLoadUrl === "" &&
                        imagePreviewUrl === "") ||
                      imageUpLoadUrl !== ""
                        ? ""
                        : `button--disabled`
                    }
                    disabled={
                      (input !== "" &&
                        imageUpLoadUrl === "" &&
                        imagePreviewUrl === "") ||
                      imageUpLoadUrl !== ""
                        ? false
                        : true
                    }
                  >
                    POST
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="messageSender__bottom">
        <div className="messageSender__option" onClick={showHidenForm}>
          <VideoCameraFrontIcon
            style={{
              color: "red",
            }}
          />
          <h3>Live Video</h3>
        </div>
        <div className="messageSender__option" onClick={showHidenForm}>
          <PhotoLibraryIcon
            style={{
              color: "green",
            }}
          />
          <h3>Photo</h3>
        </div>
        <div className="messageSender__option" onClick={showHidenForm}>
          <InsertEmoticonIcon
            style={{
              color: "orange",
            }}
          />
          <h3>Feeling</h3>
        </div>
      </div>
    </div>
  );
}

export default MessageSender;
