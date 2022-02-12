import React from 'react'


function CommentReactionDisplay({userReaction, reactionList}) {
  return (
    <>
    {userReaction === 'wow' &&
    <div className="emoji">
      <p>Wow</p>
    </div>
    }
    
    {userReaction === 'haha' &&
    <div className="emoji">
        <p>HaHa</p>
    </div>
    }
    {userReaction === 'sad' &&
    <div className="emoji">
       <p>Sad</p>
    </div>
    }
    {userReaction === 'love' &&
    <div className="emoji">
        <p style={{
        color: 'rgb(243, 62, 88)'
    }}>Love</p>
    </div>
    }
    {userReaction === 'angry' &&
    <div className="emoji">
    
    <p style={{
        color: 'rgb(233, 113, 15)'
    }}>Angry</p>
    </div>
    }
    {!reactionList.includes(userReaction) && 
    <>
        <p  
        style={userReaction === 'like' ? {color:'rgb(32, 120, 244)'}:{}}
        >
          Like
        </p>
    </>
    }
    </>
  )
}

export default CommentReactionDisplay