import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axios from "../../api/axios";

const WatchCourses = () => {
  const location = useLocation()
  const publisherId = location.pathname.split("/")[2];
  const [courses, setCourses] = useState();
  const getMycourses = async (e) => {
    try {
      const res = await axios.get(`user/get-publisher-courses/${publisherId}`);
      if (res.data.success) {
        setCourses(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMycourses()
  }, []);
  return <section>
    <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div className="row col-12">
            {courses && courses.length > 0 ? (
              courses.map((course, idx) => (
                <div className="col-12 col-md-4" key={idx}>
                  <Card  className=" mx-1 my-3">
                    <img
                      src={course?.thumbnail}
                      className="card-img-top"
                      alt="thumbnail"
                    />
                    <Card.Body>
                      <Card.Title>
                        <div className="bg-primary rounded text-center py-3 text-white">
                          {course?.courseFor}
                        </div>
                        <div className="h3 py-3">{course?.name}</div>
                      </Card.Title>
                      <Card.Text>{course?.description}</Card.Text>
                    </Card.Body>

                   
                  </Card>
                </div>
              ))
            ) : (
              <p>no course found</p>
            )}
          </div>
        </div>
      </div>
  </section>;
};

export default WatchCourses;
