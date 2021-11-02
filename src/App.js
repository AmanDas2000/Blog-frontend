import './App.css';
import React, { useEffect, createContext, useReducer, useContext } from 'react';
import { reducer, initialState } from './reducer'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import Signup from './components/signup/index';
import Signin from './components/signin';
import Home from './components/home';
import Navbar from './components/navbar';
import Profile from './components/profile';
import AddBlog from './components/addBlog';
import EditUser from './components/editUser';

export const UserContext = createContext()


const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
      history.push('/signin')
    }
  },[])
  return(
    <Switch>
      <Route exact path="/" >
      <Home />
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/add">
        <AddBlog />
      </Route>
      <Route path="/edit">
        <EditUser />
      </Route>
    </Switch>
  )
}


function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Navbar/>
        <Routing/>
        
      </Router>


    </UserContext.Provider>
  );
}

export default App;
