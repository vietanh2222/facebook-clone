import React from "react";
import "./ImageUpload.css";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";

function ImageUpload({
  getUrlUpLoad,
  getProgress,
  getUrlPreview,
  getRef,
  getName,
  id,
}) {
  const handleUpload = async (image) => {
    getUrlPreview(URL.createObjectURL(image));
    getName(image.name);
    const imageRef = ref(storage, `images/${image.name}`);
    getRef(imageRef);
    const uploadTask = uploadBytesResumable(imageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        getProgress(progress);
        
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          getUrlUpLoad(downloadURL);
        });
      }
    );
  };

  return (
    <div className="input-uploadImage">
      <label htmlFor={`${id}__upload-image`}>
        <PhotoLibraryIcon />
      </label>
      <input
        className="upload-image"
        id={`${id}__upload-image`}
        type="file"
        onChange={(e) => handleUpload(e.target.files[0])}
      />
    </div>
  );
}

export default ImageUpload;
