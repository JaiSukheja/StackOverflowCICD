import "./Signup.css"
import { Link } from "react-router-dom"
const Signup = () => {
  return (
    <div className="signup">
      <div className="signupLeft">
        <div className="signupLeftHeading">
          Join the Stack Overflow community
        </div>
        <div className="subPoints">
          <div className="subPoint">
            <i className='bx bxs-message-detail'></i>
            <span>
              Get unstuck — ask a question
            </span>
          </div>
          <div className="subPoint">
            <i className='bx bxs-check-circle'></i>
            <span>
              Unlock new privileges like voting and commenting
            </span>
          </div>
          <div className="subPoint">
            <i className='bx bxs-user'></i>
            <span>
              Save your favorite tags, filters, and jobs
            </span>
          </div>
          <div className="subPoint"> 
            <i className='bx bxs-award'></i>
            <span>
              Earn reputation and badges
            </span>
          </div>
        </div>
      </div>
      <div className="signupRight">
        <img src="src\assets\logo.png" alt="logo" className="signupLogoImg" />
        <div className="signupInputContainer">
          <div className="signupInput">
            <label htmlFor="Username" className="signupInputLabel">Username</label>
            <input type="text" placeholder="Enter your Username" />
          </div>
          <div className="signupInput">
            <label htmlFor="Email" className="signupInputLabel">Email</label>
            <input type="text" placeholder="Enter your Email" />
          </div>
          <div className="signupInput">
            <label htmlFor="Password" className="signupInputLabel">Password</label>
            <input type="password" placeholder="Enter your Password"/>
          </div>
          <div className="signupInput">
            <button className="signupbtn">
              Sign Up
            </button>  
          </div>
          <div className="signupTerms">
            By clicking “Sign up”, you agree to our <a href="#">terms of service</a>, <a href="#">privacy policy</a> and <a href="#">cookie policy</a>
          </div>
          <div className="signupLogin">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup