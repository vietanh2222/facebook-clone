import React, { useEffect, useState, useRef } from 'react';
import "./SearchBar.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchHistory from './SearchHistory';
import { useStateValue } from '../../store/StateProvider';
import SearchResult from './SearchResult';
import { onSnapshot, addDoc, collection, where, serverTimestamp, orderBy } from 'firebase/firestore';
import db from '../../pages/home/firebase';
import { useNavigate } from 'react-router-dom';
import { query } from 'firebase/firestore';



function SearchBar({handleGetValue, closeSearchBar, valueSearchInit}) {
  
  let [{contacts, friendRequests, friendSuggest}] = useStateValue();
  const [{user}] = useStateValue();
  if(contacts === undefined || friendRequests === undefined || friendSuggest === undefined){
    contacts = [];
    friendRequests = [];
    friendSuggest = [];
  }

  const [searchKey, setSearchKey] = useState(valueSearchInit);
  const [searchHistory, setSearchHistory] = useState([]);
  const listSearch = useRef([])
  const searchResult = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const friendList = contacts.map((contact) => 
  ({...contact, isFriend: 'yes'}))
  const noFriendList = 
  [...friendRequests, ...friendSuggest]
    .map((contact) => ({
      ...contact, isFriend: 'no'
    }))
    listSearch.current=[...friendList, ...noFriendList]
  }, [contacts, friendRequests, friendSuggest])
  
  useEffect(() => {
        const q = query(collection(db, "searchHistories"), where("user", "==" , user.displayName), orderBy("timestamp", "desc"))
        onSnapshot(q, (snapshot) => {
          setSearchHistory((snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))))
        })
  }, [user.displayName])

  const handleFindContact = (key) => {
    setSearchKey(key);
    handleGetValue(key);
    searchResult.current = listSearch.current.filter((contact) => 
    contact.name.trim().toLowerCase().includes(key.toLowerCase()))
  }

  const stopPropaganition = (e) => {
    e.stopPropagation();
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    closeSearchBar();
    await addDoc(collection(db, "searchHistories"), {
            user: user.displayName,
            searchKey,
            name:"",
            avatar:"",
            timestamp: serverTimestamp()
          }
        );
    navigate('/search', {state: searchResult.current})
  }

  return (
    <div className='searchBar' onClick={stopPropaganition}>
          <div className="searchBar__header">
            <ArrowBackIcon onClick={closeSearchBar} />
            <div className="searchBar__input">
              <form >
                <input
                  autoFocus
                  type="text" 
                  placeholder="Search Facebook" 
                  onChange={(e) => {
                    handleFindContact(e.target.value);
                  }}
                  value={searchKey}
                />
                <button 
                  type='submit' 
                  onClick={handleSubmit}
                  disabled={searchKey === '' ? true : false}
                  className={searchKey === '' ? 'button--disabled displayNone' : ''}
                >
                    Search
                </button>
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
                      closeSearchBar={closeSearchBar}
                      historyId={history.id}
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
                              avatar={contact.profilePic || contact.avatar}
                              searchHistory={searchHistory}
                              isFriend={contact.isFriend}
                              closeSearchBar={closeSearchBar}
                              user={user.displayName}
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
