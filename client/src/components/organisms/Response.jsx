import React from 'react'

import CommentHeader from '../molecules/CommentHeader'
import CommentContent from '../atoms/CommentContent'

const Response = ({author, content, published}) => {
    return(
        <div className="response shadow p-3 mb-5 bg-white rounded">
            <CommentHeader author={author} published={published} />
            <CommentContent content={content} />
        </div>
    )
}

export default Response