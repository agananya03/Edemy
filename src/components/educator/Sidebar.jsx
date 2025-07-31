import React from 'react'
import assets from '../../assets/assets'
import { useAppContext } from '../../context/AppContext';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {

  const {isEducator} = useAppContext()

  const menuItems = [
    {name: 'Dashboard', path: '/educator', icon: assets.home_icon},
    {name: 'Add Course', path: '/educator/add-course', icon: assets.add_icon},
    {name: 'My Courses', path: '/eduactor/my-courses', icon: assets.my_course_icon},
    {name: 'Student Enrolled', path: '/eduactor/student-enrolled', icon: assets.person_tick_icon},
  ];
  return isEducator && (
    <div className='md:w-64 w-16 border-r min-h-screen text-base border-gray-500 py-2 flex flex-col'>
      {menuItems.map((item)=>{
        <NavLink>
          <img src={item.icon} alt="" className='w-6 h-6'/>
          <p className='md:block hidden text-center'>{item.name}</p>
        </NavLink>
      })}
    </div>
  )
}

export default Sidebar
