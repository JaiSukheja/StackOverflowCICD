import { useState } from "react"
import "./AskQuestion.css"
import axios from "axios"

const AskQuestion = () => {
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [tags, setTags] = useState("")
    const handleClick = () => {
        axios.post("http://localhost:4444/question", {
            title: title,
            text: text,
            tags: tags.split(" "),
            user : "6559103b8c6d935db82320d5"
        })
        .then((res) => {
            res ? location.href = "/questions" : console.log("error")
        })
        .catch((err) => {
            console.log(err)
        })
    }
    

  return (
    <div className="askQuestion">
        <div className="askQuestionHeading">
            Ask a Public Question
        </div>
        <div className="askQuestionContent">
            <div className="askQuestionContentHeading">
                <label htmlFor="" className="askQuestionContentLabel">Title</label>
                <div className="askQuestionDesc">
                    Be specific and imagine you’re asking a question to another person
                </div>
                <input type="text" className="askQuestionContentInput" placeholder="e.g. Is there an R function for finding the index of an element in a vector?" onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className="askQuestionContentHeading">
                <label htmlFor="" className="askQuestionContentLabel">Body</label>
                <div className="askQuestionDesc">
                    Include all the information someone would need to answer your question
                </div>
                <textarea className="askQuestionContentTextarea" name="" id="" cols={30} rows={10} placeholder="e.g. I'm trying to use the reshape package in R, but I'm having trouble finding the melt function. Anyone have any pointers?" onChange={(e) => setText(e.target.value)}></textarea>
            </div>
            <div className="askQuestionContentHeading">
                <label htmlFor="" className="askQuestionContentLabel">Tags</label>
                <div className="askQuestionDesc">
                    Add up to 5 tags to describe what your question is about
                </div>
                <input type="text" className="askQuestionContentInput" placeholder="e.g. (reactjs javascript html css)" onChange={(e) => setTags(e.target.value)}/>
            </div>
        </div>
        <button className="askQuestionContentBtn" onClick={handleClick} disabled={title.length === 0 || text.length === 0 || tags.length === 0}>            
            Post Your Question
        </button>
    </div>
  )
}

export default AskQuestion