import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import axios from "../../api/axios";
import useSteps from "../../hooks/useSteps";

const ManageCourse = () => {
  const [show, setShow] = useState(false); // Modal
  const [courses, setCourses] = useState(); //display courses
  const [editMode, setEditMode] = useState(false); //is edit mode
  const [courseId, setCourseId] = useState(""); //For Edit
  const navigate = useNavigate();

  const { setCurrentStep } = useSteps();
  // form Data
  const [name, setName] = useState("dummy test");
  const [thumbnail, setThumbnail] = useState("");
  const [courseFor, setCourseFor] = useState("Beginner");
  const [priceINR, setPriceINR] = useState(500);
  const [priceDollar, setPriceDollar] = useState(8);
  const [visible, setVisible] = useState(true);
  const [category, setCategory] = useState("dummy test");
  const [expiry, setExpiry] = useState(10);
  const [courseLanguage, setCourseLanguage] = useState("dummy test");
  const [limitUser, setLimitUser] = useState(true);
  const [description, setDescription] = useState("dummy test");

  const location = useLocation();
  const publisherId = location.pathname.split("/")[2];

  const getMycourses = async (e) => {
    try {
      const res = await axios.get(`user/get-publisher-courses/${publisherId}`);
      if (res.data.success) {
        setCourses(res.data.data);
        console.log(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (e, id) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      const res = await axios.delete(
        `/publisher/delete-course?courseId=${id}&publisherId=${publisherId}`
      );
      if (res.data.success) {
        getMycourses();
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
      <div className="flex justify-between">
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/publisher/${publisherId}/category`)}
          >
            Add Category
          </button>
        
      </div>
      <h1>My Courses</h1>
      <div className="d-flex justify-content-end">
        <Button
          onClick={() => {
            navigate(`/publisher/${publisherId}/add-new-course`);
            setCurrentStep(1);
          }}
        >
          Add New Course
        </Button>
      </div>
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

export default ManageCourse;
