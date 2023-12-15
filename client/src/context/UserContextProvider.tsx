import axios from "axios";
import UserContext from "./userContext";
import { useState,useEffect, useContext } from "react";
import apiContext from "./apiContext";

const UserContextProvider = ({children}:any) => {
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const [username,setUsername] = useState("")
    const [token,setToken] = useState("")
    const [userId,setUserId] = useState("")
    const [user,setUser] = useState({})
    const {apiUrl}:any = useContext(apiContext)


    // check if user is logged in or not
    useEffect(() => {    
        const token = localStorage.getItem("StackOverflowToken")
        const username = localStorage.getItem("StackOverflowUsername")
        if(token && username){
            setIsLoggedIn(true)
            setUsername(username)
            setToken(token)
        }
        token? axios.get(apiUrl+"user/"+token)
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