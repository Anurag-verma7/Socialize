const express = require('express')
const router = express.Router()
const mongoose=require('mongoose')
const User = mongoose.model("User")
const Post =mongoose.model("Post")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET}= require('../keys')
const requireLogin =require('../middleware/requirelogin')
router.get('/',(req,res)=>{
    res.send("hello")
})
router.get('/protected',requireLogin,(req,res)=>{
    res.send("hello user")
})
router.post('/signup',(req,res)=>{
    const {name,email,password}=req.body
    if(!email || !password ||!name ){
       return res.status(422).json({error : "please enter all the fields"})
    }
    User.findOne({email:email}).then((data)=>{
        if(data){
            return res.status(422).json({error :"user already exists"})
        }
    bcrypt.hash(password,10)
    .then((hashedpassword)=>{
        let user = new User({
            email :email,
            name : name,
            password : hashedpassword
         })
         user.save().then((data)=>{
             res.json({message :"saved the user"})
     
         }).catch((err)=>{
             console.log(err)
         })
    })
   
    }).catch((err)=>{
        console.log(err);
    })

    
})
router.post('/signin',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password)
       return res.status(422).json("Please fill all credentials")
       User.findOne({email : email})
       .then((data)=>{
           if(!data)
              return res.status(422).json({error : "Invalid email or password"})
         bcrypt.compare(password,data.password).then((match)=>{
             if(match){
               const token = jwt.sign({_id : data._id},JWT_SECRET)
               const {_id,name,email} = data
               res.json({token : token,user:{_id,email,name}})
             }
            else
            return res.status(422).json({error : "Invalid email or password"})
         })  
       }).catch(err=>{
           console.log(err)
       })
})
router.delete('/deletepost/:postId',(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id").exec((err,post)=>{
        if(err || !post)
             return res.status(422).json({error:err})
         else{
             post.remove().then(result=>{
                 console.log("..........")
                 console.log(result)
                 res.json(result)
             }).catch(err=>{
                 console.log(err)
             })
         }
    })
})
module.exports = router