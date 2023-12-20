import { Link, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./ViewQuestion.css";
import { useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import UserContext from "../../context/userContext";
import ViewAnswers from "../../components/ViewAnswers/ViewAnswers";
import apiContext from "../../context/apiContext";
import { useTranslation } from "react-i18next";
import languageContext from "../../context/languageContext";

const ViewQuestion = () => {
    const { t } = useTranslation();
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
    const [translatedText,setTranslatedText] = useState("");
    const [translatedTitle,setTranslatedTitle] = useState("");
    const { lang }:any = useContext(languageContext);

    

    useEffect(() => {
        axios.put(apiUrl+"/question/" + qid, {
                userId: currentUser?._id,
            })
            .then((res) => {
                setQuestion(res.data);
                setTranslatedText(res.data.text);
                setTranslatedTitle(res.data.title);
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
    useEffect(() => {
        if((lang === 'hi' || lang === 'fr') && ((question?.text !== undefined) && (question?.title !== undefined))){
          axios.get(`https://api.mymemory.translated.net/get?q=${question?.text.length > 500 ? question?.text.substring(0,500) : question?.text}&langpair=en|${lang}&de=user1@gmail.com`)
          .then((res: any) => {
            setTranslatedText(res.data.responseData.translatedText);
          });
          axios.get(`https://api.mymemory.translated.net/get?q=${question?.title}&langpair=en|${lang}&de=user1@gmail.com`)
          .then((res: any) => {
            setTranslatedTitle(res.data.responseData.translatedText);
          });
        }
        else{
          setTranslatedText(question?.text);
          setTranslatedTitle(question?.title);
        }
      });

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
                    <div className="viewQuestionHeading">{translatedTitle}</div>
                    <div className="viewQuestionBtns">
                        {currentUser?._id === question?.user ? (
                            <>
                                <Link to={"/edit/" + qid} className="viewQuestionBtn">{t('viewQuestion.edit')}</Link>
                                <button className="viewQuestionBtn"
                                    onClick={() => {
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
                                    }}
                                >
                                    {t('viewQuestion.delete')}
                                </button>
                            </>
                        ) : (
                            <Link to={"/askQuestion"} className="viewQuestionBtn">{t('viewQuestion.askQuestion')}</Link>
                        )}
                    </div>
                </div>
                <div className="viewQuestionDetails">
                    <pre className="viewQuestionDetail">
                        {t('viewQuestion.asked')}{" "}
                        <span className="viewQuestionDetailValue">
                            {new Date(question?.createdAt).toLocaleDateString()}
                        </span>
                    </pre>
                    <pre className="viewQuestionDetail">
                        {t('viewQuestion.modified')}{" "}
                        <span className="viewQuestionDetailValue">
                            {question?.updatedAt
                                ? new Date(question?.updatedAt).toLocaleDateString()
                                : "Not Modified"}
                        </span>
                    </pre>
                    <pre className="viewQuestionDetail">
                        {t('viewQuestion.viewed')}{" "}
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
                        <div className="viewQuestionDesc">{question?.text !== undefined ? translatedText: ""}</div>
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
                                    {t('viewQuestion.share')}
                                </span>
                            </div>
                            <div className="viewQuestionLink">
                                <i className="bx bxs-flag-alt"></i>
                                <span className="viewQuestionLinkName">{t('viewQuestion.report')}</span>
                            </div>
                            <div className="viewQuestionLink">
                                <i className="bx bx-bookmark-alt"></i>
                                <span className="viewQuestionLinkName">{t('viewQuestion.bookmark')}</span>
                            </div>
                        </div>
                    </div>
                </div>
                {shareModal && (
                    <div className="shareModal">
                        <div className="shareModalContainer">
                            <div className="shareModalHeading">{t('viewQuestion.copyLink')}</div>
                            <div className="shareModalLink">{window.location.href}</div>
                            <div className="shareModalBtns">
                                <button
                                    className="shareModalBtn"
                                    onClick={() => {
                                        navigator.clipboard.writeText(window.location.href);
                                        setCopyMessage(true);
                                    }}
                                >
                                    <i className="bx bx-copy-alt"></i> {t('viewQuestion.copy')}
                                </button>
                                <button
                                    className="shareModalBtn"
                                    onClick={() => {
                                        setShareModal(!shareModal);
                                        setCopyMessage(false);
                                    }}
                                >
                                    <i className="bx bx-x"></i>
                                    {t('viewQuestion.close')}
                                </button>
                            </div>
                            {copyMessage && (
                                <div className="copyMessage">{t('viewQuestion.linkCopied')}</div>
                            )}
                        </div>
                    </div>
                )}
                <ViewAnswers answers={answers} question={question} reset={reset}  setReset={setReset}/>
                <div className="relatedQuestions">
                    <span>{t('viewQuestion.browseOtherQuestionsTagged')}</span>
                    <span className="viewQuestionTags">
                        {question?.tags.map((item: any, idx: number) => {
                            return (
                                <div className="viewQuestionTag" key={idx}>
                                    {item}
                                </div>
                            );
                        })}
                    </span>
                    {t('viewQuestion.or')}{" "}
                    <Link to="/askquestion" className="askQuestionLink">
                        {t('viewQuestion.askYourOwnQuestion')}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ViewQuestion;
