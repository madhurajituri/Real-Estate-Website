import { createContext, useContext, useEffect, useState } from "react";
import { io } from 'socket.io-client';
import { AuthContext } from "./AuthContext.jsx";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {

    const [socket, setsocket] = useState(null);
    const { currentuser } = useContext(AuthContext);

    useEffect(() => {
        setsocket(io("http://localhost:4000"));
    }, []);

    useEffect(() => {
        currentuser && socket?.emit("newUser", currentuser.id);
    }, [currentuser, socket])

    // console.log(currentuser);

    return (
        <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>
    )
}