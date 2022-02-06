import { Avatar } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import "./Post.css";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import NearMeIcon from '@mui/icons-material/NearMe';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import { collection, doc, deleteDoc, updateDoc, arrayUnion, arrayRemove, serverTimestamp, addDoc } from "firebase/firestore";
import db from './firebase';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import Timestamp from 'react-timestamp';

function Post({ id, profilePic, image, username, email, 
                timestamp, message, userLikes, userLogin, 
                userShares, userComment, userAvatar }) {
                    
    const [isLike, setIsLike] = useState(false);
    const [isShare, setIsShare] = useState(false);
    const [comment, setComment] = useState("");
    const [isOpenComment, setIsOpenComment] = useState(false);
    const [isInteract, setIsInteract] = useState(false);
    const [isChangeOptionsOpen, setIsChangeOptionsOpen] = useState(false);
    useEffect(() => {
        const isCurrentUserLike = userLikes.some((user) => user === userLogin)
        setIsLike(isCurrentUserLike)

        const isCurrenUserShare = userShares.some((user) => user === userLogin)
        setIsShare(isCurrenUserShare)
    }, [userLikes, userLogin, userShares])

    const handleRemove = () => {
        if(email !== "nguyenvietanh2222@gmail.com"){
            alert(`You don't have permission to remove a post`);
        }else{
            deleteDoc(doc(db, "posts", id));
        }
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
    
    const handleComment = async (e) => {
        e.preventDefault();
        
        await addDoc(collection(db, "userComment"), {
            postId: id,
            timestamp: serverTimestamp(),
            title: comment,
            user: userLogin,
            profilePic: userAvatar
        });
        setComment('');
        
    }

    const handleRemoveComment = async (commentId) => {
        await deleteDoc(doc(db, "userComment", commentId))
    }

    const handleOpenComment = () => {
        setIsOpenComment(!isOpenComment)
    }
    
    const handleInteraction = () => {
        setIsInteract(!isInteract)
    }

    const handleToggleChangeOptions = () => {
        setIsChangeOptionsOpen(!isChangeOptionsOpen)
    }
    
    const handleCloseChangeOptions = useCallback(() => {
        setIsChangeOptionsOpen(false)
    }, [])
        
    useEffect(() =>
    {
        document.addEventListener('click', handleCloseChangeOptions)
        return () => {
            document.removeEventListener('click', handleCloseChangeOptions)
        }
    }, [handleCloseChangeOptions])

    return (
        <div className='post' >
            <div className='post__top'>
                <Avatar src={profilePic}
                    className='post__avatar' />
                <div className='post__topInfo'>
                    <h3>{username}</h3>
                    <p>{timestamp === undefined ? "...Loading" : <Timestamp date={timestamp.seconds} />}</p>
                </div>
                <div className='post__change' onClick={(e) => {
                    e.stopPropagation();
                    document.querySelector('.searchBar').style.display ="none";
                }}>
                    <MoreHorizIcon onClick={handleToggleChangeOptions}/>
                    {isChangeOptionsOpen &&
                        <div className='change__options'>
                            <div 
                                onClick={handleRemove}
                                className='post__remove change__option' 
                            >
                                <DeleteIcon   className='post__close' />
                                <p>Delete post</p>
                            </div>
                            <div className="post__modify change__option">
                                <BorderColorIcon />
                                <p>Modify Post</p>
                            </div>
                        </div>
                    }
                </div>
               
                
            </div>

            <div className='post__bottom'>
                <p>{message}</p>
            </div>

            <div className='post__image'>
                <img src={image} alt='' />
            </div>
           
            <div className={
                userLikes.length > 0 
                || userShares.length > 0 || userComment.length > 0
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
                    <div className='like__showUser'>
                        <h2>Like</h2>
                        {userLikes.length === 0 && <p>No like yet !</p>}
                        {userLikes.map((user,index) => {
                            
                            if(index < 8){
                               return <p key={index}>{user}</p>
                            }else{
                                if(index === 8){
                                    return <p key={index}>and {userLikes.length - index} others...</p>
                                }else{
                                    return <></>
                                }
                            }
                        } 
                        )}
                    </div>
                </div>
                <div className="wrapOptions">
                    <div className="option__count comment__count" onClick={handleOpenComment}>
                        <p>{userComment.length} comments</p>
                    </div> 

                    <div className="option__count share__count">
                    {userShares.length > 1 
                        ? <p>{userShares.length} shares</p>
                        : <p>{userShares.length} share</p>
                    }
                        <div className='share__showUser'>
                            <h2>Share</h2>
                            {userShares.length === 0 && <p>No share yet !</p>}
                            {userShares.map((user,index) => {
                                if(index < 8){
                                return <p key={index}>{user}</p>
                                }else{
                                    if(index === 8){
                                        return <p key={index}>and {userShares.length - index} others...</p>
                                    }else{
                                        return <></>
                                    }
                                }
                            } 
                            )}
                        </div>
                    </div>
                    {isInteract && 
                    <div className='option__count'>
                        <AccountCircleIcon />
                        <ExpandMoreIcon />
                    </div>}
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
                <div 
                    className={isOpenComment ? 'option--active post__option' : 'post__option'}
                    onClick={handleOpenComment}
                >
                    <ChatBubbleOutlineIcon />
                    <p>Comment</p>
                </div>
                <div  onClick={handleShare}
                    className={isShare ? 'option--active post__option' : 'post__option'}
                >
                    <NearMeIcon />
                    <p>Share</p>
                </div>
                <div 
                    onClick={handleInteraction}
                    className={isInteract ? 'option--active post__option' : 'post__option'}
                >
                    <AccountCircleIcon />
                    <ExpandMoreIcon />
                </div>
            </div>
            {isOpenComment && 
                <div className="post__comments">
                    <form>
                        <Avatar src={userAvatar}/>
                        <input
                            autoFocus 
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            type="text" 
                            placeholder='Write a comment...' 
                        />
                        <button type="submit" onClick={handleComment} >Hiden Button</button>
                    </form>
                    {userComment.map((comment) =>
                        <div className="post__comment" key={comment.id}>
                            <Avatar src={comment.profilePic}/>
                            <div className="comment__content" >
                                <h2>{comment.user}</h2>
                                <p>{comment.title}</p>
                                <span>{comment.timestamp && <Timestamp relative date={comment.timestamp.seconds} autoUpdate />}</span>
                            </div>
                            <div className="comment__remove">
                                <CloseIcon onClick={() => {
                                    handleRemoveComment(comment.id)
                                }}/>
                            </div>
                        </div>
                    )}
                </div>
            }
        </div>
    )
}

export default Post
