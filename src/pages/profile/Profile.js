import { Avatar, IconButton } from '@mui/material';
import React from 'react';
import './Profile.css';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import WorkIcon from '@mui/icons-material/Work';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useLocation } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';

function Profile() {

    const {state} = useLocation();

  return <div className="profile">
        <div className="profile__header">
            <div className="profile__banner">
                <img src="https://scontent.fhph1-3.fna.fbcdn.net/v/t1.6435-9/s960x960/119063430_1974525656015733_2865548469370594218_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=e3f864&_nc_ohc=EhOUAwTHD-QAX9fqasT&_nc_ht=scontent.fhph1-3.fna&oh=00_AT84a1A2zQJj78vh9ztd4o6KDDXQ1Tvy4V7Lz2KKA5l9cg&oe=621B6912"
                    alt=""
                />
            </div>
            <div className="profile__container">
                <div className="profile__info">
                    <div className="profile__avatar">
                        <Avatar src={state === null ? '' : state.avatar}/>
                    </div>
                    <div className="profile__name">
                        <h1>{state === null ?'Name' : state.name}</h1>
                        <p>{state === null ? '' : `${Math.floor(Math.random()*50)} friends together`}</p>
                    </div>
                    <IconButton>
                        {state !== null && state.isFriend === 'yes'
                        ?   
                            <>
                                <CheckIcon />
                                <p>Friend</p>
                            </>
                        :   
                            <>
                                <PersonAddIcon />
                                <p>Add Friend</p>
                            </>
                        }
                    </IconButton>
                    <IconButton>
                        <ChatBubbleOutlineIcon />
                        <p>Chat</p>
                    </IconButton>
                </div>
                <div className="profile__navlink">
                    <ul>
                        <li><p>Posts</p></li>
                        <li><p>Introduce</p></li>
                        <li><p>Friends</p></li>
                        <li><p>Images</p></li>
                        <li><p>Check in</p></li>
                        <li><p>Sport</p></li>
                        <li><p>More</p><ArrowDropDownIcon /></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="profile__container">
            <div className="profile__body">
                <div className="profile__sidebar">
                    <div className="profile__introduce profile__box">
                        <h3>Introduce</h3>
                        <div className="introduce__info">
                            <WorkIcon />
                            <p>Work from home</p>
                        </div>
                    </div>
                    <div className="profile__image">
                        
                    </div>
                </div>
                <div className="profile__post">
                    <div className="profile__filter profile__box">
                        <h3>Post</h3>
                        <IconButton>
                            <FilterListIcon />
                            <p>Filter</p>
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
  </div>;
}

export default Profile;
