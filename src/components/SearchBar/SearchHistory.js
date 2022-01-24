import React from 'react';
import "./SearchHistory.css";

function SearchHistory({name, Icon, Close}) {
  return (
  <div className='searchHistory' >
    <Icon />
   <p>{name}</p>
    <Close />
  </div>
  )
}

export default SearchHistory;
