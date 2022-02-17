import { Avatar } from '@mui/material';
import "./SearchResult.css";
import React from 'react';
import db from '../../pages/home/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function SearchResult({name, avatar, isFriend, closeSearchBar, user}) {

  const navigate = useNavigate();
  const saveSearchHistory = async () => {
    
    navigate(`/profile/${name.replace(/\s/g, '')}`, {state: {name, avatar, isFriend}})
    await addDoc(collection(db, 'searchHistories'), {
      user,
      searchKey:'',
      name,
      avatar,
      timestamp:serverTimestamp()
    })
    closeSearchBar();
  }

  return <div className='searchResult' onClick={saveSearchHistory}>
          <Avatar src={avatar} />
          <p>{name}</p>
        </div>;
}

export default SearchResult;
