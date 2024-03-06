import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const TestLayout = () => {
  return (
    <>
      <nav>
        <NavLink
          to="/editor"
          style={{
            marginRight: "50px",
          }}
        >
          Editor
        </NavLink>
        <NavLink
          to="/"
          style={{
            marginRight: "50px",
          }}
        >
          Home
        </NavLink>
        <NavLink
          to="/log-in"
          style={{
            marginRight: "50px",
          }}
        >
          Login
        </NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default TestLayout;
