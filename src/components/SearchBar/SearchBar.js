import React, { useState } from 'react';
import "./SearchBar.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from "@mui/icons-material/Search";
import SearchHistory from './SearchHistory';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloseIcon from '@mui/icons-material/Close';
import { useStateValue } from '../../store/StateProvider';
import SearchResult from './SearchResult';
import { useRef } from 'react';


function SearchBar() {
  const [{contacts}] = useStateValue();
  const [searchKey, setSearchKey] = useState('');
  const searchHistory = ['a', 'b'];
  const searchResult = useRef([]);
  const findContact = (key) => {
    setSearchKey(key);
    searchResult.current = contacts.filter((contact) => 
    contact.name.trim().toLowerCase().includes(key.toLowerCase()))
  }
 
  const closeSearchBar = () => {
    document.querySelector('.searchBar').style.display ="none";
  }

  const stopPropaganition = (e) => {
    e.stopPropagation();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

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
           {searchHistory && searchHistory.length === 0 
           ? <p>No recent searches</p> 
           : <div className="searchBar__histories">
                {searchKey === '' 
                ? 
                <>
                  <h2>Recent searches</h2>
                  {searchHistory.map((a) => 
                    <SearchHistory
                      key={a}
                      Icon={AccessTimeIcon}
                      name={a}
                      Close={CloseIcon}
                  />)}
                </>
                : 
                (
                  <>
                    {searchResult.current.length === 0
                      ? <p>No contact found</p>
                      : <div className="searchBar__results">
                        {searchResult.current.map( (contact) => 
                          (<SearchResult 
                            key={contact.id}
                            name={contact.name}
                            avatar={contact.avatar}
                          />))
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
