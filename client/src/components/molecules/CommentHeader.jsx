import React from 'react'

const CommentHeader = ({author}) => {
    return(
        <div className="comment-header">
            <div className="profile-pic"><img src={author.pic.src} alt={author.pic.alt}/></div>
            <div className="profile-name"><p>{author.name}</p></div>
        </div>
    )
}

export default CommentHeader