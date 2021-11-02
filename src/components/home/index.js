import React, { useEffect, useContext, useState } from 'react'
import { UserContext } from '../../App'
import './style.css'
import Blog from '../blog'

function Home() {

    const { state, dispatch } = useContext(UserContext)
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        if (state) {
            fetch(`http://localhost:7000/api/blog/get`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(res => res.json())
                .then(data => {
                    if (data.error) {
                        console.log(data.error)
                    }
                    else {
                        //console.log(data);
                        setBlogs(data.blogs)
                    }
                }).catch(err => {
                    console.log(err)
                })
        }


    }, [state])
    const home = true;

    function reverseArr(input) {
        var ret = new Array;
        for(var i = input.length-1; i >= 0; i--) {
            ret.push(input[i]);
        }
        return ret;
    }
    const renderBlogs = (arr) => {
        const token = localStorage.getItem('jwt');
        const rev=reverseArr(arr)
        return rev.map(e => (
            <Blog
                title={e.title}
                content={e.content}
                likes={e.likes}
                userId={state._id}
                blogId={e._id}
                token={token}
                home={home}
                user={e.user.firstName + " " + e.user.lastName}
            />
        ))
    }
    return (
        <div>
            <div className="home">
                Latest Blogs
            </div>
            {
                blogs.length
                    ?
                    renderBlogs(blogs)
                    :
                    <div>'LOADING'</div>
            }
        </div>
    )
}

export default Home
