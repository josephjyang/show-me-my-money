import { createContext, useState, useContext } from 'react';

export const AppContext = createContext();

export const useMode = () => {
    return useContext(AppContext)
}


export default function AppProvider({ children }) {
    const [dark, setDark] = useState("");
    const [chatroom, setChatroom] = useState("");

    return (
        <AppContext.Provider value={{ dark, setDark, chatroom, setChatroom }}>
            {children}
        </AppContext.Provider>
    );
}