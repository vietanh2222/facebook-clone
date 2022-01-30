import React from 'react';
import "./SearchHistory.css";
import db, { auth } from '../../pages/home/firebase';
import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function SearchHistory({searchKey, name, avatar, isFriend }) {

  const navigate = useNavigate();
  const closeSearchBar = () => {
    document.querySelector('.searchBar').style.display ="none";
  }
  const goToProfile = () => {
    closeSearchBar();
    navigate(`profile/${name.replace(/\s/g, '')}`, {state: {name, avatar, isFriend}})
  }
  const removeSearchHistory = async (e) => {
    e.stopPropagation();
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
  <div className='searchHistory' onClick={goToProfile}>
    <Avatar src={avatar}/>
    <p>{searchKey !== "" ? searchKey : name}</p>
    <CloseIcon onClick={removeSearchHistory}/>
  </div>
  )
}

export default SearchHistory;
