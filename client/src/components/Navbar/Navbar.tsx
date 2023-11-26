import { Link } from "react-router-dom"
import "./Navbar.css"

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="navbarContainer">
            {/* <button>
                <img src="src\assets\Stack_Overflow.png" alt="" />
            </button> */}
            <div className="navlinks">
                <Link to="/" className="logo">
                    <img src="src\assets\Stack_Overflow.png" alt="" className="logoImg"/>
                </Link>
                <div className="navlink">About</div>
                <div className="navlink">Product</div>
                <div className="navlink">For Teams</div>
            </div>
            <div className="searchbar">
                <i className='bx bx-search'></i>
                <input type="text" placeholder="Search..."/>
            </div>
            <div className="Auth">
                <Link to="/login" className="loginBtn">Log in</Link>
                <Link to="/signup" className="signupBtn">Sign up</Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar