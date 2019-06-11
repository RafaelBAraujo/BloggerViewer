import React from 'react'

const CommentPublished = ({published}) => {

    if(typeof published !== 'undefined') {
        const [,year,month,day,hour,minute] = published.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})-(\d{2}):(\d{2})/);
        published = `publicado em ${day}/${month}/${year} às ${hour}:${minute}`
    } else {
        published = 'data de publicação indefinida'
    }

    return (
        <p className="comment-published" >
            {published}
        </p>
    )
}

export default CommentPublished