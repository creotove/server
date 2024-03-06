import React from 'react'
import { NavLink } from 'react-router-dom'

const Courses = () => {
  return (
    <>
    <div>Academy Courses</div>
    <NavLink style={{ marginRight: "50px" }} to={"/academy/watchCourses"}>
        watch courses
      </NavLink>
    </>
  )
}

export default Courses