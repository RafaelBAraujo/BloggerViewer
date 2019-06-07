import React from 'react'

import CommentHeader from '../molecules/CommentHeader'
import CommentContent from '../atoms/CommentContent'
import Response from '../organisms/Response'

const Comment = ({author, content, responses}) => {

    return (
        // TODO: CSS To fix additional div
        <div>
            <div className="comment shadow p-3 mb-5 bg-white rounded">
                <CommentHeader author={author}/>
                <CommentContent content={content}/>
            </div>
            {responses.map(function(response) {
                return(
                    <Response author={response.author} content={response.content} />
                )
            })}
        </div>
    )

}

export default Comment