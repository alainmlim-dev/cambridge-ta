import React, { useContext, useEffect } from 'react';
import { AuthContext } from "../App";
import { useNavigate } from 'react-router';
import axios from 'axios';


const Landing = () => {

    const navigate = useNavigate()
    const { isLoggedIn } = useContext(AuthContext)

    const fetchArticles = () => {

        axios.get(process.env.REACT_APP_API_ARTICLES, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
        })
            .then(({ data }) => {
                console.log(data)
            },
                error => {
                    console.log(error);
                }
            );

    }


    useEffect(() => {

        if (!isLoggedIn) {
            navigate('/login')
        } else {
            fetchArticles()
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