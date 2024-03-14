import { useEffect, useState } from "react";
import {
  Navigate,
  useLocation,
  Outlet,
  useNavigate,
  useParams,
} from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
  const location = useLocation();
  const { publisherId } = useParams();
  const from = location.pathname.split("/")[1] || "/";
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
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
      if (from === "publisher") {
        console.log("redirecting to publisher");
        navigate("/log-in");
      } else {
        navigate(`/student/${publisherId}/log-in`);
        console.log("redirecting to the student");
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAuthenticateUser();
  }, []);
  return (
    <>
      {loading ? <p> loading</p> : <Outlet />}
      {/* {loading && <p>loading....</p>}
      {auth.user !== null ? (
        <Outlet />
      ) : from === "publisher" && auth?.role === "PUBLISHER" ? (
        <Navigate to="/log-in" state={{ from: location.pathname }} replace />
      ) : from === "student" ? (
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
      )} */}
    </>
  );
};

export default RequireAuth;
