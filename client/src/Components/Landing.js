import React, { useContext, useEffect } from 'react';
import { AuthContext } from "../App";
import { useNavigate } from 'react-router';


const Landing = () => {

    const navigate = useNavigate()
    const { isLoggedIn } = useContext(AuthContext)

    useEffect(() => {

        console.log('Landing useEffect')

        if (!isLoggedIn) {
            navigate('/login')
        }

    }, []) //eslint-disable-line

    return (
        <div className='main'>
            <div className='content'>
                <h1>Landing</h1>
            </div>
        </div>
    )

}

export default Landing