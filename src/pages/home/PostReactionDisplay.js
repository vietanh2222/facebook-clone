import React from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import wow from '../../assets/images/emoji/wow.png';
import angry from '../../assets/images/emoji/angry.png';
import sad from '../../assets/images/emoji/sad.png';
import haha from '../../assets/images/emoji/haha.png';
import love from '../../assets/images/emoji/love.png';

function PostReactionDisplay({userReaction, reactionList}) {
  return (
    <>
    {userReaction === 'wow' &&
    <div className="emoji">
    <img alt="" src={wow}/>
    <p>Wow</p>
    </div>
    }
    
    {userReaction === 'haha' &&
    <div className="emoji">
    <img alt="" src={haha} />
    <p>HaHa</p>
    </div>
    }
    {userReaction === 'sad' &&
    <div className="emoji">
    <img alt="" src={sad} />
    <p>Sad</p>
    </div>
    }
    {userReaction === 'love' &&
    <div className="emoji">
    <img alt="" src={love} />
    <p style={{
        color: 'rgb(243, 62, 88)'
    }}>Love</p>
    </div>
    }
    {userReaction === 'angry' &&
    <div className="emoji">
    <img alt="" src={angry} />
    <p style={{
        color: 'rgb(233, 113, 15)'
    }}>Angry</p>
    </div>
    }
    {!reactionList.includes(userReaction) && 
    <>
    <ThumbUpIcon />
    <p>Like</p>
    </>
    }
    </>
  )
}

export default PostReactionDisplay