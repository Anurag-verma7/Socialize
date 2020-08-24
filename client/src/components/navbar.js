import React,{useContext} from 'react';
import { Link,useHistory} from 'react-router-dom';
import { UserContext } from '../App';

const Navbar = ()=>{
  const {state,dispatch}=useContext(UserContext)
  const history =useHistory();
  const loggingout =() =>{
    localStorage.clear();
    dispatch({type:"CLEAR"})
    history.push("/login")

  }
  const Smart =()=>{
    if(state){
      return [
        <li><Link to ="/profile" style ={{color:"black"}}>Myprofile</Link></li>,
        <li><Link to ="/create" style ={{color:"black"}}>Createpost</Link></li>,
        <li> <button className="btn waves-effect waves-light" onClick={loggingout} >Logout</button></li>,
        ]
      
    }
    else{
      return [
         <li><Link to ="/login" style ={{color:"black"}}>Login</Link></li>,
        <li><Link to="/signup" style ={{color:"black"}}>Signup</Link></li>
      ]
    }
  }
return(
    <nav>
    <div className="nav-wrapper white">
      <Link to= {(state)?"/":"/login"} className="brand-logo left" style ={{color:"black"}}>Logo</Link>
      <ul id="nav-mobile" className="right">
         {Smart()}
      </ul>
    </div>
  </nav>
);
}
export default Navbar;