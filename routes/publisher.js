import express from "express";
import {
  logIn,
  signUp,
  deleteCourse,
  getPublisherCategory,
  createCategory,
  createNewCourse,
} from "../controllers/publisherCtrl.js";
import { upload } from "../middlewares/multer.js";
const router = express.Router();

router.get('/get-categories/:publisherId',getPublisherCategory)


router.post("/sign-up", signUp);
router.post("/log-in", logIn);
// router.post("/create-course",upload.any(), createCourse,createSections);
router.post("/create-course",upload.any(),createNewCourse);
router.post('/create-category',createCategory)
router.delete('/delete-course',deleteCourse);

export default router;
