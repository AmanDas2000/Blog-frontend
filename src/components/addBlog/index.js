import React, { useState,useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './style.css'
import { UserContext } from '../../App'



function AddBlog() {
    const history = useHistory()
    const { state, dispatch } = useContext(UserContext)
    const [title,setTitle] = useState("")
    const [content,setContent] = useState("")
    

    
    const PostData = () => {
        const token = localStorage.getItem('jwt'); 
        fetch("http://localhost:7000/api/blog/add", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${token}`
            },
            body: JSON.stringify({
               title,
               content,
               user:state._id
            })
        }).then(res => res.json())
                .then(data => {
                    if (data.error) { 
                        //M.toast({html: data.error, classes:"#e57373 red"})
                    }
                    else {
                        //M.toast({ html: data.message, classes: "#43a047 green darken-1" })
                        //history.push('/signin')
                        console.log(data);
                    }
                }).catch(err => {
                    console.log(err)
                })
        history.push('/profile')
        history.go(0);
        }

    return (
        <div className="mycard" style={{
            marginBottom:"18rem"
        }}>
            
            <div className="card addcard ">
                <h2>Write your Blog</h2>
                <div>
                <input 
                    
                    type='text'
                    placeholder='Title'
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                />
                <textarea
                    className="textArea"
                    type='text'
                    placeholder='Content'
                    value={content}
                    onChange={(e)=>setContent(e.target.value)}
                />
                </div>
                
                <button className="waves-effect waves-light btn-large #1b5e20 green darken-1"
                onClick={()=>PostData()}>
                    Add blog
                </button>
                <button className="waves-effect waves-light btn-large grey"><Link to="/profile">cancel</Link></button>
                
            </div>
        </div>
    )
}

export default AddBlog
