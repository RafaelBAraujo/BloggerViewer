import React from 'react'

import CommentHeader from '../molecules/CommentHeader'
import CommentContent from '../atoms/CommentContent'
import Response from '../organisms/Response'

const Comment = ({author, content, responses}) => {

    return (
        <div className="comment shadow p-3 mb-5 bg-white rounded">
            <CommentHeader author={author}/>
            <CommentContent content={content}/>
            {responses.map(function(response) {
                return(
                    <Response key={response.id} author={response.author} content={response.content} />
                )
            })}
        </div>
    )

}

export default Comment