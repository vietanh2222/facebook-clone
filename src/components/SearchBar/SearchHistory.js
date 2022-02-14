import React from 'react';
import "./SearchHistory.css";
import db from '../../pages/home/firebase';
import { doc } from 'firebase/firestore';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { deleteDoc } from 'firebase/firestore';

function SearchHistory({searchKey, name, avatar, isFriend, closeSearchBar, historyId }) {

  const navigate = useNavigate();

  const goToProfile = () => {
    closeSearchBar();
    navigate(`profile/${name.replace(/\s/g, '')}`, {state: {name, avatar, isFriend }})
  }
  const removeSearchHistory = async (e) => {
    e.stopPropagation();
    await deleteDoc(doc(db, 'searchHistories', historyId))
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
