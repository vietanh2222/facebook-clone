import React, { useState, useEffect, useRef } from 'react';
import "./Feed.css";
import StoryReel from './StoryReel';
import MessageSender from './MessageSender';
import Post from './Post';
import db from './firebase';
import { collection, limit, onSnapshot, orderBy, query, startAfter } from "firebase/firestore";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useStateValue } from '../../store/StateProvider';

function Feed() {
    const [{user}] = useStateValue();
    const [posts, setPosts] = useState([{username: "....Loading", id: "initial"}]);
    const [hasMore, setHasMore] = useState(true)
    const documentSnapshots = useRef("initial");
    
    useEffect(() => {
        const q = query(collection(db, "posts"), orderBy("timestamp", "desc"), limit(2));
        
        onSnapshot(q, (snapshot) => {
                documentSnapshots.current = snapshot;
                setPosts(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
                setHasMore(true)
        });
    }, [])


    const fetchData = () => {
        if(documentSnapshots.current.docs){
        const lastVisible = documentSnapshots.current.docs[documentSnapshots.current.docs.length-1];
        const next = query(collection(db, "posts"),
        orderBy("timestamp", "desc"),
        startAfter(lastVisible),
        limit(2))

        onSnapshot(next, (snapshot) => {
            documentSnapshots.current = snapshot;
            if( snapshot.docs.length === 0 || snapshot.docs.length < 2){
                setHasMore(false)
            }
            const nextPosts = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
            setPosts([...posts, ...nextPosts])
        });
        } else {
            return;
        }
    }
   
    return (
        <div className='feed' >
            <StoryReel />
            <MessageSender />
            <InfiniteScroll
                dataLength={posts.length}
                next={fetchData}
                hasMore={hasMore}
                loader={<div style={{
                    width:"50px",
                    height:"50px",
                    margin:"10px auto",
                }}  >
                        <img src='https://i.stack.imgur.com/ATB3o.gif' alt='...Loading' style={{width: "100%"}}/> 
                    </div>}
                endMessage={
                    <p style={{ textAlign: 'center', color: 'gray' }}>
                    <b>No more Post....</b>
                    </p>
                }
            >
            {posts.map((post) =>
                <Post
                    id = {post.id}
                    key = {post.id}
                    profilePic= {post.profilePic}
                    image={post.image}
                    username={post.username}
                    timestamp={post.timestamp}
                    message={post.message}
                    email={user.email}
                    userLikes={post.userLikes || []}
                    userShares={post.userShares || []}
                    userLogin={user.displayName}
                    userComment={post.userComment || {}}
                />
            )}
            </InfiniteScroll>
        </div>
    )
}

export default Feed
