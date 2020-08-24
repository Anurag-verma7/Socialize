const express = require('express')
const app=express()
const mongoose =require('mongoose')
require('./models/user')
require('./models/post')





mongoose.connect('mongodb://localhost/clone', { useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false  })
mongoose.connection.on('connected',()=>{
    console.log("db connected")
})
mongoose.connection.on('error',(err)=>{
    console.log("db not connected",err)
})

app.use(express.json())
app.use(express.urlencoded({ extended : false}))
app.use(require('./routes/auth'))
app.use(require('./routes/post'))


app.listen(5000,(err)=>{
    if(err){
        console.log("error occured")
    }
    else
    console.log("listening")
})