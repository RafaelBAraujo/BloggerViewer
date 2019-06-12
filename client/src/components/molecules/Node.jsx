import React from 'react'

import NodeText from '../atoms/NodeText'
import NodeValue from '../atoms/NodeValue'
import RoundPicture from '../atoms/RoundPicture'

import { filterCommentsByAuthor } from '../scripts'

const Node = ({imgSrc, imgAlt, text, value}) => {
    return(
        <div className="node" onClick={() => filterCommentsByAuthor(text)} >
            <RoundPicture src={imgSrc} alt={imgAlt}/>
            <NodeText text={text} />
            <NodeValue value={value} />
        </div>
    )
}

export default Node