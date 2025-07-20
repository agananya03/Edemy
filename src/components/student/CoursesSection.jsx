import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { appContext } from '../../context/AppContext';
import CourseCard from './CourseCard';

const CoursesSection = () => {
  const { allCourses } = useContext(appContext);

  const topCourses = allCourses?.slice(0, 4) || [];

  return (
    <div className="px-8 md:px-40 py-16">
      <h2 className="text-3xl font-medium text-gray-800">Learn from the best</h2>
      <p className="text-sm md:text-base text-gray-500 mt-3">
        Discover our top-rated courses across various categories. From coding and design to business and wellness, our courses are crafted to deliver results.
      </p>

      <div className="my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {topCourses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>

      <Link
        to="/course-list"
        onClick={() => scrollTo(0, 0)}
        className="text-gray-500 border border-gray-500/30 px-10 py-3 rounded"
      >
        Show all courses
      </Link>
    </div>
  );
};

export default CoursesSection;
