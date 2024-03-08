import { useEffect, useState } from "react";
import { Navigate, useLocation, Outlet, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
  const location = useLocation();
  const from = location.pathname.split("/")[1] || "/";
  const publisherId = location.pathname.split("/")[2] || "/";
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const getAuthenticateUser = async () => {
    try {
      const res = await axios.post(
        "/user/get-authenticated-user",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        const user = res?.data?.data?.user;
        const role = res?.data?.data?.user?.role || "STUDENT";
        const data = {
          user,
          role,
        };
        setAuth(data);
      } else {
        localStorage.clear();
        if (from === "publisher" && res?.data?.user.role === "PUBLISHER") {
          navigate("/log-in");
        } else if (from === "publisher" && res?.data?.user.role === "STUDENT")
          navigate(`/student/${publisherId}/log-in`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAuthenticateUser();
  }, []);
  return (
    <>
      {loading && <p>loading....</p>}
      {auth?.user !== null ? (
        <Outlet />
      ) : from === "publisher" && auth?.role === "PUBLISHER" ? (
        <Navigate to="/log-in" state={{ from: location.pathname }} replace />
      ) : from === "publisher" ? (
        <Navigate
          to={`/student/${publisherId}/log-in`}
          state={{ from: location.pathname }}
          replace
        />
      ) : from === "academy" ? (
        <Navigate
          to="/academy/log-in"
          state={{ from: location.pathname }}
          replace
        />
      ) : (
        <Navigate to="/log-in" state={{ from: location.pathname }} replace />
      )}
    </>
  );
};

export default RequireAuth;
