import React,{useState} from 'react'
import {useEffect} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'
const Createpost = () => {
    const history = useHistory();
    const [title,setTitle]=useState("");
    const [body,setBody]=useState("");
    const [image,setImage]=useState("");
    const [url,setUrl]=useState("");
    useEffect(()=>{
        if(url){
           fetch("/createpost",{
               method:"post",
               headers :{
                   "Content-Type" : "application/json",
                    "Authorization" :"Bearer "+localStorage.getItem("jwt")
               } ,
               body:JSON.stringify({
                   title,
                   body,
                   photo:url
               })
           }).then(res=>res.json()).then(data=>{
               if(data.error)
               M.toast({html: data.error, classes: 'rounded'})
               else{
                   M.toast({html:"posted created", classes: 'rounded'})
                   history.push("/")
               }
           })
        }
   },[url])
    const postDetails=()=>{
       
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","socialapp")
        data.append("cloud_name","aviverma42367")
        fetch("https://api.cloudinary.com/v1_1/aviverma42367/image/upload",{
        method : "post",
        body : data
    }).then(res=>res.json())
    .then(data=>{
        setUrl(data.url)
    }).catch(err=>{
        console.log(err)
    })
  
    }
    return ( 
        <div className="card" style={{margin:"10px auto",maxWidth:"600px",padding:"20px",textAlign:"center"}}>
            <input type="text" placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <input type="text" placeholder="body" value={body} onChange={(e)=>setBody(e.target.value)}/>
            <div className="file-field input-field">
            <div className="btn">
                  <span>File</span>
                      <input type="file" onChange={(e)=>{setImage(e.target.files[0])}} />
          </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" placeholder="upload image"/>
                <button className="btn waves-effect waves-light" style={{marginLeft:"150px"}} onClick={postDetails} >Submit post</button>
             </div>
          </div>
        </div>
     );
}
 
export default Createpost;