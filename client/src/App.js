import React,{useContext,useEffect, createContext, useReducer} from 'react';
import {BrowserRouter,Route,useHistory} from 'react-router-dom'
import Navbar from './components/navbar'
import Home from './slides/Home';
import Profile from './slides/Profile';
import Login from './slides/Login';
import Signup from './slides/Signup';
import Createpost from './slides/Createpost';
import { initialstate,reducer } from './Reducers/userreducer';

export const UserContext = createContext();
const Efficient =() =>{
  const history = useHistory();
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))
    
    if(user){
      dispatch({type:"USER",payload:user})
    }
      else
      history.push('/login')
  },[])
  return(
    <div>
    <Route exact path="/" component={Home} />
    <Route exact path="/profile" component={Profile} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/create" component={Createpost} />
    </div>
  )
}
function App() {
  const [state,dispatch]=useReducer(reducer,initialstate)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
   <div>
     <Navbar />
    <Efficient />
   </div>
   </BrowserRouter>
   </UserContext.Provider>
  );
}

export default App;
