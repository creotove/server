import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useLoggedIn from "../../hooks/useLoggedIn";

const Navbar = () => {
  const { auth, setAuth } = useAuth();
  const {  setUser } = useLoggedIn();
  const location = useLocation();
  const [publisherId, setPublisherId] = useState(location?.state?.id);
  useEffect(() => {
    setPublisherId(location?.pathname.split("/")[2]);
    console.log(location?.pathname.split("/")[2]);
  }, []);
  return (
    <div>
      <NavLink
        style={{ marginRight: "50px" }}
        to={`/publisher/${auth?.user?._id || publisherId}`}
        state={{ id: auth?.user?._id }}
      >
        Home
      </NavLink>
      <NavLink
        style={{ marginRight: "50px" }}
        to={`/publisher/${auth?.user?._id || publisherId}/about`}
        state={{ id: auth?.user?._id }}
      >
        About
      </NavLink>
      <NavLink
        style={{ marginRight: "50px" }}
        to={`/publisher/${auth?.user?._id || publisherId}/courses`}
        state={{ id: auth?.user?._id }}
      >
        Courses
      </NavLink>

      {auth?.user === null ? (
        <>
          <NavLink
            style={{ marginRight: "50px" }}
            to={`/publisher/${auth?.user?._id || publisherId}/sign-up`}
            state={{ id: auth?.user?._id }}
          >
            Sign up
          </NavLink>
          <NavLink
            style={{ marginRight: "50px" }}
            to={`/publisher/${auth?.user?._id || publisherId}/log-in`}
            state={{ id: auth?.user?._id }}
          >
            login in
          </NavLink>
        </>
      ) : (
        <>
          {auth?.role === "STUDENT" ? (
            <>
              <NavLink
                style={{ marginRight: "50px" }}
                to={`/publisher/${auth?.user?._id || publisherId}/watchcourses`}
                state={{ id: auth?.user?._id }}
              >
                watch Courses
              </NavLink>
              <NavLink
                style={{ marginRight: "50px" }}
                to={`/publisher/${auth?.user?._id || publisherId}/log-in`}
                onClick={(e) => {
                  localStorage.clear();
                  setAuth({ user: null });
                  setUser(null);
                }}
              >
                Log out
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                style={{ marginRight: "50px" }}
                to={`/publisher/${auth?.user?._id || publisherId}/editcourse`}
                state={{ id: auth?.user?._id }}
              >
                Manage course
              </NavLink>
              <NavLink
                style={{ marginRight: "50px" }}
                to={"/log-in"}
                onClick={(e) => {
                  localStorage.clear();
                }}
              >
                Log out
              </NavLink>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Navbar;
