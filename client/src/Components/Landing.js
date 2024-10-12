import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../App";
import { useNavigate } from 'react-router';
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

    const getArticles = (articleCount) => {
        const arr = []
        for (let i = 0; i < articleCount; i++) {
            arr.push(
                <div key={i} onClick={() => {navigate('/articles/' + data[i].id)}}>
                    <h3>{data[i].title}</h3>
                    <p>{data[i].body}</p>
                </div>
            )
        }
        return arr;
    }


    const handleSearch = () => {
        //onEnterkey
    }

    useEffect(() => {

        if (!isLoggedIn) {
            navigate('/login')
        }

    }, [isLoggedIn, navigate])

    useEffect(() => {

        if (data !== undefined) {
            setArticleCount(data.length)
        }
        
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
                        onKeyDown={() => { handleSearch() }}
                    />
                    <Dropdown
                        id="search-dropdown"
                        className='search-dropdown'
                        initialSelectedItem={items[2]}
                        label="Option 1"
                        items={items}
                        itemToString={item => item ? item : ''}
                    />
                </div>

                <hr />

                <div className='articles'>

                    {/* {status === "error" && <p>Error fetching data</p>}
                    {status === "loading" && <p>Fetching data...</p>} */}
                    
                    {status === "success" && getArticles(articleCount)}


                </div>



            </div>
        </div>

    )

}

export default Landing