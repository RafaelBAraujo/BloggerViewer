import React from 'react'

const IconButton = ({icon, onClick}) => {

    return (
        <button className="btn-clear" onClick={onClick} >
            <i className="material-icons">{icon}</i>
        </button>
    )

}

export default IconButton
