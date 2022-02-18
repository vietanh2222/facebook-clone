import { Avatar, IconButton } from "@mui/material";
import React, { useState } from "react";
import "./Profile.css";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import WorkIcon from "@mui/icons-material/Work";
import FilterListIcon from "@mui/icons-material/FilterList";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useLocation } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";

function Profile() {
  let { state, pathname } = useLocation();
  if (state === null) {
    state = {};
  }
  const isUserPage = pathname.substring(9) === "me";
  const width = 1250 + Math.floor(Math.random() * 40);

  const [isFriend, setIsFriend] = useState(state.isFriend === "yes");
  return (
    <div className="profile">
      <div className="profile__header">
        <div className="profile__banner">
          <img src={`https://picsum.photos/${width}/720`} alt="" />
        </div>
        <div className="profile__container">
          <div className="profile__info">
            <div className="profile__avatar">
              <Avatar src={state.avatar} />
            </div>
            <div className="profile__name">
              <h1>{state.name}</h1>
              {isUserPage ? (
                <p>{`${Math.floor(Math.random() * 1000)} friends`}</p>
              ) : (
                <p>{`${Math.floor(Math.random() * 50)} friends together`}</p>
              )}
            </div>
            {isUserPage ? (
              <div className="profile__options">
                <IconButton>
                  <AddCircleOutlineIcon />
                  <p>Add more information</p>
                </IconButton>
                <IconButton>
                  <EditIcon />
                  <p>Modify personal page</p>
                </IconButton>
              </div>
            ) : (
              <div className="profile__options">
                <IconButton onClick={() => setIsFriend(!isFriend)}>
                  {state !== null && isFriend ? (
                    <>
                      <CheckIcon />
                      <p>Friend</p>
                    </>
                  ) : (
                    <>
                      <PersonAddIcon />
                      <p>Add Friend</p>
                    </>
                  )}
                </IconButton>
                <IconButton>
                  <ChatBubbleOutlineIcon />
                  <p>Chat</p>
                </IconButton>
              </div>
            )}
          </div>
          <div className="profile__navlink">
            <ul>
              <li>
                <p>Posts</p>
              </li>
              <li>
                <p>Introduce</p>
              </li>
              <li>
                <p>Friends</p>
              </li>
              <li>
                <p>Images</p>
              </li>
              <li>
                <p>Check in</p>
              </li>
              <li>
                <p>Sport</p>
              </li>
              <li>
                <p>More</p>
                <ArrowDropDownIcon />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="profile__container">
        <div className="profile__body">
          <div className="profile__sidebar">
            <div className="profile__introduce profile__box">
              <h3>Introduce</h3>
              <div className="introduce__info">
                <WorkIcon />
                <p>Work from home</p>
              </div>
              {isUserPage && (
                <>
                  <div className="introduce__option">
                    <h2>Add more profile</h2>
                  </div>
                  <div className="introduce__option">
                    <h2>Modify detail</h2>
                  </div>
                  <div className="introduce__option">
                    <h2>Add hobby</h2>
                  </div>
                  <div className="introduce__option">
                    <h2>Add noticeable content</h2>
                  </div>
                </>
              )}
            </div>
            <div className="profile__image profile__box">
                <h3>Images</h3>
                <IconButton >
                    <p>View all images</p>
                </IconButton>
            </div>
            <div className="profile__image profile__box">
                <h3>Friends</h3>
                <IconButton >
                    <p>View all friends</p>
                </IconButton>
            </div>
          </div>
          <div className="profile__post">
          <div className="profile__filter profile__box">
              <h3>Post</h3>
              <IconButton>
                <FilterListIcon />
                <p>Filter</p>
              </IconButton>
            </div>
            {isUserPage && (
              <div className="messageSender">
                <div className="messageSender__top">
                  <Avatar src={state.avatar} />
                  <form>
                    <button
                      className="messageSender__button"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      {`What's on your mind, ${state.name} ?`}
                    </button>
                  </form>
                </div>

                <div className="messageSender__bottom">
                  <div className="messageSender__option">
                    <VideoCameraFrontIcon
                      style={{
                        color: "red",
                      }}
                    />
                    <h3>Live Video</h3>
                  </div>
                  <div className="messageSender__option">
                    <PhotoLibraryIcon
                      style={{
                        color: "green",
                      }}
                    />
                    <h3>Photo</h3>
                  </div>
                  <div className="messageSender__option">
                    <InsertEmoticonIcon
                      style={{
                        color: "orange",
                      }}
                    />
                    <h3>Feeling</h3>
                  </div>
                </div>
              </div>
            )}
            <div className='postProfile profile__box'>
                <div className="postProfile__top">
                <Avatar src={state.avatar} />
                <h2>{state.name}</h2>
                </div>
                <div className="postProfile__bottom">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                    <img src="https://picsum.photos/800/800" alt=""/>
                </div>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
