import React, { useEffect, useContext, useState } from 'react'
import { UserContext } from '../../App'
import { Link, useHistory } from 'react-router-dom'
import './style.css'



function EditUser() {
    const history = useHistory()
    const { state, dispatch } = useContext(UserContext)

    
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [bio, setBio] = useState("")
    const [id, setId] = useState("")
    
    useEffect(() => {
        setFirstName(state?.firstName)
        setLastName(state?.lastName)
        setBio(state?.bio)
        setId(state?._id)
    }, [state])
    
    const token = localStorage.getItem('jwt');
    const PostData = () => {
        
        fetch("http://localhost:7000/api/user/update", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${token}`
            },
            body: JSON.stringify({
               firstName,
               lastName,
                bio,
               id
            })
        }).then(res => res.json())
                .then(data => {
                    if (data.error) { 
                        //M.toast({html: data.error, classes:"#e57373 red"})
                    }
                    else {
                        dispatch({ type: "USER", payload: data.user })
                        //M.toast({ html: data.message, classes: "#43a047 green darken-1" })
                        history.push('/profile')
                        //console.log(data);
                    }
                }).catch(err => {
                    console.log(err)
                })
        }

    return (
        <div className="mycard" style={{
            marginBottom:"18rem"
        }}>
            
            <div className="card edit-card ">
                <h4>Edit Profile</h4>
                <div style={{display : "flex"}}>
                <input 
                    
                    type='text'
                    placeholder='First Name'
                    value={firstName}
                    onChange={(e)=>setFirstName(e.target.value)}
                />
                <input
                    
                    type='text'
                    placeholder='Last Name'
                    value={lastName}
                    onChange={(e)=>setLastName(e.target.value)}
                />
                </div>
                <div style={{display : "flex"}}>
                <p 
                
                style={{margin:"6px 2px 2px 0px"}}>
                    <h6>Bio</h6>
                </p>
                <textarea
                    type='text'
                    style ={{margin:"0px 0px 0px 8px",minHeight:"150px"}}
                    placeholder='n00b'
                    value={bio}
                    onChange={(e)=>setBio(e.target.value)}
                />
                </div>
                <br/>
                <button className="waves-effect waves-light btn #1b5e20 green darken-1"
                onClick={()=>PostData()}>
                    Update
                </button>
                
                <button className="waves-effect waves-light btn grey"><Link to="/profile">cancel</Link></button>
                
            </div>
        </div>
    )
}

export default EditUser
