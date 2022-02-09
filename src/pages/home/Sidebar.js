import React from 'react';
import "./Sidebar.css";
import SidebarRow from './SidebarRow';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import StorefrontIcon from '@mui/icons-material/Storefront';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useStateValue } from '../../store/StateProvider';
import { useNavigate } from 'react-router-dom';

function Sidebar() {

const [{user}] = useStateValue();
const navigate = useNavigate()
    return (
        <div className='sidebar'>
            <div onClick={() => 
                {navigate(`/profile/me`, {state: {name: user.displayName, avatar:user.photoURL }})}}>
            <SidebarRow 
                src={user.photoURL}
                title={user.displayName}
            />
            </div>
            <SidebarRow 
                Icon={LocalHospitalIcon}
                title="COVID-19 Information Center"
            />
            <SidebarRow 
                Icon={EmojiFlagsIcon}
                title="Pages"
            />
            <div onClick={() => {navigate('friends')}}>
            <SidebarRow 
                Icon={PeopleIcon}
                title="Friends"
            />
            </div>
            <SidebarRow 
                Icon={ChatIcon}
                title="Messenger"
            />
            <SidebarRow 
                Icon={StorefrontIcon}
                title="Marketplace"
            />
            <SidebarRow 
                Icon={VideoLibraryIcon}
                title="Videos"
            />
            <SidebarRow 
                Icon={ExpandMoreIcon}
                title="Matketplace"
            />
   
        </div>
    )
}

export default Sidebar
