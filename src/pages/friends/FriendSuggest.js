import { Button } from '@mui/material';
import React from 'react';
import './FriendSuggest.css';

function FriendSuggest({profilePic, name}) {
    return (
        <div className='friendSuggest'>
            <img alt='' src={profilePic}></img>
            <div className="friendSuggest__title">
                <h4>{name}</h4>
                <Button>Add Friend</Button>
                <Button>Remove</Button>
            </div>
        </div>
    )
}

export default FriendSuggest
