import Navbar from "./components/Navbar/Navbar"
import "./App.css"
import {  createBrowserRouter,  RouterProvider, Outlet, Navigate} from "react-router-dom";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import AskQuestion from "./pages/AskQuestion/AskQuestion";
import Profile from "./pages/Profile/Profile";
import ViewQuestion from "./pages/ViewQuestion/ViewQuestion";
// import Tags from "./pages/Tags/Tags";
import Questions from "./pages/Questions/Questions";
import NotFound from "./pages/NotFound/NotFound";
import UserContext from "./context/userContext";
import { useContext } from "react";
import About from "./pages/About/About";
import Footer from "./components/Footer/Footer";

const App = () => {
  const { isLoggedIn }:any = useContext(UserContext)
  const Layout=()=>{
    return (
      <div className="app">  
        <Navbar/>
        <div className="appContainer">
          <Outlet/>
        </div>
        <Footer/>
      </div>
    )
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[
        {  
          path: "/",
          element: <Questions/>
        },
        {
          path: "/Home",
          element: <Home/>
        },
        {
          path: "/about",
          element: <About/>
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
          path: "/edit/:id",
          element: isLoggedIn ? <AskQuestion/> :  <Navigate to="/login"/>
        },
        {
          path: "/questions",
          element: <Questions/>
        },
        {  
          path: "/Profile/:id",
          element: isLoggedIn ? <Profile/> :  <Navigate to="/login"/>
        },
        {
          path: "/tags",
          // element: <Tags/>
          element: <NotFound activeLink={"tags"}/>
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
      <RouterProvider router={router} />
  )
}

export default App