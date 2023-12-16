import { useState } from "react";
import apiContext from "./apiContext";



const ApiContextProvider = ({ children }:any) => {
    const [apiUrl,setApiUrl] = useState("https://stackoverflowserver-kfph.onrender.com")


    return (
        <apiContext.Provider value={{apiUrl,setApiUrl}}>
            {children}
        </apiContext.Provider>
    )
}

export default ApiContextProvider
