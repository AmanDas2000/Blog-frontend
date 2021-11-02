import React, { useEffect, useState } from 'react'
import EditBlog from '../editBlog'
import './style.css'
import Comment from '../comment';
import { Link, useHistory } from 'react-router-dom'
import { addComment } from '@babel/types';
import CommentBox from '../commentBox';


function Blog({ title, content, likes, userId, blogId, token, home,user }) {
    const history = useHistory()
    const [comment, setComment] = useState([]);
    const [like, setLike] = useState(false)
    const [flag, setFlag] = useState(false)
    const [flagDel, setFlagDel] = useState(false)
    const [likeCount, setLikeCount] = useState(likes.length)
    const [commentFlag, setCommentFlag] = useState(false)
    useEffect(() => {
        fetch(`http://localhost:7000/api/blog/ifliked`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                userId,
                blogId,
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setLike(data.flag);

                }
            }).catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:7000/api/comment/get/${blogId}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    
                    setComment(data.comments);
                    

                }
            }).catch(err => {
                console.log(err)
            })
    }, [])

    const clickHandler = () => {
        fetch(`http://localhost:7000/api/blog/like`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                userId,
                blogId,
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setLike(data.flag);
                    if (data.flag) {
                        setLikeCount(likeCount+1)
                    } else {
                        setLikeCount(likeCount-1)
                    }
                    

                }
            }).catch(err => {
                console.log(err)
            })
    }

    const deleteBlog = (blogId) => {
        fetch(`http://localhost:7000/api/blog/delete/${blogId}`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    console.log(data)
                    setFlagDel(false);

                }
            }).catch(err => {
                console.log(err)
            })
        history.go(0);
    }

    const renderEditBlog = (blogId, title, content) => {
        if (flag) {
            return <EditBlog blogId={blogId} title={title} content={content} />
        }
        else if (flagDel) {
            return <div className="card blog">
                <h4>Confirm delete blog?</h4><br/>
                <button className="waves-effect waves-light btn red lighten-1" onClick={()=>deleteBlog(blogId)}>
                    Yes
                </button>
                <button className="waves-effect waves-light btn #1b5e20 green darken-1" onClick={()=>setFlagDel(false)}>
                    No
                </button>

        </div>
        }
        else {
            return null
        }

    }

    const addComment = () => {
        setCommentFlag(true);
    }

    const renderAddComment = () => {
        if (commentFlag) {
            return <CommentBox blogId={blogId}/>
        } else return null;
    }

    


    return (!flag&&!flagDel) ? (
        <div className="card blog">
            <h2>{title}</h2>
            <h5>By { user}</h5>
            <p style={{fontSize:"20px",marginBottom:'20px'}}>{content}</p>
            <h2 onClick={clickHandler}>{
                like ?
                    <i className="fa fa-heart"><p className="likeCount">{likeCount}</p></i>
                    : <i className="fa fa-heart-o"><p className="likeCount">{likeCount}</p></i>
            }</h2>
            
            <h5>Comments</h5>
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
                marginBottom:'10px'
            }}>
            
                <Comment comments={comment} />
            </div>
            {renderAddComment()}
            <i className='fa fa-plus add' onClick={() => {
                addComment()
            }}> Comment</i>
            
            {!home ?
                <div>
                    
                    <button
                        className="waves-effect waves-light btn-large #1b5e20 green darken-1"
                        onClick={() => setFlag(true)}>
                        Edit
                    </button>
                    <button className="waves-effect waves-light btn-large #9e9e9e grey"
                        onClick={() => setFlagDel(true)}>
                        Delete
                    </button>
                </div>
                : null
            }

        </div >
    ) :
        (renderEditBlog(blogId, title, content))


}

export default Blog
