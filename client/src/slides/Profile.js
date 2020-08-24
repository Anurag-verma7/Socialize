import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../App';
import '../App.css'
const Profile = () => {
    const[pics,setPics]=useState([]);
    const{state,dispatch}=useContext(UserContext)
    useEffect(()=>{
          fetch("/mypost",{
              headers:{
                  "Authorization" :"Bearer "+localStorage.getItem("jwt")
              }
          }).then(res=>res.json()).then((results=>{
              setPics(results.mypost)
          }))
    },[])
    return ( 
      <div style={{maxWidth:"700px",margin:"0px auto"}}>
          <div style={{display:"flex",margin:"18px 0px",borderBottom:"1px solid black",justifyContent:"space-around"}}>
            
              <div className="trial">
              <div className="row">
    <div className="col s12 m7">
      <div className="card" style={{width:"200px",height:"200px",borderRadius:"100%"}}>
        <div className="card-image" style={{textAlign:"center"}}>
          <img style={{width:"200px",height:"200px",borderRadius:"100%"}} src="https://images.unsplash.com/photo-1533134486753-c833f0ed4866?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
          <h1 className="card-title" style={{marginBottom:"60px",marginLeft:"65px",fontSize:"50px"}}><b>{(state)?JSON.stringify(state.name)[1]:"loading"}</b></h1>
        </div>
       
      
      </div>
    </div>
  </div>
            
                 
              </div>
              <div style={{textAlign:"center"}}>
                  <h1 style={{marginLeft:"40px",margintop:"150px"}}>{(state)?state.name:"loading"}</h1>
                  <div style={{display:"flex",width:"108%",justifyContent:"space-between"}}>
                     <p>"you are the best,leave the rest"</p>
                  </div>
              </div>
          </div>
     
      <div className="postss" style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around"}}></div>
      {
          pics.map(x=>{
              return(
                <img style={{width:"30%" ,marginLeft:"3px"}} src={x.photo} alt={x.title} />
              )
          })
      }
     
       </div>
      

     );
}
 
export default Profile;