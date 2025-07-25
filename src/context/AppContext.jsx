import { createContext, useContext, useEffect, useState } from "react";
import { dummyCourses } from '../assets/assets';
import { useNavigate } from "react-router-dom";

const AppContext = createContext(); // Make this private

export const AppContextProvider = (props) => {
    const currency = import.meta.env.VITE_CURRENCY
    const navigate = useNavigate()
    const [allCourses, setAllcourses] = useState([]);
    const [isEduactor, setIsEducator] = useState(true);

    const fetchAllcourses = async () => {
        setAllcourses(dummyCourses)
    }

    const calculateRating = (course)=>{
        if(course.courseRatings.length == 0){
            return 0;
        }
        let totalRating = 0;
        course.courseRatings.forEach(rating => {
            totalRating += rating.rating
        })
        return totalRating/ course.courseRatings.length
    }
    useEffect(() => {
        fetchAllcourses()
    }, [])

    const value = {
        currency,
        allCourses,
        navigate,
        calculateRating,
        isEduactor, setIsEducator
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