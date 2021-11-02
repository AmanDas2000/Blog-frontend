import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './style.css'



function Signup() {
    const history=useHistory()
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [bio,setBio] = useState("")
    const [password,setPassword] = useState("")
    const [email, setEmail] = useState("")
    
    const PostData = () => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            //M.toast({ html: "invalid email", classes: "#e57373 red" })
            return;
        }
        // if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password)) {
        //      //M.toast({ html: "password should contain atleast one number and atleast one special charecter", classes: "#e57373 red" })
        //      return;
        //  }
        fetch("http://localhost:7000/api/user/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
               firstName,
               lastName,
               email,
               password,
               bio,
            })
        }).then(res => res.json())
                .then(data => {
                    if (data.error) { 
                        //M.toast({html: data.error, classes:"#e57373 red"})
                    }
                    else {
                        //M.toast({ html: data.message, classes: "#43a047 green darken-1" })
                        history.push('/signin')
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
            
            <div className="card auth-card ">
                <h2>Blog.GG</h2>
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
                
                <textarea
                    
                    type='text'
                    style ={{margin:"0px 0px 0px 8px",minHeight:'80px'}}
                    placeholder='Bio'
                    value={bio}
                    onChange={(e)=>setBio(e.target.value)}
                />
                </div>
                
                <input
                    
                    type='text'
                    placeholder='Email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <input
                    
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button className="waves-effect waves-light btn #1b5e20 green darken-1"
                onClick={()=>PostData()}>
                    Sign up
                </button>
                <h5>
                    <Link to="/signin">Already have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signup
