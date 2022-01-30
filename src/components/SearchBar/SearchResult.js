import { Avatar } from '@mui/material';
import "./SearchResult.css";
import React from 'react';
import db, { auth } from '../../pages/home/firebase';
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function SearchResult({name, avatar, searchHistory, isFriend}) {
  const closeSearchBar = () => {
    document.querySelector('.searchBar').style.display ="none";
  }
  const navigate = useNavigate();
  const saveSearchHistory = async () => {
    closeSearchBar();
    navigate(`/profile/${name.replace(/\s/g, '')}`, {state: {name, avatar, isFriend}})
    if(auth.currentUser !== null){
      if(searchHistory.length === 0){
        await setDoc(doc(db, "searchHistories", auth.currentUser.uid), {
          historySearch: [{
            searchKey: "",
            name,
            avatar,
          }],
        });
      }else{
        await updateDoc(doc(db, "searchHistories", auth.currentUser.uid), {
          historySearch: arrayUnion({
            searchKey:"",
            name,
            avatar,
          })
        });
      }
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
