const router = require("express").Router();
const User = require('../model/User')
const bcrypt = require('bcrypt')

// Signup
router.post("/signup", async (req,res)=>{
    try{
        // GENERATE NEW PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt)

        // CREATE NEW USER
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        // SAVING USER DETAILS AND RETURNING RESPONSE
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
});

// LOGIN
router.post("/login", async (req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        !user && res.status(404).send("User not found");

        const validPassword = await bcrypt.compare(req.body.password , user.password);
        !validPassword && res.status(400).json("Wrong password")
        
        await user.updateOne({ $set: { isLoggedin: true } });

        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }    
});

// LOGOUT
router.put("/logout/:id", async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        !user && res.status(404).send("User not found");

        // set isLoggedin to false
        await user.updateOne({ $set: { isLoggedin: false } });

        res.status(200).json("User has been logged out");
    }catch(err){
        res.status(500).json(err);
    }    
});

// check Loggedin
router.get("/loggedin/:id", async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        !user && res.status(404).send("User not found");

        res.status(200).json(user.isLoggedin);
    }catch(err){
        res.status(500).json(err);
    }    
});

// get all users
router.get("/all", async (req,res)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json(err);
    }
});

// get a user
router.get("/:id", async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router