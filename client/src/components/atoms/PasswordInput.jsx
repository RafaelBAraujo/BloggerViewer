import React from 'react'

import '../../stylesheets/login.css'

const PasswordInput = ({placeholder}) => {

    return (
        <div className="email-input">
            <input type="password" placeholder={placeholder}/>
        </div>
    )

}

export default PasswordInput