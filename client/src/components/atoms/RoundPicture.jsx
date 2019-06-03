import React from 'react'

const RoundPicture = ({src, alt}) => {
    return(
        <img className="node-img rounded-circle" src={src} alt={alt} />
    )
}

export default RoundPicture;