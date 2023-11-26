import Navbar from "./components/Navbar/Navbar"
import "./App.css"
import {  createBrowserRouter,  RouterProvider, Outlet, Navigate} from "react-router-dom";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import AskQuestion from "./pages/AskQuestion/AskQuestion";
import Profile from "./pages/Profile/Profile";
import ViewQuestion from "./pages/ViewQuestion/ViewQuestion";
import Tags from "./pages/Tags/Tags";
import Questions from "./pages/Questions/Questions";
import NotFound from "./pages/NotFound/NotFound";
import UserContext from "./context/userContext";
import { useContext } from "react";


const App = () => {
  const { isLoggedIn }:any = useContext(UserContext)
  const Layout=()=>{
    return (
      <>
        <div className="app">  
          <Navbar/>
          <div className="appContainer">
            <Outlet/>
          </div>
        </div>
      </>
    )
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[
        {  
          path: "/",
          element: <Home/>
        },
        {
          path: "/Home",
          element: <Home/>
        },
        {  
          path: "/signup",
          element: isLoggedIn ? <Navigate to="/"/> :<Signup/>
        },
        {  
          path: "/Login",
          element: isLoggedIn ?  <Navigate to="/"/> :<Login/>
        },
        {  
          path: "/AskQuestion",
          element: isLoggedIn ? <AskQuestion/> :  <Navigate to="/login"/>
        },
        {
          path: "/questions",
          element: <Questions/>
        },
        {  
          path: "/Profile",
          element: isLoggedIn ? <Profile/> :  <Navigate to="/login"/>
        },
        {
          path: "/tags",
          element: <Tags/>
        },
        {
          path: "/viewQuestion/:id",
          element: <ViewQuestion/>
        },
        {
          path: "/users",
          element: <NotFound activeLink={"users"}/>
        },
        {
          path: "/companies",
          element: <NotFound activeLink={"companies"}/>
        
        },
        {
          path: "*",
          element: <NotFound/>
        },
      ]
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App