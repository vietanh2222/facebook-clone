import React from 'react'
import Header from '../../components/header/Header'
import { Outlet } from 'react-router-dom';

function Layout() {
    const closeSearchBar = () => {
        document.querySelector('.searchBar').style.display ="none";
    }
    return (
        <div onClick={closeSearchBar}>
            <Header />
            <Outlet />
        </div>
    )
}

export default Layout
