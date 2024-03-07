import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { Form, Button, Alert } from "react-bootstrap";
import "../../styles/login.css";
import useAuth from "../../hooks/useAuth";
import useLoggedIn from "../../hooks/useLoggedIn";

const Login = () => {
  const { setAuth } = useAuth();
  const { setUser } = useLoggedIn();

  const [email, setEmail] = useState("student@student.com");
  const [password, setPassword] = useState("student");
  const location = useLocation();
  const publisherId = location.pathname.split("/")[2];

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [validate, setValidate] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      const data = {
        email,
        password,
        publisherId,
      };
      const res = await axios.post("/student/log-in", data);
      if (res.data.success) {
        navigate(`/publisher/${publisherId}`);
        const user = res?.data?.user;
        const role = res?.data?.user?.role || "STUDENT";
        const data = {
          user,
          role,
        };
        setAuth(data);
        setUser(res?.data?.data?.user);
        localStorage.setItem("token", res?.data?.data?.token);
      } else {
        setShow(true);
        setMessage(res.data.message);
      }
    } catch (error) {
      setShow(true);
      setValidate(true);
      if (!error?.response) {
        setMessage("No Server Response");
      } else if (error.response?.status === 400) {
        setMessage("Please fill all the details");
      } else {
        setMessage("Login failed");
      }
      localStorage.clear();
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="sign-in__wrapper">
      {/* Overlay */}
      <div className="sign-in__backdrop"></div>
      {/* Form */}
      <Form
        noValidate={validate}
        className="shadow p-4 bg-white rounded"
        onSubmit={handleSubmit}
      >
        <div className="h4 mb-2 text-center">Student's Sign In</div>
        {/* ALert */}
        {show ? (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            {message + "."}
          </Alert>
        ) : (
          <div />
        )}
        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Log In
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Logging In...
          </Button>
        )}
        {/* <div className="d-grid justify-content-end">
      <Button
        className="text-muted px-0"
        variant="link"
        onClick={handlePassword}
      >
        Not a user
      </Button>
    </div> */}
      </Form>
      {/* Footer */}
      <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
        Made by Hendrik C | &copy;2022
      </div>
    </div>
  );
};

export default Login;
