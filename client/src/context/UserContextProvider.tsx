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
      return () => {
        const token = localStorage.getItem("StackOverflowToken")
        const username = localStorage.getItem("StackOverflowUsername")
        if(token && username){
            setIsLoggedIn(true)
            setUsername(username)
            setToken(token)
        }
      }
    }, [])

    return (
        <UserContext.Provider value={{isLoggedIn,setIsLoggedIn,username,setUsername,token,setToken,userId,setUserId,user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider