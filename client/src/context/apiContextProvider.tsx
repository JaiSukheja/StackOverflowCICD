import { useEffect, useState } from "react";
import apiContext from "./apiContext";
import axios from "axios";



const ApiContextProvider = ({ children }:any) => {
    const [apiUrl,setApiUrl] = useState("https://stack-overflow-clone-server-three.vercel.app/")

    useEffect(() => {
        axios.get("https://stack-overflow-clone-server-three.vercel.app/")
        .then(async (res) => {
            res.data ? console.log(res.data): console.log("error")
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
