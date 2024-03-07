import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Card, ListGroup, Table } from "react-bootstrap";
import axios from "../../api/axios";
import Modal from "react-bootstrap/Modal";

const EditCourse = () => {
  const [show, setShow] = useState(false); // Modal
  const [courses, setCourses] = useState(); //display courses
  const [editMode, setEditMode] = useState(false); //is edit mode
  const [courseId, setCourseId] = useState(""); //For Edit

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

  const handleClose = () => {
    setEditMode(false);
    setShow(false);
    setName("");
    setThumbnail("");
    setCourseFor("");
    setPriceINR("");
    setPriceDollar("");
    setVisible();
    setCategory("");
    setExpiry("");
    setCourseLanguage("");
    setLimitUser();
    setDescription("");
    setCourseId("");
  };
  const handleShow = () => {
    setEditMode(false);
    setShow(true);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = new FormData();
      data.append("name", name);
      data.append("createdBy", publisherId);
      data.append("description", description);
      data.append("thumbnail", thumbnail);
      data.append("courseFor", courseFor);
      data.append("priceDollar", priceDollar);
      data.append("priceINR", priceINR);
      data.append("visible", visible);
      data.append("category", category);
      data.append("expiry", expiry);
      data.append("courseLanguage", courseLanguage);
      data.append("limitUser", limitUser);
      let res;
      if (editMode) {
        res = await axios.post("/publisher/update-course", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        res = await axios.post("/publisher/create-course", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      if (res.data.success) {
        console.log("course created");
        setShow(false);
        getMycourses()
      }

      // use the edit mode to toggle
    } catch (error) {
      console.log("Error in creating course");
      console.log(error);
    }
  };
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

  const handleDelete = async (e, id) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      const res = await axios.delete(`/teacher/delete?courseId=${id}`);
      if (res.data.success) {
        // getMycourses();
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
      <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Course</Modal.Title>
        </Modal.Header>
        <Modal.Body className="my-3">
          <form>
            <div className="row col-12">
              {/* name */}
              <div className="mb-3 col-12 col-md-4 d-flex justify-content-between">
                <label>name </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {/* thumbnail */}
              <div className="mb-3 col-12 col-md-4 d-flex justify-content-between">
                <label>thumbnail </label>
                <input
                  type="file"
                  className="border rounded ms-2"
                  onChange={(e) => setThumbnail(e.target.files[0])}
                />
              </div>
              {/* courseFor */}
              <div className="mb-3 col-12 col-md-4 d-flex justify-content-between">
                <label>courseFor </label>
                <input
                  type="text"
                  value={courseFor}
                  onChange={(e) => setCourseFor(e.target.value)}
                />
              </div>
              {/* priceINR */}
              <div className="mb-3 col-12 col-md-4 d-flex justify-content-between">
                <label>priceINR </label>
                <input
                  type="text"
                  value={priceINR}
                  onChange={(e) => setPriceINR(e.target.value)}
                />
              </div>
              {/* priceDollar */}
              <div className="mb-3 col-12 col-md-4 d-flex justify-content-between">
                <label>priceDollar </label>
                <input
                  type="text"
                  value={priceDollar}
                  onChange={(e) => setPriceDollar(e.target.value)}
                />
              </div>
              {/* visible */}
              <div className="mb-3 col-12 col-md-4">
                <label className="me-3">visible </label>
                <input
                  type="checkbox"
                  checked={visible}
                  onChange={(e) => setVisible(e.target.value)}
                />
              </div>
              {/* category */}
              <div className="mb-3 col-12 col-md-4 d-flex justify-content-between">
                <label>category </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              {/* expiry */}
              <div className="mb-3 col-12 col-md-4 d-flex justify-content-between">
                <label>expiry </label>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                />
              </div>
              {/* courseLanguage */}
              <div className="mb-3 col-12 col-md-4 d-flex justify-content-between">
                <label>courseLanguage </label>
                <input
                  type="text"
                  value={courseLanguage}
                  onChange={(e) => setCourseLanguage(e.target.value)}
                />
              </div>
              {/* limitUser */}
              <div className="mb-3 col-12 col-md-4">
                <label className="me-3">limitUser </label>
                <input
                  type="checkbox"
                  checked={limitUser}
                  onChange={(e) => setLimitUser(e.target.value)}
                />
              </div>

              {/* description */}
              <label>description </label>
              <div className="mb-3 col-12">
                <textarea
                  rows={3}
                  cols={50}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button
                type="submit"
                onClick={(e) => handleSubmit(e)}
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <h1>My Courses</h1>
      <div className="d-flex justify-content-end">
        <Button onClick={handleShow}>Add New Course</Button>
      </div>
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
                      <Card.Text>{course?.description}</Card.Text>
                    </Card.Body>

                    <div className="p-3 d-flex justify-content-between">
                      <button
                        className="btn btn-primary"
                        onClick={(e) => {
                          e.preventDefault();
                          setName(course?.name);
                          setThumbnail("");
                          setCourseFor(course?.courseFor);
                          setPriceINR(course?.priceINR);
                          setPriceDollar(course?.priceDollar);
                          setVisible(course?.visible);
                          setExpiry(course?.expiry);
                          setCourseLanguage(course?.courseLanguage);
                          setLimitUser(course?.limitUser);
                          setDescription(course?.description);
                          setShow(true);
                          setEditMode(true);
                        }}
                      >
                        Edit
                      </button>
                      <button className="btn btn-danger" onClick={(e)=>handleDelete(e,course._id)}>Delete</button>
                    </div>
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

export default EditCourse;
