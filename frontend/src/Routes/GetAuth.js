import { useEffect, useState } from "react";
import { Navigate, useLocation, Outlet, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import useLoggedIn from "../hooks/useLoggedIn";

const GetAuth = () => {
  const location = useLocation();
  const { user, setUser } = useLoggedIn();
  const { auth, setAuth } = useAuth();
  const [loading, setLoading] = useState(true);
  const from = location.pathname.split("/")[1] || "/";
  const publisherId = location.pathname.split("/")[2] || "/";

  const getLoggedInUser = async () => {
    try {
      const res = await axios.post(
        "/user/get-logged-in-user",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        const user = res?.data?.data?.user;
        const role = res?.data?.data?.user.role || "STUDENT";
        setUser(res?.data?.data?.user);
        const data = {
          user,
          role,
        };
        setAuth(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!user) getLoggedInUser();
  }, [user]);
  return loading ? <p>loading....</p> : <Outlet />;
};

export default GetAuth;
