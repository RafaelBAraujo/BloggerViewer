import React from 'react'

import CommentHeader from '../molecules/CommentHeader'
import CommentContent from '../atoms/CommentContent'
import Response from '../organisms/Response'

const Comment = ({author, content, replies}) => {

    return (
        <div className="comment shadow p-3 mb-5 bg-white rounded">
            <CommentHeader author={author}/>
            <CommentContent content={content}/>
            {replies.map(function(reply) {
                return(
                    <Response key={reply.id} author={reply.author} content={reply.content} />
                )
            })}
        </div>
    )

}

export default Comment