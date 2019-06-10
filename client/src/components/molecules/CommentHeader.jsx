import React from 'react'

import CommentPicture from '../atoms/CommentPicture'
import CommentAuthor from '../atoms/CommentAuthor'

const CommentHeader = ({author}) => {
    return(
        <div className="comment-header">
            <CommentPicture src={author.pic.src} alt={author.pic.alt} />
            <CommentAuthor authorName={author.name} />
        </div>
    )
}

export default CommentHeader