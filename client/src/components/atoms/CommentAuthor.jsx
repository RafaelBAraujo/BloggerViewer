import React from 'react'

const CommentAuthor = ({authorName}) => {
    return(
        <div className="profile-name">
            <p>{authorName}</p>
        </div>
    )
}

export default CommentAuthor