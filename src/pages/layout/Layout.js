import React from 'react'
import Header from '../../components/header/Header'
import { Outlet } from 'react-router-dom';

function Layout() {
  
    return (
        <div >
            <Header />
            <Outlet />
        </div>
    )
}

export default Layout
