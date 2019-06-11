import React from 'react'

import Node from './Node'

const NodeList = ({nodes}) => {

    let replyKeyCounter = 0

    return(
        <div className="node-list">
            {nodes.map(function(node){
                return (
                    <Node key={++replyKeyCounter} imgSrc={node.pic.src} imgAlt={node.pic.alt} text={node.name} value={node.numComments} />
                )
            })}
        </div>
    )
}

export default NodeList