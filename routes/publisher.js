import express from "express";
import {
  createCourse,
  logIn,
  signUp,
} from "../controllers/publisherCtrl.js";
import { upload } from "../middlewares/multer.js";
const router = express.Router();

router.post("/sign-up", signUp);
router.post("/log-in", logIn);
router.post("/create-course",upload.single('thumbnail'), createCourse);

export default router;
