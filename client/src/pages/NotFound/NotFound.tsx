import Sidebar from "../../components/Sidebar/Sidebar"
import "./NotFound.css"
const NotFound = (props:any) => {
    const activeLink = props.activeLink
  return (
    <div className="notFound">
        <Sidebar activeLink={activeLink}/>   
        <div className="notFoundContainer">
            <h1 className="notFoundHeading">New Functionality Coming Soon!</h1>
        </div> 
    </div>
  )
}

export default NotFound