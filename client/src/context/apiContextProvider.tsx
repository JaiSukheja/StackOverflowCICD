import { useState } from "react";
import apiContext from "./apiContext";



const ApiContextProvider = ({ children }: any) => {
 //    const [apiUrl, setApiUrl] = useState("https://stackoverflowserver-kfph.onrender.com")
const [apiUrl, setApiUrl] = useState("http://54.198.135.222:4444")


    return (
        <apiContext.Provider value={{ apiUrl, setApiUrl }}>
            {children}
        </apiContext.Provider>
    )
}

export default ApiContextProvider
