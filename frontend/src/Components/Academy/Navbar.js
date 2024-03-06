import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>

      <NavLink style={{marginRight: '50px'}} to={'/academy'}>Home</NavLink>
      <NavLink style={{marginRight: '50px'}} to={'/academy/about'}>About</NavLink>
      <NavLink style={{marginRight: '50px'}} to={'/academy/sign-up'}>Sign up</NavLink>
      <NavLink style={{marginRight: '50px'}} to={'/academy/courses'}>Courses</NavLink>
      <NavLink style={{marginRight: '50px'}} to={'/academy/log-in'}>Login up</NavLink>
    </div>
  )
}

export default Navbar