import express from "express";
// import CourseModel from '../models/CourseModel.js'
// import StudentModel from '../models/StudentModel.js'
import {
  signUp,
  logIn,
  purchaseCourse,
  getPurchasedCoruses,
  seePurchasedCourse
} from "../controllers/studentCtrl.js";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/log-in", logIn);
router.post("/:courseId/purchase/:studentId", purchaseCourse);
router.get("/get-purchased-courses/:studentId", getPurchasedCoruses);
router.get("/see-purchased-courses/:courseId/:studentId",seePurchasedCourse)
export default router;
