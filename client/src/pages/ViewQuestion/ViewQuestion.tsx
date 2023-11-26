import { Link, useParams } from "react-router-dom"
import Sidebar from "../../components/Sidebar/Sidebar"
import "./ViewQuestion.css"
import { useContext, useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import UserContext from "../../context/userContext"

const ViewQuestion = () => {
    const {user}:any = useContext(UserContext)
    const [reset,SetReset] = useState(false)
    const [text, setText] = useState("")
    const [shareModal, setShareModal] = useState(false)
    const [copyMessage, setCopyMessage] = useState(false)    
    const qid = useParams().id;
    const [question, setQuestion] = useState<any>(null);
    const [answers, setAnswers] = useState<any>(null);
    const [upvote, setUpvote] = useState(false);
    const [downvote, setDownvote] = useState(false);
    
    
    const handleClick = () => {
        axios.post("http://localhost:4444/answer/"+ question._id, {
            text: text,
            userId: "6558ccd25a19a054321630eb",
            questionId: question._id,
        })
        .then((res) => {
            console.log(res);
            SetReset(!reset)
        })
        .catch((err) => {
            console.log(err);
        })
    }
    

    useEffect(() => {
        axios.put("http://localhost:4444/question/" + qid, {
            userId: "6558ccd25a19a054321630eb",
        }).then((res) => {
            setQuestion(res.data);
                res.data.upvotes.includes("6558ccd25a19a054321630eb")? setUpvote(true): setUpvote(false);
                res.data.downvotes.includes("6558ccd25a19a054321630eb")? setDownvote(true): setDownvote(false);
        }
        ).catch((err) => {
            console.log(err);
        })

        axios.get("http://localhost:4444/answer/" + qid).then((res) => {
            setAnswers(res.data);
        }
        ).catch((err) => {
            console.log(err);
        })
        
    }, [reset])

    useEffect(() => {
        setTimeout(() => {
            setCopyMessage(false)
        }
        , 3000)
    }, [copyMessage])

  return (
    <div className="viewQuestion">
        <Sidebar/>
        <div className="viewQuestionContainer">
            <div className="viewQuestionHeader">
                <div className="viewQuestionHeading">
                    {question?.title}
                </div>
                <div className="viewQuestionBtns">
                    {user?(
                        <>
                            <button className="viewQuestionBtn">Edit</button>
                            <button className="viewQuestionBtn">Delete</button>
                        </>
                        ):(
                        <button className="viewQuestionBtn">Ask Question</button>
                    )}
                </div>
            </div>
            <div className="viewQuestionDetails">
                <pre className="viewQuestionDetail">
                    Asked <span className="viewQuestionDetailValue">{new Date(question?.createdAt).toLocaleDateString()}</span>
                </pre>
                <pre className="viewQuestionDetail">
                    Modified <span className="viewQuestionDetailValue">{question?.updatedAt ? new Date(question?.updatedAt).toLocaleDateString() : "Not Modified"}</span>
                </pre>
                <pre className="viewQuestionDetail">
                    Viewed <span className="viewQuestionDetailValue">{question?.views.length}</span>
                </pre>
            </div>
            <div className="viewQuestionBody">
                <div className="questionVotes">
                    <button onClick={
                        () => {
                            axios.put("http://localhost:4444/question/" + question._id + "/upvote", {
                                userId: "6558ccd25a19a054321630eb",
                            })
                            .then((res) => {
                                console.log(res);
                                SetReset(!reset)
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                        }
                    }
                    
                    >
                        <i className={
                        upvote ? "bx bx-caret-up active" : "bx bx-caret-up"
                    }></i>
                    </button>
                    <div className="questionVotesCount">
                        {
                            question?.upvotes.length - question?.downvotes.length
                        }
                    </div>
                    <button onClick={
                        () => {
                            axios.put("http://localhost:4444/question/" + question._id + "/downvote", {
                                userId: "6558ccd25a19a054321630eb",
                            })
                            .then((res) => {
                                console.log(res);
                                SetReset(!reset)
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                        }
                    } 
                    >
                        <i className={
                        downvote ? "bx bx-caret-down active" : "bx bx-caret-down"
                        }></i>
                    </button>
                </div>
                <div className="viewQuestionDescription">
                    <div className="viewQuestionDesc">
                        {question?.text}
                    </div>
                    <div className="viewQuestionTags">
                        {question?.tags.map((item:any,idx:number) => {
                            return <div className="viewQuestionTag" key={idx}>{item}</div>
                        })}
                    </div>
                    <div className="ViewQuestionLinks">
                        <div className="viewQuestionLink">
                            <i className='bx bx-share-alt'></i>
                            <span className="viewQuestionLinkName" onClick={
                                () => {
                                    setShareModal(!shareModal)
                                }
                            }>Share</span>
                        </div>
                        <div className="viewQuestionLink">
                            <i className='bx bxs-flag-alt' ></i>
                            <span className="viewQuestionLinkName">Report</span>
                        </div>
                        <div className="viewQuestionLink">
                            <i className='bx bx-bookmark-alt'></i>
                            <span className="viewQuestionLinkName">Bookmark</span>
                        </div>
                    </div>
                </div>
            </div>
            {
                shareModal && (
                    <div className="shareModal">
                        <div className="shareModalContainer">

                            <div className="shareModalHeading">
                                Copy link
                            </div>
                            <div className="shareModalLink">
                                {window.location.href}
                            </div>
                            <div className="shareModalBtns">
                                <button className="shareModalBtn" 
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href)
                                    setCopyMessage(true)
                                }}
                                >
                                    <i className='bx bx-copy-alt'></i> Copy
                                </button>
                                <button className="shareModalBtn" onClick={
                                    () => {
                                        setShareModal(!shareModal)
                                        setCopyMessage(false)
                                    }
                                }>
                                    <i className='bx bx-x'></i>
                                    Close</button>
                            </div>
                            {
                                copyMessage && (
                                    <div className="copyMessage">
                                        Link copied to clipboard!
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )
            }
            <div className="viewQuestionAnswers">
                <div className="viewQuestionAnswersHeading">
                    {question?.answers.length} Answers
                </div>
                {
                    answers?.map((item:any,idx:number) => {
                        return (
                            <div className="viewQuestionAnswer" key={idx}>
                                <div className="answerVotes">
                                    <button>
                                        <i className='bx bx-caret-up'></i>
                                    </button>
                                    <div className="answerVotesCount">
                                        {item.upvotes.length - item.downvotes.length}
                                    </div>
                                    <button>
                                        <i className='bx bx-caret-down'></i>
                                    </button>
                                </div>
                                <div className="answerBody">
                                    <div className="answerDescription">
                                        {item.text}
                                    </div>
                                    <div className="answerDetails">
                                        <pre className="answerDetail">
                                            Answered <span className="answerDetailValue">{new Date(item.createdAt).toLocaleDateString()}</span>
                                        </pre>
                                        <pre className="answerDetail">
                                            Active <span className="answerDetailValue">{new Date(item.updatedAt).toLocaleDateString()}</span>
                                        </pre>
                                        <pre className="answerDetail">
                                            Viewed <span className="answerDetailValue">{item.views}</span>
                                        </pre>
                                    </div>
                                    <div className="answerLinks">
                                        <div className="answerLink">
                                            <i className='bx bx-share-alt'></i>
                                            <span className="answerLinkName">Share</span>
                                        </div>
                                        <div className="answerLink">
                                            <i className='bx bxs-flag-alt' ></i>
                                            <span className="answerLinkName">Report</span>
                                        </div>
                                        <div className="answerLink">
                                            <i className='bx bx-bookmark-alt'></i>
                                            <span className="answerLinkName">Bookmark</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="yourAnswerBox">
                <div className="answerBoxHeading">
                    Your Answer
                </div>
                <div className="answerInput">
                    <textarea className="answerInputField" placeholder="Type your answer here" 
                    onChange={(e) => setText(e.target.value)}
                    ></textarea>
                </div>
                <button className="answerBtn" onClick={handleClick}>Post Your Answer</button>
            </div>
            <div className="relatedQuestions">
                <span>
                    Browse other questions tagged 
                </span>
                <span className="viewQuestionTags">
                    {question?.tags.map((item:any,idx:number) => {
                        return <div className="viewQuestionTag" key={idx}>{item}</div>
                    })}
                </span> 
                or <Link to="/askquestion" className="askQuestionLink">ask your own question.</Link> 
            </div>
        </div>
    </div>
  )
}

export default ViewQuestion