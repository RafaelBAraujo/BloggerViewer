import React from 'react'

import CommentPicture from '../atoms/CommentPicture'
import CommentAuthor from '../atoms/CommentAuthor'
import CommentPublished from '../atoms/CommentPublished'

const CommentHeader = ({author, published}) => {
    return(
        <div className="comment-header">
            <CommentPicture src={author.pic.src} alt={author.pic.alt} />
            <CommentAuthor authorName={author.name} />
            <CommentPublished published={published} />
        </div>
    )
}

export default CommentHeader