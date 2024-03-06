import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <NavLink style={{marginRight: '50px'}} to={"/publisher/:publisherId"}>Home</NavLink>
      <NavLink style={{marginRight: '50px'}} to={"/publisher/:publisherId/about"}>About</NavLink>
      <NavLink style={{marginRight: '50px'}} to={"/publisher/:publisherId/courses"}>Courses</NavLink>
      <NavLink style={{marginRight: '50px'}} to={"/publisher/:publisherId/sign-up"}>Sign up</NavLink>
      <NavLink style={{marginRight: '50px'}} to={"/publisher/:publisherId/log-in"}>login up</NavLink>
    </div>
  );
};

export default Navbar;
