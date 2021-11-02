import React, { useEffect, useContext, useState } from 'react'
import { UserContext } from '../../App'
import Blog from '../blog';
import { Link, useHistory } from 'react-router-dom'
import './style.css'

function Profile() {
    const history = useHistory()
    const [blogs, setBlogs] = useState([]);
    const { state, dispatch } = useContext(UserContext)
    useEffect(() => {
        if (state) {
            const { _id } = state;
            fetch(`http://localhost:7000/api/blog/get/${_id}`, {
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

    function reverseArr(input) {
        var ret = new Array;
        for(var i = input.length-1; i >= 0; i--) {
            ret.push(input[i]);
        }
        return ret;
    }

    const renderBlogs = (arr) => {
        const token = localStorage.getItem('jwt');
        //console.log(arr)
        const rev = reverseArr(arr);
        return rev.map(e => (
            <Blog
                title={e.title}
                content={e.content}
                likes={e.likes}
                userId={state._id}
                blogId={e._id}
                token={token}
                user={e.user.firstName+" "+e.user.lastName}
            />
        ))
    }


    return (
        <div>
            <div>
                <div style={{
                    display: "flex",
                    justifyContent: "space-around",
                    margin: "18px 0px",
                    borderBottom: "1px solid grey"
                }}>
                    <div style={{ margin: '45px' }}>
                        <img //class="dp"
                            style={{ width: "160px", height: "160px", borderRadius: "80px",border:"1px solid grey" }}
                            src={state?.photo, `https://robohash.org/${state?.firstName}?size=200x200`}
                        />
                    </div>
                    <div>

                        <h4>{state?.firstName} {state?.lastName} <Link to="/edit"><i className="fa fa-edit edit"></i></Link></h4>
                        
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "90%",

                        }}>
                            <p>{state?.bio}</p>


                        </div>
                        
                        <div onClick={() => history.push('/add')}>
                        
                            
                            <i className='fa fa-plus add'> Write a Blog</i>
                        </div>

                    </div>
                </div>
            </div>
            <div>
                {renderBlogs(blogs)}
            </div>
        </div>
    )
}

export default Profile
