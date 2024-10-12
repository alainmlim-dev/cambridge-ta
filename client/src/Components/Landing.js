import React, { useContext, useEffect } from 'react';
import { AuthContext } from "../App";
import { useNavigate } from 'react-router';


const Landing = () => {

    const navigate = useNavigate()
    const { isLoggedIn } = useContext(AuthContext)


    useEffect(() => {

        if(!isLoggedIn) {
            navigate('/login')
        } 

    }, [isLoggedIn, navigate]) 


    return (
        <div className='main'>
            <div className='content'>
                <h1>Articles</h1>
            </div>
        </div>
    )

}

export default Landing