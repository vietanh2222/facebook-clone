import { Avatar } from '@mui/material';
import "./SearchResult.css";
import React from 'react';
import db, { auth } from '../../pages/home/firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

function SearchResult({name, avatar}) {

  const saveSearchHistory = async () => {
    if(auth.currentUser !== null){
      await updateDoc(doc(db, "searchHistories", auth.currentUser.uid), {
        historySearch: arrayUnion({
          searchKey:"",
          name,
          avatar,
        })
      });
    } else {
      return
    }
  }

  return <div className='searchResult' onClick={saveSearchHistory}>
          <Avatar src={avatar} />
          <p>{name}</p>
        </div>;
}

export default SearchResult;
