import { Avatar } from '@mui/material';
import React from 'react';
import "./Post.css";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import NearMeIcon from '@mui/icons-material/NearMe';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import { doc, deleteDoc } from "firebase/firestore";
import db from './firebase';


function Post({ id, profilePic, image, username, email, timestamp, message }) {
  
    if( timestamp !== undefined && timestamp !== null ) {
        var dateInMillis  = timestamp.seconds * 1000
    }
    const date = new Date(dateInMillis).toDateString() + ' at ' + new Date(dateInMillis).toLocaleTimeString('en-US');
    const handleRemove = () => {
        if(email !== "nguyenvietanh2222@gmail.com"){
            alert(`You don't have permission to remove a post`);
        }else{
            deleteDoc(doc(db, "posts", id));
        }
    }

    return (
        <div className='post' >
            <div className='post__top'>
                <Avatar src={profilePic}
                    className='post__avatar' />
                <div className='post__topInfo'>
                    <h3>{username}</h3>
                    <p>{timestamp === undefined ? "...Loading" : date}</p>
                </div>
                <CloseIcon  onClick={handleRemove} className='post__close' />
            </div>

            <div className='post__bottom'>
                <p>{message}</p>
            </div>

            <div className='post__image'>
                <img src={image} alt='' />
            </div>

            <div className='post__options'>
                <div className='post__option'>
                    <ThumbUpIcon />
                    <p>Like</p>
                </div>
                <div className='post__option'>
                    <ChatBubbleOutlineIcon />
                    <p>Comment</p>
                </div>
                <div className='post__option'>
                    <NearMeIcon />
                    <p>Share</p>
                </div>
                <div className='post__option'>
                    <AccountCircleIcon />
                    <ExpandMoreIcon />
                </div>
            </div>
        </div>
    )
}

export default Post
