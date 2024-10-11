import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from "../App";
import {
    Button,
    ButtonSkeleton,
    Form,
    Stack,
    TextInput
} from '@carbon/react';
import axios from 'axios'
import { useNavigate } from 'react-router';

const Login = () => {

    let navigate = useNavigate()
    const { login, setUser } = useContext(AuthContext)
    const usernameRef = useRef("")
    const passwordRef = useRef("")
    const [isLoggingIn, setIsLoggingIn] = useState(false)


    const handleChangeUsername = (e) => {
        usernameRef.current = e.target.value
    }

    const handleChangePassword = (e) => {
        passwordRef.current = e.target.value
    }

    const handleLogin = (e) => {

        e.preventDefault()
        setIsLoggingIn(true)

        axios.get(process.env.REACT_APP_API_AUTH, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                "username": usernameRef.current,
                "password": passwordRef.current
            },
        })
            .then(function (response) {
                // handle success
                setIsLoggingIn(false)
                console.log(response.data.login)

                if (response.data.login) {
                    login()
                    setUser(usernameRef.current)
                    navigate(-1)
                } else {
                    // Notif -> Unsuccessful login
                }

            })
            .catch(function (error) {
                // handle error
                console.log(error);
                setIsLoggingIn(false)
            })
            .finally(function () {
                // always executed
            });

    }


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
                            onChange={(e) => { handleChangeUsername(e) }}
                        />

                        <TextInput
                            id="password"
                            type="text"
                            labelText="Password (Email)"
                            ref={passwordRef}
                            onChange={(e) => { handleChangePassword(e) }}
                        />

                        {isLoggingIn ?
                            <ButtonSkeleton></ButtonSkeleton>
                            :
                            <Button onClick={(e) => handleLogin(e)}>Login</Button>
                        }


                    </Stack>
                </Form>

            </div>
        </div>
    )

}

export default Login