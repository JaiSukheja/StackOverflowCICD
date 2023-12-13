import axios from "axios";
import UserContext from "./userContext";
import { useState,useEffect } from "react";

const UserContextProvider = ({children}:any) => {
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const [username,setUsername] = useState("")
    const [token,setToken] = useState("")
    const [userId,setUserId] = useState("")
    const [user,setUser] = useState({})


    // check if user is logged in or not
    useEffect(() => {    
        const token = localStorage.getItem("StackOverflowToken")
        const username = localStorage.getItem("StackOverflowUsername")
        if(token && username){
            setIsLoggedIn(true)
            setUsername(username)
            setToken(token)
        }
        token? axios.get("http://localhost:4444/user/"+token)
        .then((res) => {
            setUserId(res.data._id)
            setUser(res.data)
        })
        : setIsLoggedIn(false)
    }
    ,[setToken,setUsername,setIsLoggedIn,setUserId,setUser])

    return (
        <UserContext.Provider value={{isLoggedIn,setIsLoggedIn,username,setUsername,token,setToken,userId,setUserId,user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider