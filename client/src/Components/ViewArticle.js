import React, { useEffect, useState, useContext } from 'react';
import { Breadcrumb, BreadcrumbItem } from '@carbon/react';
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import { AuthContext } from "../App";


const ViewArticle = () => {

    let navigate = useNavigate()
    let location = useLocation()
    const [articleData, setArticleData] = useState({ title: "", body: "" })
    const { isLoggedIn } = useContext(AuthContext)


    useEffect(() => {

        if (!isLoggedIn) {
            navigate('/login')
        } else {

            axios.get(process.env.REACT_APP_API_GETARTICLE, {
                headers: {
                    "id": location.state.id
                }
            })
                .then(function (response) {

                    setArticleData({
                        title: response.data.title,
                        body: response.data.body
                    })

                })
                .catch(function (error) {
                    console.log(error);
                })

        }

    }, [isLoggedIn, navigate, location])


    return (

        <div className='main'>
            <div className='content'>

                <Breadcrumb>
                    <BreadcrumbItem onClick={() => navigate('/')}>Articles</BreadcrumbItem>
                    <BreadcrumbItem href="#"><span>{location.state.id}</span></BreadcrumbItem>
                </Breadcrumb>

                <article>
                    <h1>{articleData.title}</h1>
                    <p>{articleData.body}</p>
                </article>

            </div>
        </div>

    )

}

export default ViewArticle