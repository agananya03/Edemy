import React from 'react'

const CourseCard = ({course}) => {
  return (
    <div>
      <img src={course.courseThumbnail} alt="" />
      <div>
        <h3></h3>
      </div>
    </div>
  )
}

export default CourseCard
