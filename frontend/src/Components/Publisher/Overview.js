import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../api/axios";
import useCourse from "../../hooks/useCourse";
import defaultThumbnail from "../../assets/thumbnail/thumbnail.png";

function CourseSettings() {
  const { course, setCourse } = useCourse();
  const location = useLocation();
  const [categories, setCategories] = useState();

  const publisherId = location.pathname.split("/")[2];
  const [thumbnailFrntEnd, setThumbnailFrntEnd] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [inrPrice, setInrPrice] = useState(0);
  const [usdPrice, setUsdPrice] = useState(0);
  const [language, setLanguage] = useState("English");
  const [readerLevel, setReaderLevel] = useState("Beginner");
  const [visibleToPublic, setVisibleToPublic] = useState(true);
  const [featuredCourse, setFeaturedCourse] = useState(false);
  const [category, setCategory] = useState();
  const [courseExpiry, setCourseExpiry] = useState(0);
  const [courseExpiryDate, setCourseExpiryDate] = useState();
  const [limitCourseSales, setLimitCourseSales] = useState();
  const [limit, setLimit] = useState(0);

  const updateCourseSettings = () => {
    setCourse((prevCourse) => ({
      ...prevCourse,
      inrPrice,
      usdPrice,
      language,
      readerLevel,
      section: course?.section,
      visibleToPublic,
      featuredCourse,
      thumbnail: thumbnail || defaultThumbnail,
      category,
      courseExpiry,
      courseExpiryDate: courseExpiry === 0 ? 0 : courseExpiryDate,
      limitCourseSale: limit === 0 ? 0 : limitCourseSales,
      limit,
    }));
  };

  const getMyCategories = async () => {
    try {
      const res = await axios.get(`/publisher/get-categories/${publisherId}`);
      if (res.data.success) {
        setCategories(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourse({ ...course, thumbnail: file });
      setThumbnail(file);
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnailFrntEnd(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post("/publisher/create-course", course, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
      }
    } catch (error) {
      console.log("Error in creating course");
      console.log(error);
    }
  };
  useEffect(() => {
    updateCourseSettings();
  }, [
    inrPrice,
    usdPrice,
    language,
    readerLevel,
    visibleToPublic,
    featuredCourse,
    category,
    courseExpiry,
    courseExpiryDate,
    limitCourseSales,
    limit,
  ]);
  useEffect(() => {
    getMyCategories();
  }, []);
  useEffect(() => {
    if (categories) setCategory(categories[0]?.name);
  }, [categories]);
  return (
    <section className="col-12">
      <div>
        {/* Image and the course name */}
        <div className=" col-12 row">
          <div className="relative col-12 col-md-4">
            <div className="relative">
              <img
                className="col-12 object-contain"
                src={thumbnailFrntEnd ? thumbnailFrntEnd : defaultThumbnail}
                alt="thumbnail"
              />
              <div className="bg-black w-full h-full absolute top-0 opacity-55"></div>
            </div>
            <label className="label absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <input
                type="file"
                accept="image/png, image/webp, image/jpeg"
                onChange={handleFileChange}
                required
              />
              <span>+</span>
            </label>
          </div>
          <div className="col-12 col-md-7">
            <h2>Course Name</h2>
            <input
              type="text"
              onChange={(e) => {
                setCourse({ ...course, name: e.target.value });
              }}
              value={course && course?.name}
              className="col-12 bg-transparent outline-0 border-b-2 border-white"
            />
          </div>
        </div>
        <div className="col-12 mt-5 flex flex-wrap">
          <div className="col-12 col-md-6 mb-3">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Course Language</div>
                <div className="card-body">
                  <select
                    className="col-12 bg-transparent outline-0 border-b-2 border-black"
                    // className="selectpicker"
                    value={language}
                    onChange={(e) => {
                      setLanguage(e.target.value);
                    }}
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Tamil">Tamil</option>
                    {/* Add other language options here */}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 mb-3">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Course reader level</div>
                <div className="card-body">
                  <select
                    className="col-12 bg-transparent outline-0 border-b-2 border-black"
                    // className="selectpicker"
                    value={readerLevel}
                    onChange={(e) => {
                      setReaderLevel(e.target.value);
                    }}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Elementary">Elementary</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Upper Intermediate">
                      Upper Intermediate
                    </option>
                    <option value="Advanced">Advanced</option>
                    {/* Add other language options here */}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 mb-3">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Course Inr price</div>
                <div className="card-body">
                  <input
                    type="text"
                    value={inrPrice}
                    onChange={(e) => {
                      setInrPrice(e.target.value);
                    }}
                    className="col-12 bg-transparent outline-0 border-b-2 border-black"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 mb-3">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Course USD price</div>
                <div className="card-body">
                  <input
                    type="text"
                    value={usdPrice}
                    onChange={(e) => setUsdPrice(e.target.value)}
                    className="col-12 bg-transparent outline-0 border-b-2 border-black"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 mb-3">
            <div className="card">
              <div className="card-header">
                <div className="card-title flex items-center">
                  Visible to public
                  <input
                    className="ms-2"
                    type="checkbox"
                    checked={visibleToPublic}
                    onChange={(e) => setVisibleToPublic(e.target.checked)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 mb-3">
            <div className="card">
              <div className="card-header">
                <div className="card-title flex items-center">
                  Featured Course
                  <input
                    className="ms-2"
                    type="checkbox"
                    checked={featuredCourse}
                    onChange={(e) => setFeaturedCourse(e.target.checked)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 mb-3">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Course Category</div>
                <div className="card-body">
                  <select
                    className="col-12 bg-transparent outline-0 border-b-2 border-black"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                  >
                    {categories && categories.length > 0 ? (
                      categories.map((category, idx) => (
                        <option key={idx}>{category.name}</option>
                      ))
                    ) : (
                      <option value={undefined}>No categories found</option>
                    )}
                    {/* Add other language options here */}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 mb-3">
            <div className="card">
              <div className="card-header">
                <div className="card-title flex items-center">
                  Set course expiry in days{" "}
                  <input
                    type="checkbox"
                    className="me-3"
                    checked={courseExpiry}
                    onChange={(e) => {
                      setCourseExpiryDate(0);
                      setCourseExpiry(e.target.checked);
                    }}
                  />
                </div>
                {courseExpiry ? (
                  <div className="card-body">
                    <input
                      type="number"
                      value={courseExpiryDate}
                      onChange={(e) => {
                        setCourseExpiryDate(e.target.value);
                      }}
                      className="col-12 bg-transparent outline-0 border-b-2 border-black"
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 mb-3">
            <div className="card">
              <div className="card-header">
                <div className="card-title flex items-center">
                  Limit course sales
                  <input
                    type="checkbox"
                    className="me-3"
                    checked={limit}
                    onChange={(e) => {
                      setLimitCourseSales(0);
                      setLimit(e.target.checked);
                    }}
                  />
                </div>
                {limit ? (
                  <div className="card-body">
                    <input
                      type="number"
                      value={limitCourseSales}
                      onChange={(e) => {
                        setLimitCourseSales(e.target.value);
                      }}
                      className="col-12 bg-transparent outline-0 border-b-2 border-black"
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button onClick={handleSubmit} className="btn btn-primary">
            Publish
          </button>
        </div>
      </div>
    </section>
  );
}

export default CourseSettings;
