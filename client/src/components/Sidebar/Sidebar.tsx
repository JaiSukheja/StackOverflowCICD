import "./Sidebar.css"
import { Link } from "react-router-dom"
const Sidebar = (props:any) => {
  const activeLink = props.activeLink
  return (
    <div className='sidebar'>
        <div className="linksContainer">
          <Link to="/Home" className={activeLink==="home"?"link active" :"link"}>
            <i className='bx bxs-home' ></i>
            <span className='linkName'>Home</span>
          </Link>
          <Link to="/questions" className={activeLink==="questions"?"link active" :"link"}>
            <i className='bx bx-comment-minus'></i>
            <span className='linkName'>Questions</span>
          </Link>
          <Link to="/tags" className={activeLink==="tags"?"link active" :"link"}>
            <i className='bx bxs-bookmarks' ></i>
            <span className='linkName'>Tags</span>
          </Link>
          <Link to="/users" className={activeLink==="users"?"link active" :"link"}>
            <i className='bx bxs-user-account'></i>
            <span className='linkName'>Users</span>
          </Link>
          <Link to="/companies" className={activeLink==="companies"?"link active" :"link"}>
            <i className='bx bxs-briefcase' ></i>
            <span className='linkName'>Companies</span>
          </Link>
        </div>
    </div>
  )
}

export default Sidebar