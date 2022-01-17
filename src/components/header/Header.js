import React, { useState } from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import GroupsIcon from '@mui/icons-material/Groups';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { Avatar, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ForumIcon from '@mui/icons-material/Forum';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListIcon from '@mui/icons-material/List';
import { useStateValue } from '../../store/StateProvider';
import Sidebar from '../../pages/home/Sidebar';
import { Link, useLocation } from '../../../node_modules/react-router-dom/index';


function Header() {

    const [{ user }] = useStateValue();

    const [showSidebar, setShowSidebar] = useState(false);

    const {pathname} = useLocation();

    const handleClick = () => {
        setShowSidebar(!showSidebar)
    }

    return (
        <div className="header">
            {showSidebar && <Sidebar />}
            <div className="header__left">
                <Link to="/"><img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="" /></Link>
                <div className="header__input">
                    <SearchIcon />
                    <input type="text" placeholder='Search Facebook' />
                </div>
            </div>

            <div className="header__center">
                <Link to="/">
                    <div className={pathname === "/" ? `header__option 
                header__option--active` : `header__option`} >
                        <HomeIcon />
                        <p>Home</p>
                    </div>
                </Link>
                <Link to="friends">
                    <div className={pathname === "/friends" ? `header__option 
                header__option--active` : `header__option`} >
                        <PeopleOutlineIcon />
                        <p>Friends</p>
                    </div>
                </Link>
                <Link to="watch">
                    <div className={pathname === "/watch" ? `header__option 
                header__option--active` : `header__option`} >
                        <SubscriptionsIcon />
                        <p>Watch</p>
                    </div>
                </Link>
                <Link to="groups">
                    <div className={pathname === "/groups" ? `header__option 
                header__option--active` : `header__option`} >
                        <GroupsIcon />
                        <p>Groups</p>
                    </div>
                </Link>
                <Link to="gaming">
                    <div className={pathname === "/gaming" ? `header__option 
                header__option--active` : `header__option`} >
                        <SportsEsportsIcon />
                        <p>Gaming</p>
                    </div>
                </Link>
            </div>

            <div className="header__right">

                <IconButton onClick={handleClick}>
                    <ListIcon className='header__list' />
                </IconButton>
                <div className="header__info">
                    <Avatar src={user.photoURL} />
                    <h4>{user.displayName}</h4>
                </div>
                <IconButton className='header__icon'>
                    <AddIcon />
                </IconButton>
                <IconButton className='header__icon'>
                    <ForumIcon />
                </IconButton>
                <IconButton className='header__icon'>
                    <NotificationsActiveIcon />
                </IconButton>
                <IconButton className='header__icon'>
                    <ExpandMoreIcon />
                </IconButton>

            </div>
        </div>
    )
}


export default Header;