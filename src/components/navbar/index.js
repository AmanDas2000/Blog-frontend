import React, { useContext, useRef, useEffect, useState } from 'react'
import {UserContext} from '../../App'
import { Link, useHistory } from 'react-router-dom'
import './style.css'

function Navbar() {
  const history = useHistory()
  const { state, dispatch } = useContext(UserContext)
  const renderList = () => {
    if (state) {
      return [
        <li><Link className="link" to="/">Home</Link></li>,
        <li><Link className="link" to="/profile">{state.firstName}'s Profile</Link></li>,
       
        <li>
             <button className="logout waves-effect waves-light #c62828 red darken-3 btn-small"
            onClick={()=>{
              localStorage.clear()
              dispatch({type:"CLEAR"})
              history.push('/signin')
            }}
            >
                Logout
            </button>
            </li>
      ]
    } else {
      return [
        <li><Link className="link" to="/signin">Sign in</Link></li>,
        <li><Link className="link" to="/signup">Sign up</Link></li>
      ]
    }
  }
    return (
    <nav>
    <div className="nav-wrapper white">
      <Link to={state?"/":"/signin"} className="brand-logo left">Blog.GG</Link>
          <ul id="nav-mobile" className="right">
        {renderList()}
      </ul>
    </div>
            
    </nav> 
        
    )
}

export default Navbar