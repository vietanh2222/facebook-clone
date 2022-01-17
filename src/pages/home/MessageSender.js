import { Avatar } from '@mui/material';
import React, { useState } from 'react';
import "./MessageSender.css";
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { useStateValue } from '../../store/StateProvider';
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import db from './firebase';
import CloseIcon from '@mui/icons-material/Close';
import { useRef } from 'react';

function MessageSender() {

    const [{user}] = useStateValue();
    
    const [input, setInput] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        
        addDoc(collection(db, "posts"), {
            profilePic: user.photoURL,
            image: imageUrl,
            username: user.displayName,
            timestamp: serverTimestamp(),
            message: input
          });

        setInput("");
        setImageUrl("");
        closeHidenForm();
    };

    const hidenForm = useRef();
    const inputFocus = useRef();
    const showHidenForm = (e) => {
        e.preventDefault();
        hidenForm.current.style.display = "flex";
        inputFocus.current.focus();
    }
    const closeHidenForm = () => {
        hidenForm.current.style.display = "none";
    }

    const stopCloseHidenForm = (e) => {
        e.stopPropagation();
    }
    return (
        <div className='messageSender'>
            <div className='messageSender__top'>
                <Avatar src={user.photoURL} />
                <form>
                    <button type="submit" onClick={showHidenForm} className='messageSender__button'>
                        {`What's on your mind, ${user.displayName} ?`}
                    </button>
                </form>
                <div className="messageSender__hidenForm" ref={hidenForm} onClick={closeHidenForm}>
                    <div className="hidenForm__wrapper" onClick={stopCloseHidenForm} >
                        <div className="hidenForm__top">
                            <h2> New post</h2>
                            <CloseIcon onClick={closeHidenForm} ></CloseIcon>
                        </div>
                        <div className="hidenForm__bottom">
                            <div className="hidenForm__userInfo">
                                <Avatar src={user.photoURL}/>
                                <h4>{user.displayName}</h4>
                            </div>
                            <form>
                                <input
                                    type="text"
                                    ref={inputFocus}
                                    value={input}
                                    placeholder={`What's on your mind, ${user.displayName} ?`}
                                    onChange={e => setInput(e.target.value)}
                                />
                                <input
                                    value={imageUrl}
                                    onChange={e => setImageUrl(e.target.value)}
                                    placeholder="image URL (Optional)"
                                />

                                <button 
                                    onClick={handleSubmit} 
                                    type="submit"
                                    className={input === ""?`button--disabled`:""}
                                    disabled={input === ""}
                                >
                                    POST
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className='messageSender__bottom'>
                <div className='messageSender__option'>
                    <VideoCameraFrontIcon style={{
                        color: "red"
                    }} />
                    <h3>Live Video</h3>
                </div>
                <div className='messageSender__option'>
                    <PhotoLibraryIcon style={{
                        color: "green"
                    }} />
                    <h3>Photo/Video</h3>
                </div>
                <div className='messageSender__option'>
                    <InsertEmoticonIcon style={{
                        color: "orange"
                    }} />
                    <h3>Feeling/Activity</h3>
                </div>
            </div>
        </div>
    )
}

export default MessageSender
