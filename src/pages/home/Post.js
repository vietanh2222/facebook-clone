import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import "./Post.css";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import NearMeIcon from '@mui/icons-material/NearMe';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import { doc, deleteDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import db from './firebase';


function Post({ id, profilePic, image, username, email, timestamp, message, userLikes, userLogin, userShares }) {
  
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

    const [isLike, setIsLike] = useState(false);
    const [isShare, setIsShare] = useState(false);
    useEffect(() => {
        const isCurrentUserLike = userLikes.some((user) => user === userLogin)
        setIsLike(isCurrentUserLike)

        const isCurrenUserShare = userShares.some((user) => user === userLogin)
        setIsShare(isCurrenUserShare)
    }, [userLikes, userLogin, userShares])
    console.log(userShares);
    if(userShares === undefined) {
        userShares = []
    }
    const handleLike = async () => {
        setIsLike(!isLike);
            if(!isLike){
                await updateDoc(doc(db, "posts", id), {
                    userLikes: arrayUnion(userLogin)
                });
            }else{
                await updateDoc(doc(db, "posts", id), {
                    userLikes: arrayRemove(userLogin)
                });
            } 
    }   

    const handleShare = async () => {
        setIsShare(!isShare);
            if(!isShare){
                await updateDoc(doc(db, "posts", id), {
                    userShares: arrayUnion(userLogin)
                });
            }else{
                await updateDoc(doc(db, "posts", id), {
                    userShares: arrayRemove(userLogin)
                });
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
            <div className={
                userLikes.length > 0 
                || userShares.length > 0 
                    ? "options__count" 
                    : "options__count--unDisplay"}>
                <div className="option__count like__count">
                    <ThumbUpIcon />
                    {userLikes.length === 1 && isLike 
                        ? <p>You</p>
                        : 
                            <>
                            {userLikes.length > 1 && isLike
                                ? <p>You and {userLikes.length - 1 } others</p>
                                : <p>{userLikes.length}</p>
                            }
                            </>
                    }
                    
                </div>
                <div className="option__count share__count">
                   {userShares.length > 1 
                    ? <p>{userShares.length} shares</p>
                    : <p>{userShares.length} share</p>
                   }
                </div>
            </div>
            <div className='post__options'>
               
                <div 
                    onClick={handleLike}
                    className={isLike ? 'option--active post__option' : 'post__option'}
                >
                    <ThumbUpIcon />
                    <p>Like</p>
                </div>
                <div className='post__option'>
                    <ChatBubbleOutlineIcon />
                    <p>Comment</p>
                </div>
                <div  onClick={handleShare}
                    className={isShare ? 'option--active post__option' : 'post__option'}
                >
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
