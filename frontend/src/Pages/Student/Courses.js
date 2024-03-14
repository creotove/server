import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useLoggedIn from "../../hooks/useLoggedIn";

const Courses = () => {
  const location = useLocation();
  const { user } = useLoggedIn();
  const publisherId = location.pathname.split("/")[2];
  const [courses, setCourses] = useState();
  const studentId = user?._id;
  const navigate = useNavigate();
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
    getMycourses();
  }, []);
  return (
    <section className="container-fluid mt-5 ">
      <h1>Courses</h1>
      <div className="container-fluid row col-12">
        <div className="row col-12 ">
          <div className="row col-12 ">
            <div className="flex flex-wrap">
              {courses && courses.length > 0 ? (
                courses.map((course, idx) => (
                  <div className="card col-12 col-md-5 m-1" key={idx}>
                    <img
                      className="card-img-top h-44 object-cover"
                      src={course?.thumbnail}
                      alt="Card image cap"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{course?.name}</h5>
                      <p className="card-text">{course?.description}</p>
                      <div className="d-flex justify-end">
                        <button
                          onClick={(e) =>
                            navigate(
                              `/student/${publisherId}/checkout-page/${course?._id}`
                            )
                          }
                          className="btn btn-primary"
                          disabled={course?.enrolledBy.includes(studentId)}
                        >
                          {course?.enrolledBy.includes(studentId)
                            ? "Enrolled"
                            : "Enroll"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <p>No courses found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;
