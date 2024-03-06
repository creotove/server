import express from "express";
import CourseModel from "../models/CourseModel.js";
import TeacherModel from "../models/TeacherModel.js";
// import UserModel from "../models/UserModel.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

// course get
router.get("/courses/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).send({
        success: false,
        message: "Teacher Id is required",
      });
    }
    const teacher = await TeacherModel.findOne({ user_id: userId });
    if (!teacher) {
      return res.status(400).send({
        success: false,
        message: "Teacher not found",
      });
    }
    console.log(teacher);
    const courses = await CourseModel.find({
      createdBy: teacher._id,
    });

    if (!courses) {
      return res.status(404).send({
        success: false,
        message: "Courses not ",
      });
    }
    return res.status(200).send({
      success: true,
      data: courses,
      message: "Courses Found",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
});
// course create
router.post("/create", upload.any(), async (req, res) => {
  try {
    const { name, duration } = req.body;
    const { createdBy } = req.query;
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "Name of the course is required",
      });
    }
    if (!duration) {
      return res.status(400).send({
        success: false,
        message: "Duration of the course is required",
      });
    }
    if (!createdBy) {
      return res.status(400).send({
        success: false,
        message: "Creater of the course is required",
      });
    }
    const teacher = await TeacherModel.findOne({ user_id: createdBy });
    if (!teacher) {
      return res.status(401).send({
        message: "Teacher not found",
        success: true,
      });
    }
    const newCourse = await CourseModel.create({
      name,
      createdBy: teacher._id,
      duration,
    });
    if (!newCourse) {
      return res.status(401).send({
        message: "Cannot Create New Course",
        success: true,
      });
    }
    teacher.myCourses.push(newCourse._id);
    await teacher.save();

    return res.status(201).send({
      message: "course created succesfully",
      data: newCourse,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
});
// course delete
router.delete("/delete", async (req, res) => {
  try {
    const { courseId } = req.query;
    if (!courseId) {
      return res.status(400).send({
        success: false,
        message: "Course Id not found",
      });
    }
    const course = await CourseModel.findByIdAndDelete(courseId);
    if (!course) {
      return res.status(404).send({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).send({
      message: "Course deleted succesfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
});
// course Update
router.patch("/update", async (req, res) => {
  try {
    const { courseId } = req.query;
    const { name, duration } = req.body;
    if (!name || !duration) {
      return res.status(400).send({
        success: false,
        message: "Name or Duration is required",
      });
    }
    const course = await CourseModel.findById(courseId);
    if (!course) {
      return req.status(404).send({
        success: false,
        message: "Course not found",
      });
    }
    if (name) {
      course.name = name;
    }
    if (duration) {
      course.duration = duration;
    }
    await course.save();
    return res.status(200).send({
      message: "Course updated succesfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
});

export default router;
