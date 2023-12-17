const router = require("express").Router();
const User = require('../model/User')
const bcrypt = require('bcrypt')
const UAParser = require('ua-parser-js');

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
        console.log(err)
        res.status(500).json(err);
    }
});

// LOGIN
// router.post("/login", async (req,res)=>{
//     try{
//         const user = await User.findOne({email:req.body.email});
//         !user && res.status(404).send("User not found");

//         const validPassword = await bcrypt.compare(req.body.password , user.password);
//         !validPassword && res.status(400).json("Wrong password")
        
//         await user.updateOne({ $set: { isLoggedin: true } });

//         res.status(200).json(user);
//     }catch(err){
//         console.log(err)
//         res.status(500).json(err);
//     }    
// });
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const validPassword = await bcrypt.compare(password, user.password);
  
      if (!validPassword) {
        return res.status(400).json("Wrong password");
      }
  
      const ua = req.headers["user-agent"];
      const parser = new UAParser();
      parser.setUA(ua);
      const result = parser.getResult();
  
      const loginHistory = {
        ipAddress: req.ip,
        ua: ua,
        browser: {
          name: result.browser.name,
          version: result.browser.version,
          major: result.browser.major,
        },
        engine: {
          name: result.engine.name,
          version: result.engine.version,
        },
        os: {
          name: result.os.name,
          version: result.os.version,
        },
        device: JSON.stringify({
            model: result.device.model, 
            type: result.device.type, 
            vendor: result.device.vendor, 
        }),
        cpu: {
          architecture: result.cpu.architecture,
        },
      };
      await user.updateOne({
        $set: { isLoggedin: true },
        $push: { loginHistory: loginHistory }, 
      });
  
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
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
        console.log(err)
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
        console.log(err)
        res.status(500).json(err);
    }    
});

// get all users
router.get("/all", async (req,res)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(err){
        console.log(err)
        res.status(500).json(err);
    }
});

// get a user
router.get("/:id", async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }catch(err){
        console.log(err)
        res.status(500).json(err);
    }
});

// get total points of a user

router.get("/points/:id", async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const totalPoints = user.points.questions*10 + user.points.answers*20 + user.points.acceptedanswers*15 + user.points.questionUpvotes*2 + user.points.questionDownvotes*(-1) + user.points.answerUpvotes*5 + user.points.answerDownvotes*(-2); 
        res.status(200).json(totalPoints);
    }catch(err){
        console.log(err)
        console.log(err)
        res.status(500).json(err);
    }
});

module.exports = router


// Points System Example:
// Asking a Question:

// Points: 10
// Rationale: Encourages users to actively seek information and engage with the community.
// Providing an Answer:

// Points: 20
// Rationale: Recognizes and rewards users for contributing helpful information.
// Answer Upvote:

// Points: 5
// Rationale: Encourages users to provide valuable answers that are appreciated by the community.
// Answer Downvote:

// Points: -2
// Rationale: Discourages low-quality or incorrect answers.
// Question Upvote:

// Points: 2
// Rationale: Recognizes users for asking valuable and well-received questions.
// Question Downvote:

// Points: -1
// Rationale: Encourages users to ask clear and relevant questions.
// Accepting an Answer:

// Points: 15
// Rationale: Rewards users for selecting the most helpful answer, adding value to the platform.
// Upvoting a Comment: