import { Link, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./ViewQuestion.css";
import { useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import UserContext from "../../context/userContext";
import ViewAnswers from "../../components/ViewAnswers/ViewAnswers";
import apiContext from "../../context/apiContext";

const ViewQuestion = () => {
    const [reset, setReset] = useState<any>(false);
    const [shareModal, setShareModal] = useState<any>(false);
    const [copyMessage, setCopyMessage] = useState<any>(false);
    const qid = useParams().id;
    const [question, setQuestion] = useState<any>(null);
    const [answers, setAnswers] = useState<any>(null);
    const [upvote, setUpvote] = useState(false);
    const [downvote, setDownvote] = useState(false);
    const { user:currentUser }: any = useContext(UserContext);
    const {apiUrl}:any = useContext(apiContext);

    

    useEffect(() => {
        axios.put(apiUrl+"/question/" + qid, {
                userId: currentUser?._id,
            })
            .then((res) => {
                setQuestion(res.data);
                res.data?.upvotes.includes(currentUser?._id)
                    ? setUpvote(true)
                    : setUpvote(false);
                res.data?.downvotes.includes(currentUser?._id)
                    ? setDownvote(true)
                    : setDownvote(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [reset]);
    useEffect(() => {
        axios
            .get(apiUrl+"/answer/" + qid)
            .then((res) => {
                setAnswers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [reset]);

    const upvoteClick = () => {
        console.log(currentUser)
        axios
            .put(apiUrl+"/question/" + question._id + "/upvote", {
                userId: currentUser._id,
            })
            .then((res) => {
                console.log(res);
                setReset(!reset);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const downvoteClick = () => {
        console.log(currentUser)
        axios
            .put(apiUrl+"/question/" + question._id + "/downvote", {
                userId: currentUser._id,
            })
            .then((res) => {
                console.log(res);
                setReset(!reset);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const toLogin = () => {
        window.location.href = "/login";
    };

    useEffect(() => {
        setTimeout(() => {
            setCopyMessage(false);
        }, 3000);
    }, [copyMessage]);

    return (
        <div className="viewQuestion">
            <Sidebar />
            <div className="viewQuestionContainer">
                <div className="viewQuestionHeader">
                    <div className="viewQuestionHeading">{question?.title}</div>
                    <div className="viewQuestionBtns">
                        {currentUser?._id === question?.user ? (
                            <>
                                <Link to={"/edit/" + qid} className="viewQuestionBtn">Edit</Link>
                                <button className="viewQuestionBtn"
                                onClick={
                                    () => {
                                        axios.delete(apiUrl+"/question/" + qid,
                                        {data:{
                                            user: currentUser._id,
                                        }})
                                        .then((res) => {
                                            console.log(res);
                                            window.location.href = "/questions";
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        });
                                    }
                                }
                                >Delete</button>
                            </>
                        ) : (
                            <Link to={"/askQuestion"} className="viewQuestionBtn">Ask Question</Link>
                        )}
                    </div>
                </div>
                <div className="viewQuestionDetails">
                    {/* <pre className="viewQuestionDetail">
                        Asked By <span className="viewQuestionDetailValue">{question?.user}</span>
                    </pre> */}
                    <pre className="viewQuestionDetail">
                        Asked{" "}
                        <span className="viewQuestionDetailValue">
                            {new Date(question?.createdAt).toLocaleDateString()}
                        </span>
                    </pre>
                    <pre className="viewQuestionDetail">
                        Modified{" "}
                        <span className="viewQuestionDetailValue">
                            {question?.updatedAt
                                ? new Date(question?.updatedAt).toLocaleDateString()
                                : "Not Modified"}
                        </span>
                    </pre>
                    <pre className="viewQuestionDetail">
                        Viewed{" "}
                        <span className="viewQuestionDetailValue">
                            {question?.views.length}
                        </span>
                    </pre>
                </div>
                <div className="viewQuestionBody">
                    <div className="questionVotes">
                        <button
                            onClick={currentUser._id ? upvoteClick : toLogin}
                        >
                            <i
                                className={upvote ? "bx bx-caret-up active" : "bx bx-caret-up"}
                            ></i>
                        </button>
                        <div className="questionVotesCount">
                            {question ? question?.upvotes.length - question?.downvotes.length : 0}
                        </div>
                        <button
                            onClick={currentUser._id ? downvoteClick : toLogin}
                        >
                            <i
                                className={
                                    downvote ? "bx bx-caret-down active" : "bx bx-caret-down"
                                }
                            ></i>
                        </button>
                    </div>
                    <div className="viewQuestionDescription">
                        <div className="viewQuestionDesc">{question?.text !== undefined ? question.text : ""}</div>
                        <div className="viewQuestionTags">
                            {question?.tags.map((item: any, idx: number) => {
                                return (
                                    <div className="viewQuestionTag" key={idx}>
                                        {item}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="ViewQuestionLinks">
                            <div className="viewQuestionLink">
                                <i className="bx bx-share-alt"></i>
                                <span
                                    className="viewQuestionLinkName"
                                    onClick={() => {
                                        setShareModal(!shareModal);
                                    }}
                                >
                                    Share
                                </span>
                            </div>
                            <div className="viewQuestionLink">
                                <i className="bx bxs-flag-alt"></i>
                                <span className="viewQuestionLinkName">Report</span>
                            </div>
                            <div className="viewQuestionLink">
                                <i className="bx bx-bookmark-alt"></i>
                                <span className="viewQuestionLinkName">Bookmark</span>
                            </div>
                        </div>
                    </div>
                </div>
                {shareModal && (
                    <div className="shareModal">
                        <div className="shareModalContainer">
                            <div className="shareModalHeading">Copy link</div>
                            <div className="shareModalLink">{window.location.href}</div>
                            <div className="shareModalBtns">
                                <button
                                    className="shareModalBtn"
                                    onClick={() => {
                                        navigator.clipboard.writeText(window.location.href);
                                        setCopyMessage(true);
                                    }}
                                >
                                    <i className="bx bx-copy-alt"></i> Copy
                                </button>
                                <button
                                    className="shareModalBtn"
                                    onClick={() => {
                                        setShareModal(!shareModal);
                                        setCopyMessage(false);
                                    }}
                                >
                                    <i className="bx bx-x"></i>
                                    Close
                                </button>
                            </div>
                            {copyMessage && (
                                <div className="copyMessage">Link copied to clipboard!</div>
                            )}
                        </div>
                    </div>
                )}
                <ViewAnswers answers={answers} question={question} reset={reset}  setReset={setReset}/>
                <div className="relatedQuestions">
                    <span>Browse other questions tagged</span>
                    <span className="viewQuestionTags">
                        {question?.tags.map((item: any, idx: number) => {
                            return (
                                <div className="viewQuestionTag" key={idx}>
                                    {item}
                                </div>
                            );
                        })}
                    </span>
                    or{" "}
                    <Link to="/askquestion" className="askQuestionLink">
                        ask your own question.
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ViewQuestion;
