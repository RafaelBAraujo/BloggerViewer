import React from 'react'

import Node from './Node'

const NodeList = ({nodes}) => {
    return(
        <div className="node-list">
            {nodes.map(function(node){
                return (
                    <Node imgSrc={node.pic.src} imgAlt={node.pic.alt} text={node.name} value={node.numComments} />
                )
            })}
        </div>
    )
}

export default NodeList