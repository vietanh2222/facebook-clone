import { Avatar } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import "./Post.css";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import NearMeIcon from '@mui/icons-material/NearMe';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { collection, doc, deleteDoc, updateDoc, serverTimestamp, addDoc } from "firebase/firestore";
import db from './firebase';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import Timestamp from 'react-timestamp';
import HidenForm from './HidenForm';
import CommentOptions from './CommentOptions';
import ModifyComment from './ModifyComment';
import { FacebookSelector } from '@charkour/react-reactions';
import PostReactionDisplay from './PostReactionDisplay';
import ReactionCounter from './ReactionCounter';
import CommentReaction from './CommentReaction';


function Post({ id, profilePic, image, username, email, 
                timestamp, message, reaction, userLogin, 
                userShares, userComment, userAvatar,  userReactionComment }) {
                    
    const [userReaction, setUserReaction] = useState('');
    const [isShare, setIsShare] = useState(false);
    const [comment, setComment] = useState("");
    const [isOpenComment, setIsOpenComment] = useState(false);
    const [isInteract, setIsInteract] = useState(false);
    const [isChangeOptionsOpen, setIsChangeOptionsOpen] = useState(false);
    const [isModifyFormOpen, setIsModifyFormOpen] = useState(false);
    const [isChangeCommentOpen, setIsChangeCommentOpen] = useState(0);               
    const [modifyCommentId, setModifyCommentId] = useState('');
    const [isEmojiBarOpen, setIsEmojiBarOpen] = useState(false);
    const reactionList = useRef([])
    const currentUserReaction = useRef({})
    const listUserReaction = useRef([])
    const isCurrenUserShare = useRef({})
    const listUserShare = useRef([])
    useEffect(() => {
        reactionList.current = ['haha', 'sad', 'angry', 'love', 'wow']  
    }, [])
    
    useEffect(() => {
   
        currentUserReaction.current = reaction.find((user) => user.user === userLogin) || {};
        setUserReaction(currentUserReaction.current.emoji)
        listUserReaction.current = reaction.filter((user) => user.emoji !== '')
    }, [reaction, userLogin])

    useEffect(() => {
        isCurrenUserShare.current = userShares.find((user) => user.user === userLogin)
        
        if(isCurrenUserShare.current === undefined){
            setIsShare(undefined)
        }else{
            setIsShare(isCurrenUserShare.current.isShare)
        }

        listUserShare.current = userShares.filter((user) => user.isShare === true)
    }, [userLogin, userShares])

    const handleRemove = async () => {
        if(email !== "nguyenvietanh2222@gmail.com"){
            alert(`You don't have permission to remove a post`);
        }else{
            await userComment.forEach(
                (commentUser) =>  handleRemoveComment(commentUser.id)
            )
            await deleteDoc(doc(db, "posts", id));
        }
    }
    
    const handleLike = async () => {
            if(userReaction === undefined){
                await addDoc(collection(db, 'userReaction'), {
                    postId:id,
                    user: userLogin,
                    emoji:'like'
                })
                handleCloseEmojiBar()
                return
            }
            if(userReaction !== 'like' && !reactionList.current.includes(userReaction)){
               await updateDoc(doc(db, 'userReaction', currentUserReaction.current.id), {
                    emoji:'like'
               })
            }else{
                await updateDoc(doc(db, 'userReaction', currentUserReaction.current.id), {
                    emoji:''
               })
            }  
            handleCloseEmojiBar() 
    }   

    const handleReaction =  async (emoji) => {
        
        if(emoji === userReaction){
            handleCloseEmojiBar();
            return
        }
        if(userReaction === undefined){
            await addDoc(collection(db, 'userReaction'), {
                postId:id,
                user: userLogin,
                emoji,
            })
            handleCloseEmojiBar();
            
        }
        else{
            handleCloseEmojiBar();
            await updateDoc(doc(db, 'userReaction', currentUserReaction.current.id), {
                emoji,
           })
        }
    }
    const handleCloseEmojiBar = () => {
        setIsEmojiBarOpen(false)
    }

    const handleShare = async () => {
            if(isShare === undefined){
                await addDoc(collection(db, "userShare"), {
                    postId: id,
                    user: userLogin,
                    isShare:true
                })
                return
            }
            if(isShare){
                await updateDoc(doc(db, 'userShare', isCurrenUserShare.current.id), {
                    isShare:false
                })
            } else {
                await updateDoc(doc(db, 'userShare', isCurrenUserShare.current.id), {
                    isShare:true
                })
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
        const reactionListOfComment = await userReactionComment.filter(
            (comment) => comment.commentId ===  commentId) || []
        await reactionListOfComment.forEach(
            (reaction) => deleteDoc(doc(db, 'userReactionComment', reaction.id))
        )
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
                listUserReaction.current.length > 0 
                || listUserShare.current.length > 0 || userComment.length > 0
                    ? "options__count" 
                    : "options__count--unDisplay"}>
                 <ReactionCounter 
                    reaction={reaction}
                    currentUserReaction={currentUserReaction.current}
                    isComment={false}
                />
                
                <div className="wrapOptions">
                    <div className="option__count comment__count" onClick={handleOpenComment}>
                        <p>{userComment.length} comments</p>
                    </div> 

                    <div className="option__count share__count">
                    {listUserShare.current.length > 1 
                        ? <p>{listUserShare.current.length} shares</p>
                        : <p>{listUserShare.current.length} share</p>
                    }
                        <div className='share__showUser'>
                            <h2>Share</h2>
                            {listUserShare.current.length === 0 && <p>No share yet !</p>}
                            {listUserShare.current.map((user,index) => {
                                if(index < 8){
                                return <p key={index}>{user.user}</p>
                                }else{
                                    if(index === 8){
                                        return <p key={index}>and {listUserShare.current.length - index} others...</p>
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
                    onMouseEnter={() => setIsEmojiBarOpen(true)}
                    onMouseLeave={() => setIsEmojiBarOpen(false)}
                    className={userReaction === 'like' ? 'option--active post__option' : 'post__option'}
                >
                    {isEmojiBarOpen && 
                    <div className='facebookSelector' onClick={(e) => {e.stopPropagation()}}>
                        <FacebookSelector 
                            onSelect={(emoji) => handleReaction(emoji)}
                        />
                    </div>
                    }
                    <PostReactionDisplay 
                        userReaction={userReaction}
                        reactionList={reactionList.current}

                    />
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
                            :   <div className='wrapComment'>
                                    <div className="comment__content" >
                                        <h2>{comment.user}</h2>
                                        <p>{comment.title}</p>
                                        
                                    </div>
                                    <div className='comment__reaction'>
                                            <CommentReaction 
                                                 userReactionComment={userReactionComment.filter((
                                                     (commentReaction) => commentReaction.commentId === comment.id
                                                 ))}
                                                 commentId={comment.id}
                                                 postId={id}
                                                 userLogin={userLogin}
                                            />
                                            <span>{comment.timestamp && <Timestamp relative date={comment.timestamp.seconds} autoUpdate />}</span>
                                    </div>
                                </div>
                            }
                            <div className='comment__reaction-counter'>
                                <ReactionCounter 
                                    reaction={userReactionComment.filter((
                                    (commentReaction) => commentReaction.commentId === comment.id
                                    ))} 
                                    currentUserReaction={userReactionComment.filter((
                                        (commentReaction) => commentReaction.commentId === comment.id && commentReaction.user === userLogin
                                    ))}
                                    isComment={true}
                                />
                            </div>
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
