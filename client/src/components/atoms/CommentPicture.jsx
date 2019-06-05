import React from 'react'

const CommentPicture = ({src, alt}) => {
    return (
        <div className="profile-pic">
            <img src={src} alt={alt} />
        </div>
    )
}

export default CommentPicture