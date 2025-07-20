import { createContext, useContext, useEffect, useState } from "react";
import { dummyCourses } from '../assets/assets';
 export const appContext = createContext()

export const AppContextProvider = (props)=> {

    const currency = import.meta.env.VITE_CURRENCY
    const [allCourses, setAllcourses] = useState([]);
    const fetchAllcourses = async ()=>{
        setAllcourses(dummyCourses)
    }
    useEffect(()=>{
        fetchAllcourses()
    }, [])
    const value = {
        currency,
        allCourses
    }
    return (
        <appContext.Provider value={value}>
            {props.children}
        </appContext.Provider>
    )

}
