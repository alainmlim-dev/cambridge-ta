import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../App";
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useQuery } from "react-query";
import { Search, Dropdown } from '@carbon/react';



const fetchArticles = async () => {
    const res = await fetch(process.env.REACT_APP_API_ARTICLES);
    return res.json();
};




const Landing = () => {

    const navigate = useNavigate()
    const { isLoggedIn } = useContext(AuthContext)
    const { data, status } = useQuery("articles", fetchArticles);
    const [articleCount, setArticleCount] = useState(0)

    const items = ["userId", "Id", "Title"]


    const handleSearch = () => {
        //onEnterkey
    }

    useEffect(() => {

        if (!isLoggedIn) {
            navigate('/login')
        }

    }, [isLoggedIn, navigate])

    useEffect(() => {
        console.log(data)
    }, [data])


    return (

        <div className='main'>
            <div className='content'>
                <h1>Articles</h1>

                <div className='search-filter'>
                    <Search 
                        className='search'
                        size="lg" 
                        placeholder="Search" 
                        labelText="Search" 
                        closeButtonLabelText="Clear search input" 
                        id="search-1" 
                        onKeyDown={() => {handleSearch()}} 
                    />
                    <Dropdown 
                        id="search-dropdown" 
                        className='search-dropdown'
                        initialSelectedItem={items[0]} 
                        label="Option 1" 
                        items={items} 
                        itemToString={item => item ? item : ''} 
                    />
                </div>

                <hr />

                <div className='articles'>

                    <div>
                        <h3>Sed venenatis metus non commodo ullamcorper</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum, lectus at vehicula porttitor, felis dolor accumsan dui, et finibus neque eros ac purus. Ut eget aliquet neque, id aliquet erat. Phasellus eget fringilla mi. In convallis sapien non semper vulputate. Vivamus et nulla non velit maximus aliquet non sed eros. Sed elementum quis lorem ac ultricies. Aenean luctus, justo vel dignissim lobortis, odio enim suscipit tortor, quis euismod dui nunc ut neque.</p>
                    </div>
                    <div>
                        <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum, lectus at vehicula porttitor, felis dolor accumsan dui</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum, lectus at vehicula porttitor, felis dolor accumsan dui, et finibus neque eros ac purus. Ut eget aliquet neque, id aliquet erat. Phasellus eget fringilla mi. In convallis sapien non semper vulputate. Vivamus et nulla non velit maximus aliquet non sed eros. Sed elementum quis lorem ac ultricies. Aenean luctus, justo vel dignissim lobortis, odio enim suscipit tortor, quis euismod dui nunc ut neque.</p>
                    </div>
                    <div>
                        <h3>Aenean luctus, justo vel dignissim lobortis, odio enim suscipit tortor, quis euismod dui nunc ut neque.</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum, lectus at vehicula porttitor, felis dolor accumsan dui, et finibus neque eros ac purus. Ut eget aliquet neque, id aliquet erat. Phasellus eget fringilla mi. In convallis sapien non semper vulputate. Vivamus et nulla non velit maximus aliquet non sed eros. Sed elementum quis lorem ac ultricies. Aenean luctus, justo vel dignissim lobortis, odio enim suscipit tortor, quis euismod dui nunc ut neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum, lectus at vehicula porttitor, felis dolor accumsan dui, et finibus neque eros ac purus. Ut eget aliquet neque, id aliquet erat. Phasellus eget fringilla mi. In convallis sapien non semper vulputate. Vivamus et nulla non velit maximus aliquet non sed eros. Sed elementum quis lorem ac ultricies. Aenean luctus, justo vel dignissim lobortis, odio enim suscipit tortor, quis euismod dui nunc ut neque.</p>
                    </div>

                </div>

                {/* {status === "error" && <p>Error fetching data</p>}
                {status === "loading" && <p>Fetching data...</p>}
                {status === "success" && (
                    <div>
                        {data.map((user) => (
                            <p key={user.id}>{user.name}</p>
                        ))}
                    </div>
                )} */}

            </div>
        </div>

    )

}

export default Landing