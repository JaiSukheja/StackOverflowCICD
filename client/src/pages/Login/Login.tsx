import "./Login.css"
import { Link } from "react-router-dom"
const Login = () => {
  return (
    <div className="login">
      <div className="loginContainer">
        <img src="src\assets\logo.png" alt="logo" className="loginLogoImg" />
          <div className="loginInputContainer">
            <div className="loginInput">
              <label htmlFor="Email" className="loginInputLabel">Email</label>
              <input type="text" placeholder="Enter your Email" />
            </div>
            <div className="loginInput">
              <label htmlFor="Password" className="loginInputLabel">Password</label>
              <input type="password" placeholder="Enter your Password"/>
            </div>
            <div className="loginInput">
              <button className="loginbtn">
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