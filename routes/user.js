import express from "express";
import { getAuthenticatedUser,getPublisherCourses,getLoggedInUser,getCourse } from "../controllers/userCtrl.js";
import { auth } from "../middlewares/auth.js";

// import {getMyprofile} from '../controllers/userCtrl.js'

const router = express.Router();

router.post("/get-authenticated-user", auth, getAuthenticatedUser);
router.post("/get-logged-in-user", auth, getLoggedInUser);
router.get('/get-publisher-courses/:publisherId',getPublisherCourses)
router.get('/get-course/:courseId',getCourse)

// // update profile
// router.patch("/update", async (req, res) => {
//   try {
//     const { name, mobileNumber, email } = req.body;
//     const { userId } = req.params;
//     if (!userId) {
//       return res.status(400).send({
//         message: "User Id is required",
//         success: false,
//       });
//     }
//     const user = await UserModel.findById(userId);
//     if (!user) {
//       return res.status(404).send({
//         message: "User not found",
//         success: false,
//       });
//     }
//     let rollUser;
//     if (user.role === "STUDENT") {
//       rollUser = await StudentsModel.findOne({ user_id: userId });
//     }
//     if (user.role === "TEACHER") {
//       rollUser = await TeacherModel.findOne({ user_id: userId });
//     }
//     if (name) {
//       user.name = name;
//       rollUser.name = name;
//     }
//     if (mobileNumber) {
//       user.mobileNumber = mobileNumber;
//       rollUser.mobileNumber = mobileNumber;
//     }
//     if (email) {
//       user.email = email;
//       rollUser.email = email;
//     }
//     await rollUser.save();
//     await user.save();

//     return res.status(200).send({
//       message: "Profile updated succesfully",
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "Internal Server Error",
//       success: false,
//     });
//   }
// });
// // get courses
// router.get("/courses", async (req, res) => {
//   try {
//     const courses = await CourseModel.find().populate("createdBy");

//     if (!courses) {
//       return res.status(200).send({
//         success: false,
//         message: "Courses not found",
//       });
//     }
//     if (courses?.length === 0) {
//       return res.status(200).send({
//         success: true,
//         message: "No courses available",
//         data: [],
//       });
//     }
//     return res.status(200).send({
//       message: "Courses fetched succesfully",
//       success: true,
//       data: courses,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "Internal Server Error",
//       success: false,
//     });
//   }
// });
// router.post("/signup", async (req, res) => {
//   try {
//     const { name, email, mobileNumber, password, role } = req.body;
//     if(!name){
//         return res.status(400).send({
//             success:false,
//             message : 'Name not found'
//         })
//     }
//     if(!email){
//         return res.status(400).send({
//             success:false,
//             message : 'Email not found'
//         })
//     }
//     if(!password){
//         return res.status(400).send({
//             success:false,
//             message : 'Password not found'
//         })
//     }
//     if(!role){
//         return res.status(400).send({
//             success:false,
//             message : 'Role not found'
//         })
//     }
//     const stringPass = password.toString();
//     const salt = await bcryptjs.genSalt(10);
//     const hashedPassword = await bcryptjs.hash(stringPass, salt);
    

//     const newUser = await UserModel.create({
//       name,
//       email,
//       mobileNumber,
//       role: role,
//       password: hashedPassword,
//     });
//     if (!newUser) {
//       return res.status(401).send({
//         message: "Cannot create user",
//         success: false,
//       });
//     }
//     let newRolledUser;
//     if (role == "STUDENT") {
//       newRolledUser = await StudentsModel.create({
//         name,
//         user_id: newUser._id,
//         mobileNumber,
//         email,
//       });
//     }
//     if (role == "TEACHER") {
//       newRolledUser = await TeacherModel.create({
//         name,
//         user_id: newUser._id,
//         mobileNumber,
//         email,
//       });
//     }
//     if (!newRolledUser) {
//       return res.status(401).send({
//         success: false,
//         message: `Something went wrong while creating ${role}`,
//       });
//     }
//     return res.status(201).send({
//       success: true,
//       message: "User created successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "Internal Server Error",
//       success: false,
//     });
//   }
// });
// // get userdata
// router.post("/getAuthUser", auth, async (req, res) => {
//   try {
//     const { id } = req.body;
//     if (!id) {
//       return res.status(400).send({
//         success: false,
//         message: "Id not received",
//       });
//     }
//     const user = await UserModel.findById(id).select("-password");
//     if (!user) {
//       return res.status(404).send({
//         success: false,
//         message: "User not found",
//       });
//     }
//     return res.status(200).send({
//       message: "user get succesfully",
//       success: true,
//       data: user,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "Internal Server Error",
//       success: false,
//     });
//   }
// });
export default router;
