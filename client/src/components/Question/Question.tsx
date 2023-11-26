import "./Question.css"
import { Link } from "react-router-dom";
const Question = (props:any) => {
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
                    <div className="askedBy">asked by <span className="name">{props.data.user}</span> on <span className="date">{new Date(props.data.createdAt).toLocaleDateString()}</span></div>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Question