import React, { useEffect, useState } from 'react';
import { Breadcrumb, BreadcrumbItem } from '@carbon/react';
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';


const ViewArticle = () => {

    let navigate = useNavigate()
    let location = useLocation()
    const [articleData, setArticleData] = useState({title: "", body: ""})

    useEffect(() => {

        if (location.state.id !== undefined) {

            console.log(location.state.id)

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



    }, [location])


    return (
        <div className='main'>
            <div className='content'>

                <Breadcrumb>
                    <BreadcrumbItem style={{ cursor: "pointer" }} onClick={() => navigate('/')}>Articles</BreadcrumbItem>
                    <BreadcrumbItem href="#"><span>{articleData.title}</span></BreadcrumbItem>
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