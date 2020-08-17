import React from 'react'

import CommentHeader from '../molecules/CommentHeader'
import CommentContent from '../atoms/CommentContent'
import ExpandRepliesButton from '../atoms/ExpandRepliesButton'
import Response from '../organisms/Response'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'

const Comment = ({id, author, content, published, replies}) => {

    let collapseId = author.displayName.split(' ')[0] + id.substr(0,3)

    return (
        <div className="accordion" >
            <div className="comment shadow p-3 mb-5 bg-white rounded">
                <CommentHeader author={author} published={published} />
                <CommentContent content={content}/>
                <ExpandRepliesButton id={collapseId} numOfReplies={replies.length} />
                <div id={collapseId} data-parent="#accordion">
                    {replies.map(function(reply) {
                        return(
                            <Response key={reply.id} author={reply.author} content={reply.content} published={reply.published} />
                        )
                    })}
                </div>
            </div>
        </div>
    )

}

export default Comment