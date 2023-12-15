const express = require('express');
const app = express();
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const cors = require('cors')
const port = process.env.PORT || 4444;
const mongoUrl = process.env.MONGO_URL;

const QuestionRoute = require("./routes/Question");
const AnswerRoute = require("./routes/answer");
const userRoute = require("./routes/user");

mongoose.connect(mongoUrl)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
    
app.use(
    cors({
        origin: ["http://localhost:5173","https://stack-overflow-orcin.vercel.app","https://stack-overflow-ooauwbu6n-jaisukhejas-projects.vercel.app"]
    }));
        
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use("/question", QuestionRoute);
app.use("/answer", AnswerRoute);
app.use("/user", userRoute);





app.listen(port,()=>{
    console.log("Server is running at : http://localhost:" + port)
})