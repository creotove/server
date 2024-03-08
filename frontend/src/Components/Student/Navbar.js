import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useLoggedIn from "../../hooks/useLoggedIn";

const Navbar = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const { setUser } = useLoggedIn();
  const location = useLocation();
  const [publisherId, setPublisherId] = useState(location?.state?.id);
  useEffect(() => {
    setPublisherId(location?.pathname.split("/")[2]);
  }, []);
  return (
    <div className="bg-black text-nowrap d-flex container-fluid">
      <button
        className="bg-white text-decoration-none text-black p-3 h4 d-flex justify-content-center me-5"
        onClick={() =>
          navigate(`/student/${auth?.user?._id || publisherId}`, {
            state: { id: auth?.user?._id },
          })
        }
      >
        Digital Rojgar
      </button>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "bg-primary text-decoration-none text-white p-3 "
            : "text-white p-3"
        }
        end
        to={`/student/${auth?.user?._id || publisherId}`}
        state={{ id: auth?.user?._id }}
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "bg-primary  text-white p-3 " : "text-white p-3"
        }
        end
        to={`/student/${auth?.user?._id || publisherId}/about`}
        state={{ id: auth?.user?._id }}
      >
        About
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "bg-primary  text-white p-3 " : "text-white p-3"
        }
        to={`/student/${auth?.user?._id || publisherId}/courses`}
        state={{ id: auth?.user?._id }}
      >
        Courses
      </NavLink>

      {auth?.user === null ? (
        <div className="ms-auto d-flex flex-direction-row">
          <NavLink
            style={{ marginRight: "50px" }}
            to={`/student/${auth?.user?._id || publisherId}/sign-up`}
            state={{ id: auth?.user?._id }}
            className={"d-flex align-items-center btn btn-primary"
            }
          >
            Sign up
          </NavLink>
          <NavLink
            style={{ marginRight: "50px" }}
            to={`/student/${auth?.user?._id || publisherId}/log-in`}
            state={{ id: auth?.user?._id }}
            className={"d-flex align-items-center btn btn-primary"}
          >
            login in
          </NavLink>
        </div>
      ) : (
        <>
          {auth?.role === "STUDENT" ? (
            <>
              <NavLink
                style={{ marginRight: "50px" }}
                to={`/student/${auth?.user?._id || publisherId}/watchcourses`}
                state={{ id: auth?.user?._id }}
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary  text-white p-3 "
                    : "text-white p-3"
                }
              >
                watch Courses
              </NavLink>
              <NavLink
                style={{ marginRight: "50px" }}
                to={`/student/${auth?.user?._id || publisherId}/log-in`}
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary  text-white p-3 "
                    : "text-white p-3"
                }
                onClick={() => {
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
                to={`/student/${auth?.user?._id || publisherId}/editcourse`}
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary  text-white p-3 "
                    : "text-white p-3"
                }
                state={{ id: auth?.user?._id }}
              >
                Manage course
              </NavLink>
              <NavLink
                style={{ marginRight: "50px" }}
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary  text-white p-3 "
                    : "text-white p-3"
                }
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
