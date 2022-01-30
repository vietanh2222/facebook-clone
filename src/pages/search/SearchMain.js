import { Avatar } from '@mui/material';
import React from 'react';
import './SearchMain.css';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { useLocation } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function SearchMain() {
    let {state} = useLocation();
    if(state === null){
        state = [];
    }
  return <div className='searchMain'>
        {state.length === 0
        ? 
            <div className='searchMain__result'>
                    <h1>No result found</h1>
            </div>
        :   
            <>
                {state.map((result) => 
                    <div key={result.id} className='searchMain__result'>
                        <Avatar src={result.avatar || result.profilePic}/>
                        <div className='result__info'>
                            <h2>{result.name}</h2>
                            <p>{result.isFriend === 'yes' ? `Friend` : 
                            `${Math.floor(Math.random()*1000)} follower `}</p>
                        </div>
                        {result.isFriend === 'yes' ? <ChatBubbleIcon /> : <PersonAddIcon />}
                        
                    </div>
                )}
                <p>All results are found</p>
            </>
        }
  </div>;
}

export default SearchMain;
