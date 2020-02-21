import React from 'react'
import { GoogleLogin } from 'react-google-login';

import '../../stylesheets/login.css'

import LoginInput from '../molecules/LoginInput'
import Button from '../atoms/Button'

const responseGoogle = (response) => {
    console.log(response);
}

const validateLogin = () => {
    window.location.replace("./home"); // TODO
}

const Login = () => {

    return (
        <div className="login shadow p-3 mb-5 rounded">
            <LoginInput />
            <div className="default-login mb-3">
                <a href="#">Forgot password?</a>
                <Button label="Log in" onClick={validateLogin} />
            </div>
            <GoogleLogin
                clientId="708419360859-s56tisf2n0d5jl0jritleoeteu3ob492.apps.googleusercontent.com"
                buttonText="Sign in with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )

}

export default Login