import React,{useState,useEffect,useContext} from 'react';
import { UserContext } from '../App';
const Home = () => {
    const [data,setData]=useState([]);
    const {state,dispatch}=useContext(UserContext)
    useEffect(()=>{
        fetch('/getposts',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json()).then(result=>{
            setData(result.posts)
        })
    },[])
    const likepost=(id)=>{
        fetch('/like',{
            method :"put",
            headers :{
                "Content-Type" :"application/json",
                "Authorization" :"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId : id,
            })
        }).then(res=>res.json()).then(result=>{
            const newData = data.map(item=>{
                if(item._id==result._id)
                return result
                else 
                return item
            })
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }
    const comment =(text,postId)=>{
        fetch('/comment',{
            method :"put",
            headers :{
                "Content-Type" :"application/json",
                "Authorization" :"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId : postId,
                text:text
            })
        })
    }
    const unlikepost=(id)=>{
        fetch('/unlike',{
            method :"put",
            headers :{
                "Content-Type" :"application/json",
                "Authorization" :"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId : id,
            })
        }).then(res=>res.json()).then(result=>{
            const newData = data.map(item=>{
                if(item._id==result._id)
                return result
                else 
                return item
            })
            setData(newData)
        
        }).catch(err=>{
            console.log(err)
        })
    }
    const deletepost =(postid)=>{
          fetch(`/deletepost/${postid}`,{
              method:"delete",
              headers:{
                  Authorization:"Bearer "+localStorage.getItem("jwt")
              }
          }).then(res=>res.json()).then(result=>{
              console.log(result)
              const newData = data.filter(y=>{
                  return y._id!==result._id
              })
              setData(newData)
          })
    }
    return ( 
        <div className="homepage" >
            {
                data.map(x=>{
                    return(
                        <div className="card" key={x._id} style={{
                            maxWidth:"600px",
                            height:"max-content",
                            margin:"15px auto"
                        }}>
                            <h4>{x.postedBy.name}{x.postedBy._id==state._id
                                && <i style={{float:"right"}} className="material-icons" onClick={()=>{deletepost(x._id)}}>delete</i>
                            }
                            </h4>
                                
                            <div className="card-image">
                                <img src={x.photo} />
                            </div>
                            <div className="card-content">
                                {x.likes.includes(state._id)
                                ?
                                   
                                    <i className="material-icons" onClick={()=>{unlikepost(x._id)}}>thumb_down</i>
                                :
                                    <i className="material-icons" onClick={()=>{likepost(x._id)}}>thumb_up</i>
                                }
                                    <h6>{x.likes.length} likes</h6>
                                     <h6>{x.title}</h6>
                                     <p>{x.body}</p>
                                     
                            </div>
                             
                        </div>
                    )
                })
            }
         

        </div>
     );
}
 
export default Home;