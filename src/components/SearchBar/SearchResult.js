import { Avatar } from '@mui/material';
import "./SearchResult.css";
import React from 'react';

function SearchResult({name, avatar}) {
  return <div className='searchResult'>
          <Avatar src={avatar} />
          <p>{name}</p>
  </div>;
}

export default SearchResult;
