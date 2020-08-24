const express = require('express')
const router = express.Router()
const mongoose=require('mongoose')
const requirelogin =require('../middleware/requirelogin')
const Post=mongoose.model("Post")

router.get("/getposts",requirelogin,(req,res)=>{
    Post.find().populate("postedBy","_id name")
    .then(posts=>{
        console.log(posts)
        res.json({posts:posts})
    }).catch(err=>{
        console.log(err);
    })
})
router.post('/createpost',requirelogin,(req,res)=>{
    const {title,body,photo}=req.body;
    if(!title || !body || !photo){
        return res.status(422).json({error : "please enter all the field"})
    }
    let post = new Post({
        title,
        body,
        photo:photo,
        postedBy : req.user
    })
    post.save().then(result=>{
        console.log(result)
        res.json({post:result})
    }).catch(err=>{
        console.log(err)
    })
})
router.get('/mypost',requirelogin,(req,res)=>{
    console.log(req.user._id)
    Post.find({postedBy : req.user})
    .then(mypost=>{
        res.json({mypost : mypost})
        console.log(mypost)
    }).catch(err=>{
        console.log(err)
    })
})
router.put("/like",requirelogin,(req,res)=>{
  Post.findByIdAndUpdate(req.body.postId,{
      $push:{likes:req.user._id}
  },{
      new:true
  }).exec((err,result)=>{
      if(err)
      return res.status(422).json({error:err})
      else
      res.json(result)
      console.log(result)
  })

})
router.put("/unlike",requirelogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
    
    }).exec((err,result)=>{
        if(err)
        return res.status(422).json({error:err})
        else
        res.json(result)
        console.log(result)
    })
  
  })
router.put("/comment",requirelogin,(req,res)=>{
    const comment ={
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    }).populate("comments.postedBy","_id name")
    .exec((err,result)=>{
        if(err)
        return res.status(422).json({error:err})
        else
        res.json(result)
        console.log(result)
    })
  
  })


module.exports=router;