import { createContext, useState, useContext } from 'react';

export const AppContext = createContext();

export const useMode = () => {
    return useContext(AppContext)
}


export default function AppProvider({ children }) {
    const [dark, setDark] = useState(false);

    return (
        <AppContext.Provider value={{ dark, setDark }}>
            {children}
        </AppContext.Provider>
    );
}