import React from 'react'

const PostListItem = ({postTitle}) => {
    return (
        <a className="post">
            {postTitle}
        </a>
    )
}

export default PostListItem