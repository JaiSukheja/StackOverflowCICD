import { useContext, useEffect, useState } from "react";
import "./Question.css"
import { Link } from "react-router-dom";
import axios from "axios";
import apiContext from "../../context/apiContext";
const Question = (props:any) => {
    const [username,setUsername] = useState("")
    const {apiUrl}:any = useContext(apiContext)
    useEffect(() => {
        axios.get(apiUrl+"/user/"+props.data.user)
        .then((res:any) => {
            setUsername(res.data.username)
        })
        .catch((err:any) => {
            console.log(err)
        })
    }
    ,[])
  return (
    <div className="question">
        <div className="questionContainer">
            <div className="detailsBox">
                <div className="votes">{props.data.upvotes.length} votes</div>
                <div className="answers">{props.data.answers.length} answers</div>
                <div className="views">{props.data.views.length} views</div>
            </div>
            <div className="questionBox">
                <Link to={"/viewquestion/"+ props.data._id} className="questionStatement">
                    {props.data.title}
                </Link>
                <div className="questionDescription">
                    {props.data.text}
                </div>
                <div className="questionFooter">
                    <div className="tags">
                        {
                            props.data.tags.map((item:any,idx:number) => {
                                return <div className="tag" key={idx}>{item}</div>
                            })
                        }
                    </div>
                    <div className="askedBy">asked by <Link to={"/profile/"+props.data.user} className="name">{username}</Link> on <span className="date">{new Date(props.data.createdAt).toLocaleDateString()}</span></div>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Question