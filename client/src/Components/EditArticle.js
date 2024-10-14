import React, { useEffect, useState, useContext, useRef } from 'react';
import { Breadcrumb, BreadcrumbItem, Form, Stack, TextInput, TextArea, Button, ButtonSkeleton, Loading } from '@carbon/react';
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import { AuthContext } from "../App";
import { UpdateNow } from '@carbon/icons-react';


const EditArticle = () => {

    let navigate = useNavigate()
    let location = useLocation()
    const { isLoggedIn } = useContext(AuthContext)
    const [isPosting, setIsPosting] = useState(false)
    const [articleData, setArticleData] = useState({ title: "", body: "" })
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [isLoading, setIsLoading] = useState(true)


    const handleChangeTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleChangeBody = (e) => {
        setBody(e.target.value)
    }

    const handleUpdate = (e) => {

        e.preventDefault()
        setIsPosting(true)

        var data = {
            "id": location.state.id,
            "title": title,
            "body": body,
        }

        console.log(data)

        axios.put(process.env.REACT_APP_API_UPDATEARTICLE, data, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
        })
            .then(({ data }) => {

                setIsPosting(false)
                navigate('/articles/' + location.state.id, {state:{id: location.state.id}})

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

            axios.get(process.env.REACT_APP_API_GETARTICLE, {
                headers: {
                    "id": location.state.id
                }
            })
                .then(function (response) {

                    setTitle(response.data.title)
                    setBody(response.data.body)
                    setIsLoading(false)

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
                    <BreadcrumbItem href="#"><span>Edit</span></BreadcrumbItem>
                </Breadcrumb>

                <h1>Edit article</h1>

                <hr />

                {isLoading ?
                    <Loading />
                    :
                    <div className='new-article'>
                        <Form aria-label="new-article">
                            <Stack gap={7}>

                                <TextInput
                                    id="new-article-title"
                                    type="text"
                                    labelText="Title"
                                    autoFocus
                                    value={title}
                                    onChange={(e) => { handleChangeTitle(e) }}
                                />

                                <TextArea
                                    id="new-article-body"
                                    labelText="Body"
                                    rows={5}
                                    value={body}
                                    onChange={(e) => { handleChangeBody(e) }}
                                />

                                {isPosting ?
                                    <ButtonSkeleton></ButtonSkeleton>
                                    :
                                    <Button
                                        renderIcon={UpdateNow}
                                        onClick={(e) => handleUpdate(e)}
                                    >Update
                                    </Button>
                                }



                            </Stack>
                        </Form>
                    </div>
                }




            </div>
        </div>

    )

}

export default EditArticle