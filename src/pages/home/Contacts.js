import React, { useState, useEffect } from 'react';
import "./Contacts.css";
import Contact from './Contact';
import { onSnapshot } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import db from './firebase';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { actionTypes } from '../../store/reducer';
import { useStateValue } from '../../store/StateProvider';

function Contacts() {
    const [,dispatch] = useStateValue();
    const [contacts, setContacts] = useState([])
    const [friendRequests, setFriendRequests] = useState([]);
    const [friendSuggest, setFriendSuggest] = useState([]);
    useEffect(() => {
        onSnapshot(collection(db, "contacts"), (snapshot) => {
            setContacts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        })
        onSnapshot(collection(db, "friendRequests"), (snapshot) => {
            setFriendRequests(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        })
        onSnapshot(collection(db, "friendSuggest"), (snapshot) => {
            setFriendSuggest(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        })
    }, [])
    
    useEffect(() => {
        dispatch({
            type:actionTypes.SAVE_CONTACT,
            contacts,
            friendRequests,
            friendSuggest,
        })
    }, [contacts, friendRequests, friendSuggest , dispatch])
    return (
        <div className='contacts' >
            <div className='contacts__header'>
                <p>Contact Friend</p>
                <VideoCameraBackIcon />
                <SearchIcon />
                <MoreHorizIcon />
            </div>
            {contacts.map( (contact) =>
                <Contact
                    key= {contact.id}
                    avatar= {contact.avatar}
                    name= {contact.name}
                />
            )}
        </div>
    )
}

export default Contacts

