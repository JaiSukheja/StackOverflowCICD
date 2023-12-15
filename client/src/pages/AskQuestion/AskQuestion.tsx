import { useContext, useEffect, useState } from "react"
import "./AskQuestion.css"
import axios from "axios"
import UserContext from "../../context/userContext"
import { useParams } from "react-router-dom"
import apiContext from "../../context/apiContext"

const AskQuestion = () => {
    // if /edit then fetch the question and set the values of title, text and tags
    // else set the values of title, text and tags to empty string
    // check from the url if it is /edit or /askQuestion

    // check edit 

    const { id } = useParams<any>()
    const {apiUrl}:any = useContext(apiContext)


    const {user} = useContext<any>(UserContext)
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [tags, setTags] = useState("")
    const handleClick = () => {
        axios.post(apiUrl+"question", {
            title: title,
            text: text,
            tags: tags.split(" "),
            user : user._id
        })
        .then((res) => {
            res ? location.href = "/questions" : console.log("error")
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const editClick = () => {
        axios.put(apiUrl+"question/edit/" + id, {
            title: title,
            text: text,
            tags: tags.split(" "),
            user : user._id
        })
        .then((res) => {
            res ? location.href = "/questions" : console.log("error")
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        if(id){
            axios.get(apiUrl+"question/" + id)
            .then((res) => {
                setTitle(res.data.title)
                setText(res.data.text)
                setTags(res.data.tags.join(" "))
            })
            .catch((err) => {
                console.log(err)
            })
        }
    },[])
    

  return (
    <div className="askQuestion">
        <div className="askQuestionHeading">
            {id ? "Edit" : "Ask"} a Public Question
        </div>
        <div className="askQuestionContent">
            <div className="askQuestionContentHeading">
                <label htmlFor="" className="askQuestionContentLabel">Title</label>
                <div className="askQuestionDesc">
                    Be specific and imagine you’re asking a question to another person
                </div>
                <input value={title} type="text" className="askQuestionContentInput" placeholder="e.g. Is there an R function for finding the index of an element in a vector?" onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className="askQuestionContentHeading">
                <label htmlFor="" className="askQuestionContentLabel">Body</label>
                <div className="askQuestionDesc">
                    Include all the information someone would need to answer your question
                </div>
                <textarea value={text} className="askQuestionContentTextarea" name="" id="" cols={30} rows={10} placeholder="e.g. I'm trying to use the reshape package in R, but I'm having trouble finding the melt function. Anyone have any pointers?" onChange={(e) => setText(e.target.value)}></textarea>
            </div>
            <div className="askQuestionContentHeading">
                <label htmlFor="" className="askQuestionContentLabel">Tags</label>
                <div className="askQuestionDesc">
                    Add up to 5 tags to describe what your question is about
                </div>
                <input value={tags} type="text" className="askQuestionContentInput" placeholder="e.g. (reactjs javascript html css)" onChange={(e) => setTags(e.target.value)}/>
            </div>
        </div>
        <button className="askQuestionContentBtn" onClick={ id ? editClick: handleClick} disabled={title.length === 0 || text.length === 0 || tags.length === 0}>                        
            {id ? "Edit" : "Post"} Your Question
        </button>
    </div>
  )
}

export default AskQuestion