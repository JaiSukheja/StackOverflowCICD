import Question from "../../components/Question/Question";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import "./Questions.css"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const Questions = () => {
    const [QuestionArray, setQuestionArray] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:4444/question").then((res) => {
            setQuestionArray(res.data.reverse());
            // console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    

    


  return (
    <div className="questionsPage">
        <Sidebar activeLink={"questions"}/>
        <div className="questions">
            <div className="questionsHeader">
                <div className="questionsHeading">All Questions</div>
                <Link to="/askquestion" className="Askbtn">Ask Question</Link>
            </div>
            <div className="questionsContainer">
                {QuestionArray.map((item:any,idx:any) => {
                    return <Question data={item} key={idx}/>
                })}
            </div>  
        </div>
    </div>
  )
}

export default Questions