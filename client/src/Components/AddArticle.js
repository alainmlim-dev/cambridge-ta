import React, { useEffect, useState, useContext, useRef } from 'react';
import { Breadcrumb, BreadcrumbItem, Form, Stack, TextInput, TextArea, Button, ButtonSkeleton } from '@carbon/react';
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import { AuthContext } from "../App";
import { Add } from '@carbon/icons-react';


const AddArticle = () => {

    let navigate = useNavigate()
    let location = useLocation()
    const { isLoggedIn, username } = useContext(AuthContext)
    const titleRef = useRef("")
    const bodyRef = useRef("")
    const [isPosting, setIsPosting] = useState(false)


    const handleChangeTitle = (e) => {
        titleRef.current = e.target.value
    }

    const handleChangeBody = (e) => {
        bodyRef.current = e.target.value
    }

    const handlePost = (e) => {

        e.preventDefault()
        setIsPosting(true)

        var data = {
            "title": titleRef.current,
            "body": bodyRef.current,
        }

        axios.post(process.env.REACT_APP_API_POSTARTICLE, data, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
        })
            .then(({ data }) => {

                setIsPosting(false)
                navigate('/')

            },
                error => {
                    console.log(error);
                }
            );

    }


    useEffect(() => {

        if (!isLoggedIn) {
            navigate('/login')
        }

    }, [isLoggedIn, navigate])



    return (

        <div className='main'>
            <div className='content'>

                <Breadcrumb>
                    <BreadcrumbItem onClick={() => navigate('/')}>Articles</BreadcrumbItem>
                    <BreadcrumbItem href="#"><span>Add new article</span></BreadcrumbItem>
                </Breadcrumb>

                <h1>New article</h1>

                <hr />

                <div className='new-article'>
                    <Form aria-label="new-article">
                        <Stack gap={7}>

                            <TextInput
                                id="new-article-title"
                                type="text"
                                labelText="Title"
                                autoFocus
                                ref={titleRef}
                                onChange={(e) => { handleChangeTitle(e) }}
                            />

                            <TextArea
                                id="new-article-body"
                                labelText="Body"
                                rows={5}
                                ref={titleRef}
                                onChange={(e) => { handleChangeBody(e) }}
                            />

                            {isPosting ? <ButtonSkeleton></ButtonSkeleton> :
                                <Button
                                    renderIcon={Add}
                                    onClick={(e) => handlePost(e)}
                                >Post
                                </Button>
                            }



                        </Stack>
                    </Form>
                </div>


            </div>
        </div>

    )

}

export default AddArticle