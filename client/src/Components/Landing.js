import React, { useContext, useEffect } from 'react';
import { AuthContext } from "../App";
import { useNavigate } from 'react-router';


const Landing = () => {

    const navigate = useNavigate()
    const { isLoggedIn, login } = useContext(AuthContext)


    useEffect(() => {

        if(
            (!isLoggedIn) && 
            (localStorage.getItem("isLoggedIn") === null)
        ) {
            navigate('/login')
        } else {
            login()
        }
        

    }, [isLoggedIn, login, navigate]) 

    useEffect(() => {
        console.log(isLoggedIn)
        console.log(localStorage.getItem("isLoggedIn"))
    })


    return (
        <div className='main'>
            <div className='content'>
                <h1>Landing</h1>
            </div>
        </div>
    )

}

export default Landing