import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Link} from 'react-router-dom'
import '../App.css'
import M from 'materialize-css'
const Signup = () => {
  const history = useHistory()
   const [name,setName]=useState("")
   const [email,setEmail]=useState("")
   const [password,setPassword]=useState("")
   const postdata =()=>{
     fetch("/signup",
     {
       method:"post",
       headers:{
         "Content-Type":"application/json"
       },
       body :JSON.stringify({
         name : name,
         password:password,
         email:email
       })
     }
     ).then(res=>res.json()).then(data=>{
       if(data.error){
        M.toast({html: data.error, classes: 'rounded'});
       }
       else{
       M.toast({html: data.message, classes: 'rounded'});
       history.push('/login')
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
            placeholder="Name"
            value={name} onChange={(e)=>setName(e.target.value)}/>
            <input type="text"
            placeholder="email"
            value={email} onChange={(e)=>setEmail(e.target.value)} />
              <input type="text"
            placeholder="password" 
            value={password} onChange={(e)=>setPassword(e.target.value)}/>
             <button className="btn waves-effect waves-light" onClick={postdata} >Signup</button>
             <h6><pre>Already have an account ? <Link to="/login">Login</Link></pre></h6>
            </div>
            
            </div>
         
     );
}
 
export default Signup;