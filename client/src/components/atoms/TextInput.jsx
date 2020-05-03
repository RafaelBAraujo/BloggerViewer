import React from 'react'

import '../../stylesheets/login.css'

const TextInput = ({placeholder}) => {

    return (
        <div className="email-input">
            <input id={placeholder+'-input'} type="text" placeholder={placeholder}/>
        </div>
    )

}

export default TextInput