import React,{useState,useContext} from 'react'
import {UserContext} from '../../src/App'
import {Link,useHistory} from 'react-router-dom'
import '../App.css'
import M from 'materialize-css'
const Login = () => {
    const {state,dispatch}=useContext(UserContext)
    const history = useHistory()
     const [email,setEmail]=useState("")
     const [password,setPassword]=useState("")
     const postdata =()=>{
       fetch("/signin",
       {
         method:"post",
         headers:{
           "Content-Type":"application/json"
         },
         body :JSON.stringify({
           password:password,
           email:email
         })
       }
       ).then(res=>res.json()).then(data=>{
         console.log(data)
         if(data.error){
          M.toast({html: data.error, classes: 'rounded'});
         }
         else{
         localStorage.setItem("jwt",data.token)
         localStorage.setItem("user",JSON.stringify(data.user))
         dispatch({type:"USER",payload:data.user})
         M.toast({html:"successfully signed in", classes: 'rounded'});
         history.push('/')
         }
       }).catch(err=>{
         console.log(err);
       })
     }
    return ( 
        <div className="myc">
          <div className="card auth-card">
           <h2>Myapp</h2>
            <input type="text"
            placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
              <input type="text"
            placeholder="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
             <button className="btn waves-effect waves-light" onClick={postdata} >Login</button>
             <h6><pre>Don't have an account ? <Link to="/signup">Signup</Link></pre></h6>
            </div>
            </div>
         
     );
}
 
export default Login;