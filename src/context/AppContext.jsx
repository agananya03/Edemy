import { createContext, useContext, useEffect, useState } from "react";
import { dummyCourses } from '../assets/assets';
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

const AppContext = createContext(); // Make this private

export const AppContextProvider = (props) => {
    const currency = import.meta.env.VITE_CURRENCY
    const navigate = useNavigate()
    const [allCourses, setAllcourses] = useState([]);
    const [isEduactor, setIsEducator] = useState(true);
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    const fetchAllcourses = async () => {
        setAllcourses(dummyCourses)
    }
    //function to calculate average rating of course
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

    //function to calculate course chapter time
    const calculateChapterTime = (chapter)=>{
        let time = 0
        chapter.chapterContent.map((lecture) => time+=lecture.lectureDuration )
        return humanizeDuration(time*60*1000, {units: ["h", "m"]})
    }

    //function to calculate course duration 
    const calculateCourseDuration = (course) => {
        let time = 0
        course.courseContent.map((chapter)=> chapter.chapterContent.map((lecture) => time += lecture.lectureDuration))
        return humanizeDuration(time*60*1000, {units: ["h", "m"]})
    }

    //function to calculate no of lectures in the course
    const calculateNoOfLectures = (course) => {
        let totalLectures = 0
        course.courseContent.forEach(chapter => {
            if(Array.isArray(chapter.chapterContent)) {
                totalLectures += chapter.chapterContent.length
            }
        });
        return totalLectures;
    }

    //function to fetch user enrolled courses
    const fetchUserEnrolledCourses = async() => {
        setEnrolledCourses(dummyCourses)
    }

    useEffect(() => {
        fetchAllcourses()
        fetchUserEnrolledCourses()
    }, [])

    const value = {
        currency,
        allCourses,
        navigate,
        calculateRating,
        isEduactor, setIsEducator,
        calculateChapterTime,
        calculateCourseDuration,
        calculateNoOfLectures,
        enrolledCourses,
        fetchUserEnrolledCourses
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