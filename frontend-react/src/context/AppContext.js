import { createContext, useState, useContext } from 'react';

export const AppContext = createContext();

export const usePage = () => {
    return useContext(AppContext)
}


export default function AppProvider({ children }) {
    const [list, setList] = useState();

    return (
        <AppContext.Provider value={{ list, setList }}>
            {children}
        </AppContext.Provider>
    );
}