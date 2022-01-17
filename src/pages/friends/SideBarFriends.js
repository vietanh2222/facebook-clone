import React from 'react';
import './SideBarFriends.css';
import SidebarfriendsRow from './SidebarfriendsRow';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CakeIcon from '@mui/icons-material/Cake';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import GroupsIcon from '@mui/icons-material/Groups';
import { Link } from 'react-router-dom';


function SideBarFriends() {
    return (
        <div className='sidebarfriends' >
            <div className='sidebarfriends__header'>
                <h2>Friends</h2>
                <SettingsIcon />
            </div>
            <div className='sidebarfriends__body'> 
                <Link to="/">
                    <SidebarfriendsRow 
                        title="Home Page"
                        Icon={PeopleIcon}
                    />
                </Link>
                <SidebarfriendsRow 
                    title="Friends Request"
                    Icon={PersonAddIcon}
                    Arrow={ArrowForwardIosIcon}
                />
                <SidebarfriendsRow 
                    title="Suggestion"
                    Icon={GroupAddIcon}
                    Arrow={ArrowForwardIosIcon}
                />
                <SidebarfriendsRow 
                    title="All Friends"
                    Icon={GroupsIcon}
                    Arrow={ArrowForwardIosIcon}
                />
                <SidebarfriendsRow 
                    title="Birth Day"
                    Icon={CakeIcon}
                />
                <SidebarfriendsRow 
                    title="Custom List"
                    Icon={PersonRemoveIcon}
                    Arrow={ArrowForwardIosIcon}
                />
                
            </div>
        </div>
    )
}

export default SideBarFriends
    