import React from 'react'

import CommentHeader from '../molecules/CommentHeader'
import CommentContent from '../atoms/CommentContent'

const Response = ({author, content}) => {
    return(
        <div className="response shadow p-3 mb-5 bg-white rounded">
            <CommentHeader author={author}/>
            <CommentContent content={content}/>
        </div>
    )
}

export default Response