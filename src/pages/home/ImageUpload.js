import React from "react";
import './ImageUpload.css';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from "./firebase";
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

function ImageUpload({ getUrlUpLoad, getProgress, getUrlPreview, getRef, getName }) {

    const handleUpload = async (image) => {
        getUrlPreview(URL.createObjectURL(image));
        getName(image.name)
        const imageRef = ref(storage, `images/${image.name}`)
        getRef(imageRef)
        const uploadTask = uploadBytesResumable(imageRef, image)   
        uploadTask.on('state_changed', 
        (snapshot) => {
         
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          getProgress(progress);
          console.log('Upload is ' + progress + '% done');
    
        }, 
        (error) => {
          // Handle unsuccessful uploads
        }, 
        () => {
          console.log(uploadTask);
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            getUrlUpLoad(downloadURL);
          });
        }

      );
    }

  return (
  
    <div className="input-uploadImage">
        <label htmlFor="upload-image">
           <PhotoLibraryIcon />
        </label>
        <input
          id="upload-image"
          type="file"
          onChange={(e) => handleUpload(e.target.files[0])}
        />
    </div>
  );
}

export default ImageUpload;
