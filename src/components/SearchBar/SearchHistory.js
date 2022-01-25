import React from 'react';
import "./SearchHistory.css";
import db, { auth } from '../../pages/home/firebase';
import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar } from '@mui/material';

function SearchHistory({searchKey, name, avatar }) {
  
  const removeSearchHistory = async () => {

    if(auth.currentUser !== null){
      await updateDoc(doc(db, "searchHistories", auth.currentUser.uid), {
        historySearch: arrayRemove({
          searchKey,
          name,
          avatar,
        })
      });
    } else {
      return
    }
  }

  return (
  <div className='searchHistory' >
    <Avatar src={avatar}/>
    <p>{searchKey !== "" ? searchKey : name}</p>
    <CloseIcon onClick={removeSearchHistory}/>
  </div>
  )
}

export default SearchHistory;
