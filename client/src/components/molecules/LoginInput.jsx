import React from 'react'

import TextInput from '../atoms/TextInput'
import PasswordInput from '../atoms/PasswordInput'

const LoginInput = () => {

    return (
        <div className="login-input">
            <label className="login-input-label">Email</label>
            <TextInput id="username" placeholder="Email" />
            <label className="login-input-label">Password</label>
            <PasswordInput placeholder="Password" />
        </div>
    )

}

export default LoginInput