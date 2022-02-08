import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import "./Post.css";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import NearMeIcon from '@mui/icons-material/NearMe';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { collection, doc, deleteDoc, updateDoc, arrayUnion, arrayRemove, serverTimestamp, addDoc } from "firebase/firestore";
import db from './firebase';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import Timestamp from 'react-timestamp';
import HidenForm from './HidenForm';
import CommentOptions from './CommentOptions';
import ModifyComment from './ModifyComment';

function Post({ id, profilePic, image, username, email, 
                timestamp, message, userLikes, userLogin, 
                userShares, userComment, userAvatar }) {
                    
    const [isLike, setIsLike] = useState(false);
    const [isShare, setIsShare] = useState(false);
    const [comment, setComment] = useState("");
    const [isOpenComment, setIsOpenComment] = useState(false);
    const [isInteract, setIsInteract] = useState(false);
    const [isChangeOptionsOpen, setIsChangeOptionsOpen] = useState(false);
    const [isModifyFormOpen, setIsModifyFormOpen] = useState(false);
    const [isChangeCommentOpen, setIsChangeCommentOpen] = useState(0);               
    const [modifyCommentId, setModifyCommentId] = useState('');               
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
        setComment('');
        await addDoc(collection(db, "userComment"), {
            postId: id,
            timestamp: serverTimestamp(),
            title: comment,
            user: userLogin,
            profilePic: userAvatar
        });
    }

    const handleRemoveComment = async (commentId) => {
        setIsChangeCommentOpen(-50);
        await deleteDoc(doc(db, "userComment", commentId))
    }

    const handleOpenModifyComment = (commentId) => {
        handleCloseChangeComment();
        setModifyCommentId(commentId)
    }

    const handleCloseModifyComment = () => {
        setModifyCommentId(-50)
    }

    const handleOpenComment = () => {
        setIsChangeCommentOpen(-50)
        setIsOpenComment(!isOpenComment)
    }
    
    const handleInteraction = () => {
        setIsInteract(!isInteract)
    }

    const handleToggleChangeOptions = () => {
        setIsChangeOptionsOpen(!isChangeOptionsOpen)
        if(isChangeOptionsOpen){
            document.addEventListener('click', handleCloseChangeOptions)
        }else{
            handleCloseChangeComment()
        }
    }
    
    const handleCloseChangeOptions = () => {
        setIsChangeOptionsOpen(false)
        if(!isChangeCommentOpen){
            document.removeEventListener('click', handleCloseChangeOptions)
        }
    }

    const handleOpenMofidyForm = () => {
        setIsModifyFormOpen(true)
        setIsChangeOptionsOpen(false)
    }

    const handleCloseModifyForm = () => {
        setIsModifyFormOpen(false)
    }

    const handleToggleChangeComment = (index) => {
        if(isChangeCommentOpen === index){
            setIsChangeCommentOpen(!index)
            document.removeEventListener('click', handleToggleChangeComment)
        }else{
            setIsChangeCommentOpen(index)
            handleCloseChangeOptions()
            document.addEventListener('click', handleToggleChangeComment)
        }   
    }

    const handleCloseChangeComment = () => {
        setIsChangeCommentOpen(-50)
        document.removeEventListener('click', handleToggleChangeComment)
    }

    return (
        <div className='post' >
            <div className='post__top'>
                <Avatar src={profilePic}
                    className='post__avatar' />
                <div className='post__topInfo'>
                    <h3>{username}</h3>
                    {timestamp !== null && 
                    <p>{timestamp === undefined ? "...Loading" : <Timestamp date={timestamp.seconds} />}</p>
                    }
                </div>
                <div className='post__change' onClick={(e) => {
                    e.stopPropagation();
                    document.querySelector('.searchBar').style.display ="none";
                }}>
                    <MoreHorizIcon onClick={handleToggleChangeOptions}/>
                    <div className='changeOptions'>
                        <p>Modify or Delete this post</p>
                    </div>
                    {isChangeOptionsOpen &&
                        <div className='change__options'>
                            <div 
                                onClick={handleRemove}
                                className='post__remove change__option' 
                            >
                                <DeleteIcon   className='post__close' />
                                <p>Delete post</p>
                            </div>
                            <div 
                                onClick={handleOpenMofidyForm}
                                className="post__modify change__option"
                            >
                                <BorderColorIcon />
                                <p>Modify Post</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
            {isModifyFormOpen && 
            <HidenForm 
                closeForm={handleCloseModifyForm}
                userAvatar={userAvatar}
                userLogin={userLogin}
                messageModify={message}
                imageModify={image}
                postId={id}
            />}
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
                    
                    {userComment.map((comment, index) =>
                        <div className="post__comment" key={comment.id}>
                            <Avatar src={comment.profilePic}/>
                            {modifyCommentId === comment.id
                            ? 
                                <ModifyComment 
                                   title={comment.title}
                                   id={comment.id}
                                   closeModifyComment={handleCloseModifyComment} 
                                />
                            :
                                <div className="comment__content" >
                                    <h2>{comment.user}</h2>
                                    <p>{comment.title}</p>
                                    <span>{comment.timestamp && <Timestamp relative date={comment.timestamp.seconds} autoUpdate />}</span>
                                </div>
                            }
                            <div className='comment__change' onClick={(e) => {
                                e.stopPropagation();
                                document.querySelector('.searchBar').style.display ="none";
                            }}>
                                <MoreHorizIcon onClick={() => handleToggleChangeComment(index)}/>
                                <div className='commentOptions'>
                                    <p>Modify or Delete this comment</p>
                                </div>
                                <CommentOptions 
                                    isOpen={index}
                                    indexToOpen={isChangeCommentOpen}
                                    handleRemoveComment={() => handleRemoveComment(comment.id)}
                                    commentId={comment.id}
                                    handleModifyComment={() => handleOpenModifyComment(comment.id)}
                                />
                            </div>
                        </div>
                    )}
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
                </div>
            }
        </div>
    )
}
                
export default Post
