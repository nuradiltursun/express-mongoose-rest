const express=require('express');
const router=express.Router();

// from mongoose
const User=require('../module/user')


// gettingall users
router.get('/',async (req,res)=>{
    try{
        const users=await User.find();
        res.json(users);
    }
    catch(err){
        res.status(500).json({message : err.message})
    }
})
// getting one user
router.get("/:id",getuser,(req,res)=>{
    res.send(res.user.name)

})

// crating one user
router.post('/',async (req,res)=>{
    const user=new User({
        name :  req.body.name,
        email : req.body.email,
        addr : req.body.addr
    })
    try{
        const newuser=await user.save();
        res.status(201).json(newuser)
    }catch(err){
        res.status(400).json({message : err.message})
    }
  

})



// updating one user
router.patch('/:id',getuser,async (req,res)=>{
    // res.send(res.user.name)
    if(req.body.name !== null){
        res.user.name=req.body.name;
    }
    if(req.body.email !== null){
        res.user.email=req.body.email;
    }
    if(req.body.addr !== null){
        res.user.addr=req.body.addr;
    }
    try{
       const updateuser= await res.user.save();
       res.json(updateuser)
    }catch(err){
        res.status(400).json({message : err.message})
    }

})
// deleting one user
router.delete('/:id',getuser,async (req,res)=>{

    try{
        await res.user.remove();
        res.json({message : "delete user  success!"})
    }catch(err){
        res.status(500).json({message : err.message})
    }
})


async function getuser(req,res,next){
    let user;
    try{
        user=await User.findById(req.params.id);
        if(user == null){
            res.status(404).json({message : "cannot find user..."})
        }

    }catch(err){
        return res.status(500).json({message : err.message})

    }
    // res.json(user)
    res.user=user;
    next()
}

module.exports=router;