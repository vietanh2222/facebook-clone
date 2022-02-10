import React, { useEffect, useState, useRef } from 'react';
import "./SearchBar.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from "@mui/icons-material/Search";
import SearchHistory from './SearchHistory';

import { useStateValue } from '../../store/StateProvider';
import SearchResult from './SearchResult';
import { doc, onSnapshot, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import db, { auth } from '../../pages/home/firebase';
import { useNavigate } from 'react-router-dom';



function SearchBar({handleGetValue}) {
  
  let [{contacts, friendRequests, friendSuggest}] = useStateValue();
  
  if(contacts === undefined || friendRequests === undefined || friendSuggest === undefined){
    contacts = [];
    friendRequests = [];
    friendSuggest = [];
  }
  const friendList = contacts.map((contact) => 
  ({...contact, isFriend: 'yes'}))
  const noFriendList = 
  [...friendRequests, ...friendSuggest]
    .map((contact) => ({
      ...contact, isFriend: 'no'
    }))
  const listSearch = [...friendList, ...noFriendList]
  
  const [searchKey, setSearchKey] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const searchResult = useRef([]);
  const navigate = useNavigate();

  const findContact = (key) => {
    setSearchKey(key);
    handleGetValue(key);
    searchResult.current = listSearch.filter((contact) => 
    contact.name.trim().toLowerCase().includes(key.toLowerCase()))
  }

  const closeSearchBar = () => {
    document.querySelector('.searchBar').style.display ="none";
  }

  const stopPropaganition = (e) => {
    e.stopPropagation();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    closeSearchBar();
    if(auth.currentUser !== null){
      if(searchHistory.length === 0){
        await setDoc(doc(db, "searchHistories", auth.currentUser.uid), {
          historySearch: [{
            searchKey,
            name:"",
            avatar:""
          }],
        });
      navigate('/search', {state: searchResult.current})
      }else{
        await updateDoc(doc(db, "searchHistories", auth.currentUser.uid), {
          historySearch: arrayUnion({
            searchKey,
            name:"",
            avatar:""
          })
        });
        navigate('/search', {state: searchResult.current})
      }
    }else{
      return
    }
  }

  
  useEffect(() => {
    if(auth.currentUser !== null){
        
        onSnapshot(doc(db, "searchHistories", auth.currentUser.uid), (doc) => {
        setSearchHistory(doc.data().historySearch.reverse());
    });
    }else{
      return
    }
  }, [])
  
  return (
    <div className='searchBar' onClick={stopPropaganition}>
          <div className="searchBar__header">
            <ArrowBackIcon onClick={closeSearchBar} />
            <div className="searchBar__input">
              <SearchIcon />
              <form >
                <input
                  type="text" 
                  placeholder="Search Facebook" 
                  onChange={(e) => {
                    findContact(e.target.value);
                  }}
                />
                <button type='submit' onClick={handleSubmit}>Hiden button</button>
              </form>
            </div>
          </div>
          <div className="searchBar__body">
           {searchKey === '' && searchHistory.length === 0 
           ? <p>No recent searches</p> 
           : <div className="searchBar__histories">
                {searchKey === '' 
                ? 
                <>
                  <h2>Recent searches</h2>
                  {searchHistory.map((history,index) => 
                    <SearchHistory
                      key={index}
                      name={history.name}
                      searchKey = {history.searchKey}
                      avatar={history.avatar}
                      isFriend={history.isFriend}
                  />)}
                </>
                : 
                (
                  <>
                    {searchResult.current.length === 0
                      ? <p>No contact found</p>
                      : <div className="searchBar__results">
                        {searchResult.current.map( (contact) => 
                          (
                            <SearchResult 
                              key={contact.id}
                              name={contact.name}
                              avatar={contact.avatar || contact.profilePic}
                              searchHistory={searchHistory}
                              isFriend={contact.isFriend}
                            />
                          ))
                        }
                      </div>
                    }
                  </>
                )
                }
             </div>}
          </div>
    </div>
  )
}

export default SearchBar;
