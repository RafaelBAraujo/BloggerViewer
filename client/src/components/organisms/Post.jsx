import React from 'react'

import PostTitle from '../atoms/PostTitle'
import PostContent from '../atoms/PostContent'
import Comment from '../organisms/Comment'

const Post = ({title, content, comments}) => {
    return(
        <div id="comments" className="comments">
            <div className="post-content shadow p-3 mb-5 rounded">
                <PostTitle title={title} />
                <PostContent content={content} />
                {comments.map(function(comment) {
                    return(
                        <Comment author={comment.author} content={comment.content} replies={comment.replies} />
                    )
                })}
            </div>
        </div>
    )
}

export default Post