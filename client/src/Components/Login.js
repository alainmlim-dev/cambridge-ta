import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from "../App";
import {
    Button,
    Form,
    Stack,
    TextInput
} from '@carbon/react';

const Login = () => {

    const { login } = useContext(AuthContext)
    const usernameRef = useRef()
    const passwordRef = useRef()


    const handleChangeUsername = (e) => {
        usernameRef.current = e.target.value
    }

    const handleChangePassword = (e) => {
        passwordRef.current = e.target.value
    }

    const handleLogin = (e) => {

        e.preventDefault()
        console.log(usernameRef.current, passwordRef.current)

    }

    useEffect(() => {

        //Axios fetch ---

    }, [])


    return (
        <div className='main'>
            <div className='content'>

                <h1>Cambridge</h1>
                <p>Technical Assessment React Application</p>
                <p>By Alain Lim</p>


                <Form aria-label="login form" className='login-form'>
                    <h3>Login</h3>
                    <Stack gap={5}>

                        <TextInput
                            id="username"
                            type="text"
                            labelText="Username"
                            ref={usernameRef}
                            onChange={(e) => {handleChangeUsername(e)}}
                        />

                        <TextInput
                            id="password"
                            type="text"
                            labelText="Password (Email)"
                            ref={passwordRef}
                            onChange={(e) => {handleChangePassword(e)}}
                        />

                        <Button onClick={(e) => handleLogin(e)}>Login</Button>

                    </Stack>
                </Form>

            </div>
        </div>
    )

}

export default Login