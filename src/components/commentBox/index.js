import React, { useState,useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './style.css'
import { UserContext } from '../../App'



function CommentBox({blogId}) {
    const history = useHistory()
    const { state, dispatch } = useContext(UserContext)
    
    const [content,setContent] = useState("")
    console.log(blogId)

    
    const PostData = () => {
        const token = localStorage.getItem('jwt'); 
        fetch("http://localhost:7000/api/comment/add", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${token}`
            },
            body: JSON.stringify({
               blogId,
               content,
               userId:state._id
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
        history.push('/')
        history.go(0);
        }

    return (
        <div className="mycard" style={{
            marginBottom:"1rem"
        }}>
            
            <div className="card addcard ">
                
                <div>
                
                <input
                    type='text'
                    placeholder='Content'
                    value={content}
                    onChange={(e)=>setContent(e.target.value)}
                />
                </div>
                
                <button className="waves-effect waves-light btn-large #1b5e20 green darken-1"
                onClick={()=>PostData()}>
                    Add Comment
                </button>
                <button className="waves-effect waves-light btn-large grey" onClick={() => {
                    history.go(0)
                }}>cancel</button>
                
            </div>
        </div>
    )
}

export default CommentBox
