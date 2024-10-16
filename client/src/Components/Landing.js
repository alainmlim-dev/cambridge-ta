import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../App";
import { useNavigate } from 'react-router';
import { useQuery } from "react-query";
import { Search, Dropdown, Loading } from '@carbon/react';
import { useDebounce } from "@uidotdev/usehooks";


const fetchArticles = async (searchStr, searchField) => {
    const res = await fetch(process.env.REACT_APP_API_ARTICLES, {
        "headers": {
            "query": searchStr,
            "field": searchField
        }
    });
    return res.json();
};

const items = ["userId", "Id", "Title"]


const Landing = () => {

    const navigate = useNavigate()
    const [currentItem, setCurrentItem] = useState(items[2]);

    const [filter, setFilter] = useState("")
    const debouncedFilter = useDebounce(filter, 500)

    const { isLoggedIn, login, setUser } = useContext(AuthContext)
    const { data, status } = useQuery([debouncedFilter], 
        () => fetchArticles(debouncedFilter, currentItem)
    );
    const [articleCount, setArticleCount] = useState(0)
    


    const getArticles = (articleCount) => {

        const arr = []
        for (let i = 0; i < articleCount; i++) {
            arr.push(
                <div key={i} onClick={() => { navigate('/articles/' + data[i].id, { state: { id: data[i].id } }) }}>
                    <h3>{data[i].title}</h3>
                    <p>{data[i].body}</p>
                </div>
            )
        }
        return arr;

    }

    const handleSearch = (e) => {
        setFilter(e.target.value)
    }


    useEffect(() => {

        if (JSON.parse(localStorage.getItem("isLoggedIn"))) {
            login()
            setUser(localStorage.getItem("user"))
        } else {
            navigate('/login')
        }

    }, [isLoggedIn, navigate, login, setUser])


    useEffect(() => {

        if (data !== undefined) {
            setArticleCount(data.length)
        } else {
            setArticleCount(0)
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
                        onKeyDown={(e) => {
                            if (e.key === "Enter")
                                handleSearch(e);
                            }}
                    />
                    <Dropdown
                        id="search-dropdown"
                        className='search-dropdown'
                        initialSelectedItem={items[2]}
                        label="Option 1"
                        items={items}
                        itemToString={item => item ? item : ''}
                        onChange={({ selectedItem }) => setCurrentItem(selectedItem)}
                        selectedItem={currentItem}
                    />

                </div>

                <hr />

                {status === "loading" &&  <Loading /> }

                <div className='articles'>

                    {status === "error" && <p>Error fetching data</p>}
                    {status === "success" && getArticles(articleCount)}
                    {articleCount === 0 && 
                        <p>No article found</p>
                    }

                </div>

            </div>
        </div>
    )

}

export default Landing