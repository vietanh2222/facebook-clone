import { Avatar } from '@mui/material';
import React, { useState } from 'react';
import "./MessageSender.css";
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { useStateValue } from '../../store/StateProvider';
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import db, { auth } from './firebase';
import CloseIcon from '@mui/icons-material/Close';
import ImageUpload from './ImageUpload';
import { deleteObject } from 'firebase/storage';


function MessageSender() {

    const [{user}] = useStateValue();
    const [input, setInput] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [imageUpLoadUrl, setImageUpLoadUrl] = useState('');
    const [progress, setProgress] = useState(0);
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [imageRef, setImageRef] = useState();
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!auth.currentUser){
            alert(`Sorry you can't add a new post because you sign in Anomyous`);
            setInput("");
            return;
        }
        addDoc(collection(db, "posts"), {
            profilePic: user.photoURL,
            username: user.displayName,
            timestamp: serverTimestamp(),
            message: input,
            image:imageUpLoadUrl
          });

        setInput("");
        setImageUpLoadUrl("");
        setImagePreviewUrl("");
        setShowForm(false)
    };
    const removeUploadImage = () => {
        setImagePreviewUrl("");
        setProgress(0);
        deleteObject(imageRef);
    }
    const showHidenForm = (e) => {
        e.preventDefault();
        setShowForm(true);
        if(showForm){
            document.querySelector('.messageSender__hidenForm').style.display = 'flex';
            document.querySelector('.hidenForm__bottom > form > input').focus();
      }
    }
    const closeHidenForm = () => {
        document.querySelector('.messageSender__hidenForm').style.display = 'none';
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
                {showForm && 
                <div className="messageSender__hidenForm" onClick={closeHidenForm}>
                    <div className="hidenForm__wrapper" onClick={stopCloseHidenForm} >
                        <div className="hidenForm__top">
                            <h1> New post</h1>
                            <CloseIcon onClick={closeHidenForm} ></CloseIcon>
                        </div>
                        <div className="hidenForm__bottom">
                            <div className="hidenForm__userInfo">
                                <Avatar src={user.photoURL}/>
                                <h3>{user.displayName}</h3>
                            </div>
                            <form>
                                <input
                                    type="text"
                                    autoFocus
                                    value={input}
                                    placeholder={`What's on your mind, ${user.displayName} ?`}
                                    onChange={e => setInput(e.target.value)}
                                />
                                {imagePreviewUrl &&
                                    <div className='hidenForm__imagePreview'>
                                        <div className='imagePreview__progress'> 
                                            {![0, 100].includes(progress) && <progress value={progress} max="100" />}

                                            <img src={imagePreviewUrl} alt="" />
                                        </div>
                                        <div  className='imagePreview__remove' >
                                            <CloseIcon onClick={removeUploadImage}></CloseIcon> 
                                        </div>
                            
                                    </div>
                                }
                                <div className="hidenForm__add">
                                    <h3>Add to your post</h3>
                                    
                                    <div className='add__options'>
                                        <ImageUpload 
                                            getUrlUpLoad={setImageUpLoadUrl}
                                            getProgress={setProgress}
                                            getUrlPreview={setImagePreviewUrl}
                                            getRef={setImageRef}
                                        />
                                    </div>
                                </div> 
                                
                                <button 
                                    onClick={handleSubmit} 
                                    type="submit"
                                    className={input !== "" || progress === 100 ? "" : `button--disabled`}
                                    disabled={input !== "" || progress === 100 ? false : true}
                                >
                                    POST
                                </button>
                            </form>
                        </div>
                    </div>
                </div>}
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
