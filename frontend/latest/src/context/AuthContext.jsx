import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {


    const [currentuser, setcurrentuser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    )

    const updateuser = (data) => {
        setcurrentuser(data);
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentuser));
    }, [currentuser]);

    // console.log(currentuser);
     
    return (
        <AuthContext.Provider value={{ currentuser, updateuser }}>{children}</AuthContext.Provider>
    )
}