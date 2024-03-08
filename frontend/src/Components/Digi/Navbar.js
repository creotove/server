import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <NavLink style={{marginRight: '50px'}} to={"/"}>Home</NavLink>
      <NavLink style={{marginRight: '50px'}} to={"/about"}>About</NavLink>
      <NavLink style={{marginRight: '50px'}} to={"/sign-up"}>Sign up</NavLink>
      <NavLink style={{marginRight: '50px'}} to={"/log-in"}>log in</NavLink>
    </div>
  );
};

export default Navbar;
