import { Navigate, useLocation, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.pathname.split("/")[1] || "/";
  const { auth } = useAuth();
  return auth.user ? (
    <Outlet />
  ) : from === "publisher" ? (
    <Navigate
      to="/publisher/:publisherId/log-in"
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
  );
};

export default RequireAuth;
