import React from 'react'

const PostListItem = ({postId, postTitle, action}) => {
    return (
        <span className="post" onClick={() => action(postId)}>
            {postTitle}
        </span>
    )
}

export default PostListItem