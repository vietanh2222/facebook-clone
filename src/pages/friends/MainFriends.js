import React from 'react';
import FriendRequest from './FriendRequest';
import './MainFriends.css';
import FriendSuggest from './FriendSuggest';
import { useStateValue } from '../../store/StateProvider';


function MainFriends() {

    const [{friendRequests, friendSuggest}] = useStateValue();
 
    return (
        <div className='mainfriends' >
            <div className='mainfriends__request'>
                <div className="mainfriends__header">
                    <h2>Friend Request</h2>
                    <p>View All</p>
                </div>
                <div className="mainfriends__body">
                    {friendRequests.map(friend =>
                        <FriendRequest
                            key={friend.id}
                            profilePic={friend.profilePic}
                            name={friend.name}
                        />
                    )}
                </div>
                <hr className='mainfriends__hr'></hr>
            </div>
            <div className='mainfriends__suggest'>
                <div className="mainfriends__header">
                    <h2>People you may know</h2>
                    <p>View All</p>
                </div>
                <div className="friendsuggest__body">
                    {friendSuggest.map(friend =>
                        <FriendSuggest
                            key={friend.id}
                            profilePic={friend.profilePic}
                            name={friend.name}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default MainFriends
