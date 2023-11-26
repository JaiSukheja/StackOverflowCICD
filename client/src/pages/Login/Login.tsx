import { useState, useContext } from "react"
import "./Login.css"
import { Link } from "react-router-dom"
import axios from "axios"
import UserContext from "../../context/userContext"

import logoimg from "../../assets/logo.png"

const Login = () => {
  const {setIsLoggedIn,setUsername,setToken,setUser}:any = useContext(UserContext)
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const handleLogin = async () => {
    axios.post("http://localhost:4444/user/login",{email,password})
    .then((res) => {
      // console.log(res.data)
      setIsLoggedIn(true)
      // if token is already present in local storage then remove it
      localStorage.removeItem("StackOverflowToken")
      // set token in local storage
      localStorage.setItem("StackOverflowToken",res.data._id)
      // set username in local storage
      localStorage.setItem("StackOverflowUsername",res.data.username)
      
      setEmail("")
      setPassword("")
      setUsername(res.data.username)
      setToken(res.data._id)
      setUser(res.data)
      window.location.href = "/"
    })
    .catch((err) => {
      console.log(err)
    })    
  }



  return (
    <div className="login">
      <div className="loginContainer">
        <img src={logoimg} alt="logo" className="loginLogoImg" />
          <div className="loginInputContainer">
            <div className="loginInput">
              <label htmlFor="Email" className="loginInputLabel">Email</label>
              <input type="text" placeholder="Enter your Email" onChange={
                (e) => {
                  setEmail(e.target.value)
                }
              } value={email}/>
            </div>
            <div className="loginInput">
              <label htmlFor="Password" className="loginInputLabel">Password</label>
              <input type="password" placeholder="Enter your Password" onChange={
                (e) => {
                  setPassword(e.target.value)
                }
              } value={password}/>
            </div>
            <div className="loginInput">
              <button className="loginbtn" onClick={handleLogin}>
                Log in
              </button>  
            </div>
            <div className="loginTerms">
              <a href="#">Forgot Password ?</a>
            </div>
            <div className="loginSignup">
            Don’t have an account? <Link to="/signup">Sign up</Link>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Login