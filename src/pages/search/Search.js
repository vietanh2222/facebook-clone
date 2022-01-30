import React from 'react';
import './Search.css';
import SearchMain from './SearchMain';
import SearchSideBar from './SearchSideBar';

function Search() {
  return <div className='search'>
      <SearchSideBar />
      <SearchMain />
  </div>;
}

export default Search;
