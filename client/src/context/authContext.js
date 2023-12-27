import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

//storing user data in multiple pages and componenets
export const AuthContextProvider = ({children}) => {
    //local storage
    const[currentUser , setcurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);


    const login = async (inputs) =>{
        const res = await axios.post("/auth/login" , inputs);
        setcurrentUser(res.data)
    };

    //logout
    const logout = async (inputs) =>{
        await axios.post("/auth/logout");
        setcurrentUser(null)
    };

    useEffect(() =>{
        localStorage.setItem("user" , JSON.stringify(currentUser));
    } , [currentUser]);

    return(
        <AuthContext.Provider value={{currentUser , login , logout}}>
            {children}
        </AuthContext.Provider>
    )
}