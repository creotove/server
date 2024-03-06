// import useAuth from "../../hooks/useAuth";
// import axios from "../../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
const Login = () => {
  // const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      console.log("login");
      // const res = await axios.post("/auth/login", {
      //   username: e.target[0].value,
      //   password: e.target[1].value,
      // });

      // if (res.data.success) {
      //   setAuth(res.data.data);
        navigate(from, { replace: true });
      // }
    } catch (error) {}
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
