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

        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
});

router.get("/all", async (req,res)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router