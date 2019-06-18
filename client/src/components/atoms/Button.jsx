import React from 'react'

const Button = ({label, onClick}) => {

    return (
        <button type="button" className="btn btn-secondary" onClick={onClick} >
            {label}
        </button>
    )

}

export default Button
