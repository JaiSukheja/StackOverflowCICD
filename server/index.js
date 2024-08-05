const express = require('express');
const app = express();
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const cors = require('cors')
const port = process.env.PORT || 4444;
const mongoUrl = process.env.MONGO_URL;

const QuestionRoute = require("./routes/question");
const AnswerRoute = require("./routes/answer");
const userRoute = require("./routes/user");
const Question = require('./model/Question');


const connect = async () => {   
    await mongoose.connect(mongoUrl)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });   
}
app.use(
    cors({
         origin: "*",
       // origin: "http://localhost:5173",
	//origin: "http://172.31.17.84:5173",	    
        allowedHeaders: ["Access-Control-Allow-Origin", "Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin", "x-access-token", "x-refresh-token", "user-token"],
        methods: ["GET", "POST", "PUT", "DELETE"],
    }));
        
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.get('/', async (req, res) => {
    res.send("Server is up and running")
})

app.use("/question", QuestionRoute);
app.use("/answer", AnswerRoute);
app.use("/user", userRoute);





app.listen(port,()=>{
    connect();
    console.log("Server is running at : http://localhost:" + port)
})
