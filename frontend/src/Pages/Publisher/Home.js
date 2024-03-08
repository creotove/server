import React from "react";
import Card from "react-bootstrap/Card";
import useLoggedIn from "../../hooks/useLoggedIn";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useLoggedIn();
  const navigate = useNavigate();
  return (
    <>
      <section className="d-flex justify-content-center h1">
        Welcome {user?.email}
      </section>
      <div className="container overflow-hidden">
        <div className="row gy-4">
          <div className="col-12 col-md-6" style={{ cursor: "pointer" }}>
            <Card className="bg-light">
              <Card.Body>
                <Card.Title>Create Course</Card.Title>
                create Course
              </Card.Body>
            </Card>
          </div>
          <div
            style={{ cursor: "pointer" }}
            className="col-12 col-md-6"
            onClick={() => {
              navigate(`build-website/edit`);
            }}
          >
            <Card className="bg-light">
              <Card.Body>
                <Card.Title>Build website</Card.Title>
                create Course
              </Card.Body>
            </Card>
          </div>
          <div style={{ cursor: "pointer" }} className="col-12 col-md-6">
            <Card className="bg-light">
              <Card.Body>
                <Card.Title>upload custom branding</Card.Title>
                create Course
              </Card.Body>
            </Card>
          </div>
          <div style={{ cursor: "pointer" }} className="col-12 col-md-6">
            <Card className="bg-light">
              <Card.Body>
                <Card.Title>personalize domain</Card.Title>
                create Course
              </Card.Body>
            </Card>
          </div>
          <div style={{ cursor: "pointer" }} className="col-12 col-md-6">
            <Card className="bg-light">
              <Card.Body>
                <Card.Title>add terms and condition</Card.Title>
                create Course
              </Card.Body>
            </Card>
          </div>
          <div style={{ cursor: "pointer" }} className="col-12 col-md-6">
            <Card className="bg-light">
              <Card.Body>
                <Card.Title> add Payment info</Card.Title>
                create Course
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
