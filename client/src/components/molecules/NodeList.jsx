import React from 'react'

import Node from './Node'

const NodeList = ({nodes}) => {

    let replyKeyCounter = 0

    return(
        <div className="node-list">
            {nodes.map(function(node){
                return (
                    <Node key={++replyKeyCounter} imgSrc={node.image.url} imgAlt={node.url} text={node.displayName} value={node.numComments} />
                )
            })}
        </div>
    )
}

export default NodeList