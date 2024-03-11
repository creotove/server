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
    <div className="d-flex flex-column bg-black vh-100 text-nowrap">
      <button
        className="bg-white text-decoration-none text-black h3 p-3 w-100"
        onClick={() =>
          navigate(`/publisher/${auth?.user?._id || publisherId}`, {
            state: { id: auth?.user?._id },
          })
        }
      >
        Digital Rojgar
      </button>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "bg-primary text-decoration-none text-white p-3 w-100"
            : "text-white p-3"
        }
        end
        to={`/publisher/${auth?.user?._id || publisherId}`}
        state={{ id: auth?.user?._id }}
      >
        Start up
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "bg-primary  text-white p-3 w-100" : "text-white p-3"
        }
        end
        to={`/publisher/${auth?.user?._id || publisherId}/about`}
        state={{ id: auth?.user?._id }}
      >
        About
      </NavLink>
      {auth?.user === null ? (
        <>
          <NavLink
            style={{ marginRight: "50px" }}
            to={`/publisher/${auth?.user?._id || publisherId}/sign-up`}
            state={{ id: auth?.user?._id }}
            className={({ isActive }) =>
              isActive ? "bg-primary  text-white p-3 w-100" : "text-white p-3"
            }
          >
            Sign up
          </NavLink>
          <NavLink
            style={{ marginRight: "50px" }}
            to={`/publisher/${auth?.user?._id || publisherId}/log-in`}
            state={{ id: auth?.user?._id }}
            className={({ isActive }) =>
              isActive ? "bg-primary  text-white p-3 w-100" : "text-white p-3"
            }
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
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary  text-white p-3 w-100"
                    : "text-white p-3"
                }
              >
                watch Courses
              </NavLink>
              <NavLink
                style={{ marginRight: "50px" }}
                to={`/publisher/${auth?.user?._id || publisherId}/log-in`}
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary  text-white p-3 w-100"
                    : "text-white p-3"
                }
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
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary  text-white p-3 w-100"
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
                    ? "bg-primary  text-white p-3 w-100"
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
