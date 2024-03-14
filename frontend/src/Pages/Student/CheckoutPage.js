import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import useLoggedIn from "../../hooks/useLoggedIn";

const CheckoutPage = () => {
  const { auth } = useAuth();
  const { user } = useLoggedIn();
  const navigate = useNavigate();
  const { courseId, publisherId } = useParams();
  const [course, setCourse] = useState();
  const studentId = user?._id;
  if (!studentId) navigate(-1);
  const handleBuy = async () => {
    try {
      const res = await axios.post(
        `/student/${courseId}/purchase/${studentId}`
      );
      if(res.data.success) {
        navigate(`/student/${publisherId}/watchcourses`)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCourse = async () => {
    try {
      if (!auth) navigate(`/student/${publisherId}/log-in`);
      const res = await axios.get(`/user/get-course/${courseId}`);
      if (res.data.success) {
        setCourse(res.data.data);
        console.log("course found successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCourse();
  }, []);

  return (
    <section className="container mt-12">
      <div className="row col-12">
        {course && (
          <div className="card" style={{ width: "18rem" }}>
            <img
              className="card-img-top"
              src={course?.thumbnail}
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">{course.name}</h5>
              <p className="card-text">{course?.description}</p>
              <p className="card-text">{course?.priceINR}</p>
              <div className="flex justify-end">
                <button className="btn btn-primary" onClick={handleBuy}>
                  Buy now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CheckoutPage;
