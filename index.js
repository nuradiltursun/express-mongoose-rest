const express=require('express');
const app=express();
const mongoose=require('mongoose')
var bodyParser = require('body-parser')
app.use(bodyParser.json());

const userRouter=require('./router/user');
mongoose.connect('mongodb://127.0.0.1:27017/demoblog',{ useNewUrlParser: true })
const db=mongoose.connection;
db.on('error',err=>{
    console.log(err);
})
db.on('open',()=>{
    console.log("open database succesfully");
})


app.use('/users',userRouter);
app.use(express.json())
app.listen(5050,err=>{
    console.log("runnint in 5050");
})