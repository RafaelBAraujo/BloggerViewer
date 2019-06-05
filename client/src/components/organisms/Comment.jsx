import React from 'react'

import CommentHeader from '../molecules/CommentHeader'
import CommentContent from '../atoms/CommentContent'

const Comment = ({author, content, responses}) => {

    return (
        <div className="comment shadow p-3 mb-5 bg-white rounded">
            <CommentHeader author={author}/>
            <CommentContent content={content}/>
        </div>
    )

}

export default Comment