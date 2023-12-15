import { Link } from "react-router-dom"
import "./Navbar.css"
import { useContext } from "react"
import UserContext from "../../context/userContext"
import axios from "axios"

import logoimg from "../../assets/Stack_Overflow.png"
import apiContext from "../../context/apiContext"

const Navbar = () => {
    const {username,setUsername,isLoggedIn,setIsLoggedIn,token,setToken,userId}:any = useContext(UserContext)
    const { apiUrl }:any = useContext(apiContext)
    // console.log(apiUrl)
    const handleLogout = async () => {
        axios.put(apiUrl+"user/logout/" + token)
        .then((res) => {
            console.log(res.data)
            localStorage.removeItem("StackOverflowToken")
            localStorage.removeItem("StackOverflowUsername")
            setUsername("")
            setIsLoggedIn(false)
            setToken("")
            window.location.href = "/login"
        })
        .catch((err) => {
            console.log(err.message)
        })
    }

  return (
    <div className="navbar">
        <div className="navbarContainer">
            {/* <button>
                <img src="src\assets\Stack_Overflow.png" alt="" />
            </button> */}
            <div className="navlinks">
                <Link to="/" className="logo">
                    <img src={logoimg} alt="" className="logoImg"/>
                </Link>
                <Link to="/about" className="navlink">About</Link>
                <Link to="/questions" className="navlink">Product</Link>
                <div className="navlink">For Teams</div>
            </div>
            <div className="searchbar">
                <i className='bx bx-search'></i>
                <input type="text" placeholder="Search..."/>
            </div>
            <div className="Auth">
                {
                    !isLoggedIn ?  
                    <>
                        <Link to="/login" className="loginBtn">Log in</Link>
                        <Link to="/signup" className="signupBtn">Sign up</Link>
                    </> :  
                        <>
                            <Link to={"/profile/"+ userId} className="loginBtn"><i className='bx bx-user'></i>{username} </Link>
                            <button className="signupBtn" onClick={handleLogout}>Logout</button>
                        </>
                }
            </div>
        </div>
    </div>
  )
}

export default Navbar