import { createContext, useContext, useEffect, useState } from "react";
import { dummyCourses } from '../assets/assets';

const AppContext = createContext(); // Make this private

export const AppContextProvider = (props) => {
    const currency = import.meta.env.VITE_CURRENCY
    const [allCourses, setAllcourses] = useState([]);

    const fetchAllcourses = async () => {
        setAllcourses(dummyCourses)
    }

    useEffect(() => {
        fetchAllcourses()
    }, [])

    const value = {
        currency,
        allCourses
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

// Export a custom hook instead of the context directly
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within AppContextProvider');
    }
    return context;
}