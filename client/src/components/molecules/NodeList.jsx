import React from 'react'

import Node from './Node'

const NodeList = ({nodes}) => {
    return(
        <div className="node-list">
            {nodes.map(function(node){
                return (
                    <Node imgSrc={node.imgSrc} imgAlt={node.imgAlt} text={node.text} value={node.value} />
                )
            })}
        </div>
    )
}

export default NodeList