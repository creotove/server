import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import useLoggedIn from "../../hooks/useLoggedIn";

const WatchCourses = () => {
  const { user } = useLoggedIn();
  const { auth } = useAuth();
  const { publisherId } = useParams();
  const navigate = useNavigate();
  const [courses, setCourses] = useState();
  const getStudentPurchasedCourse = async () => {
    try {
      const studentId = user?._id;
      const res = await axios.get(
        `/student/get-purchased-courses/${studentId}`
      );
      if (res.data.success) {
        setCourses(res.data.data.enrolledIn);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getStudentPurchasedCourse();
  }, [user, auth]);
  return (
    <section>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div className="row col-12">
            {courses && courses.length > 0 ? (
              courses.map((course, idx) => (
                <div className="col-12 col-md-4" key={idx}>
                  <Card className=" mx-1 my-3">
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
                      <Card.Text>
                        <div>{course?.description}</div>
                        <div
                          className="flex justify-end"
                          onClick={() =>
                            navigate(
                              `/student/${publisherId}/see-courses/${course._id}`
                            )
                          }
                        >
                          <button className="btn-primary btn">Watch now</button>
                        </div>
                      </Card.Text>
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
    </section>
  );
};

export default WatchCourses;
