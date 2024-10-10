import React, { useContext } from 'react';
import { AuthContext } from "../App";

const Login = () => {

    const { isLoggedIn, login } = useContext(AuthContext)

    return (
        <div className='main'>
            <h1>Login</h1>
        </div>
    )

}

export default Login