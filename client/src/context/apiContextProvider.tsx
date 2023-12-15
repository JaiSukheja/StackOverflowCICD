import { useEffect, useState } from "react";
import apiContext from "./apiContext";
import axios from "axios";



const ApiContextProvider = ({ children }:any) => {
    const [apiUrl,setApiUrl] = useState("http://localhost:4444")

    useEffect(() => {
        axios.get("https://stack-overflow-clone-server-three.vercel.app/")
        .then((res) => {
            res.data==="Server is up and running" ? setApiUrl("https://stack-overflow-clone-server-three.vercel.app/"): setApiUrl("http://localhost:4444");
        })
        .catch((err) => {
            console.log(err)
        })  
    }, [])

    return (
        <apiContext.Provider value={{apiUrl,setApiUrl}}>
            {children}
        </apiContext.Provider>
    )
}

export default ApiContextProvider
