import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { Form, Button, Alert } from "react-bootstrap";
import "../../styles/login.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        name,
        mobileNumber,
        email,
        password,
      };
      const res = await axios.post("/publisher/sign-up", data);
      if (res.data.success) {
        navigate("/log-in");
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
        setMessage("Error in creating Account");
      }
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
        autoComplete="off"
      >
        <div className="h4 mb-2 text-center">Sign Up</div>
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
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Mobile number</Form.Label>
          <Form.Control
            type="number"
            value={mobileNumber}
            placeholder="Mobile number"
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
        </Form.Group>

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
            Sign up
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Signing In...
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

export default SignUp;
