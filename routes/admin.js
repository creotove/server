import express from "express";
// import {} from "../controllers/adminCtrls.js";
// import { upload } from "../middlewares/multer.js";
// import { auth } from "../middlewares/auth.js";
// import StudentsModel from "../models/StudentsModel.js";
// import TeacherModel from "../models/TeacherModel.js";
// import CourseModel from "../models/CourseModel.js";
// import bcryptjs from "bcryptjs";
const router = express.Router();

// POST || Creation
// router.post(
//   "/addStudent",
//   upload.fields([
//     {
//       name: "avatar",
//       maxCount: 1,
//     },
//   ]),
//   addAdmin
// ); // -> /api/admin/addAdmin

// Create User Not used created user route for it
// router.post("/create", async (req, res) => {
//   try {
//     const { name, mobileNumber, email, role, password } = req.body;
//     if (!name) {
//       return res.status(400).send({
//         success: false,
//         message: "Name of the User is required",
//       });
//     }
//     if (!mobileNumber) {
//       return res.status(400).send({
//         success: false,
//         message: "Mobile number of the User is required",
//       });
//     }
//     if (!email) {
//       return res.status(400).send({
//         success: false,
//         message: "Email of the User is required",
//       });
//     }
//     if (!role) {
//       return res.status(400).send({
//         success: false,
//         message: "Role of the User is required",
//       });
//     }
//     if (!password) {
//       return res.status(400).send({
//         success: false,
//         message: "Password of the User is required",
//       });
//     }
//     const stringPass = password.toString();
//     const salt = await bcryptjs.genSalt(10);
//     const hashedPassword = await bcryptjs.hash(stringPass, salt);
//     const user = await UserModel.create({
//       name,
//       email,
//       mobileNumber,
//       role,
//       password: hashedPassword,
//     });
//     let newRolledUser;
//     if (role == "STUDENT") {
//       newRolledUser = await StudentsModel.create({
//         name,
//         user_id: user._id,
//         mobileNumber,
//         email,
//       });
//     }
//     if (role == "TEACHER") {
//       newRolledUser = await TeacherModel.create({
//         name,
//         user_id: user._id,
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
//       message: error?.message || "Internal Server Error",
//       success: false,
//     });
//   }
// });

// // Delete User
// router.delete("/deleteUser", async (req, res) => {
//   try {
//     const { userId } = req.params;
//     if (!userId) {
//       return res.status(400).send({
//         success: false,
//         message: "User Id is required",
//       });
//     }
//     const user = await UserModel.findById(userId);
//     if (!user) {
//       return res.status(404).send({
//         success: false,
//         message: "User not found",
//       });
//     }
//     let deletedUser;
//     if (user.role === "STUDENT") {
//       deletedUser = await StudentsModel.findByIdAndDelete(user._id);
//     }
//     if (user.role === "TEACHER") {
//       deletedUser = await TeacherModel.findByIdAndDelete(user._id);
//     }
//     if (!deletedUser) {
//       return res.status(401).send({
//         success: false,
//         message: `Cannot delete the user ${user.role}`,
//       });
//     }
//     const deleted = await UserModel.findByIdAndDelete(userId);
//     if (!deleted) {
//       return res.status(401).send({
//         success: false,
//         message: "Cannot delete the user",
//       });
//     }
//     return res.status(200).send({
//       message: "Deleted succesfully",
//       success: true,
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: "Internal Server Error",
//       success: false,
//     });
//   }
// });

// // Delete Course
// router.delete("/deleteCourse/:courseID", async (req, res) => {
//   try {
//     const { courseID } = req.params;
//     if (!courseID) {
//       return res.status(400).send({
//         success: false,
//         message: "Course Id not found",
//       });
//     }
//     const course = await CourseModel.findByIdAndDelete(courseID);
//     if (!course) {
//       return res.status(401).send({
//         success: false,
//         message: "Cannot delete the course",
//       });
//     }
//     const courseCreator = await TeacherModel.findOne({
//       myCourses: { $in: [courseID] },
//     });
//     const courses = courseCreator?.myCourses;
//     const newCourses = courses.filter((course) => course !== courseID);
//     courseCreator.myCourses = newCourses;
//     await courseCreator.save();

//     const courseEnroller = await StudentsModel.findOne({
//       enrolledIn: { $in: [courseID] },
//     });
//     const enrollerCourses = courseEnroller?.enrolledIn;
//     const remainingCourses = enrollerCourses.filter(
//       (course) => course !== courseID
//     );
//     courseEnroller.enrolledIn = remainingCourses;
//     await courseEnroller.save();

//     return res.status(200).send({
//       message: "deleted succesfully",
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
// router.delete("/deleteTeacher/:teacherID", async (req, res) => {
//   try {
//     const { teacherID } = req.params;
//     if (!teacherID) {
//       return res.status(400).send({
//         success: false,
//         message: "Teacher id not found",
//       });
//     }

//     // Find the teacher by ID
//     const teacher = await TeacherModel.findById(teacherID);
//     if (!teacher) {
//       return res.status(404).json({ message: "Teacher not found" });
//     }

//     // Get all the courses created by the teacher
//     const courses = await CourseModel.find({ createdBy: teacherID });

//     // Loop through each course
//     for (let i = 0; i < courses.length; i++) {
//       const course = courses[i];

//       // Remove the course from all the students enrolled in it
//       await StudentsModel.updateMany(
//         { enrolledIn: course._id },
//         { $pull: { enrolledIn: course._id } }
//       );

//       // Delete the course
//       await CourseModel.findByIdAndDelete(course._id);
//     }

//     // find teacher user_id to delete
//     const user = await UserModel.findByIdAndDelete(teacher.user_id);
//     if (!user) {
//       return res.status(404).send({
//         success: false,
//         message: "User not found for deletion",
//       });
//     }
//     await TeacherModel.findByIdAndDelete(teacherID);

//     return res.status(200).send({
//       message: "deleted succesfully",
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
// router.delete("/deleteStudent/:studentID", async (req, res) => {
//   try {
//     const { studentID } = req.params;
//     if (!studentID) {
//       return res.status(400).send({
//         success: false,
//         message: "Student id not found",
//       });
//     }
//     const student = await StudentsModel.findById(studentID);
//     if (!student) {
//       return res.status(404).send({
//         success: false,
//         message: "Student not found",
//       });
//     }
//     const user = await UserModel.findById(student.user_id)
//      // Remove the student from all enrolled courses
//      await CourseModel.updateMany(
//         { enrolledBy: user._id },
//         { $pull: { enrolledBy: user._id } }
//     );

//     await UserModel.findByIdAndDelete(student.user_id)
//     await StudentsModel.findByIdAndDelete(studentID);

//     return res.status(200).send({
//       message: "Deleted succesfully",
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
// router.get("/students", async (req, res) => {
//   try {
//     const student = await StudentsModel.find().populate("enrolledIn");
//     if (!student) {
//       return res.status(200).send({
//         message: "No student found",
//         success: false,
//       });
//     }
//     if (student.length === 0) {
//       return res.status(200).send({
//         message: "No student available",
//         success: true,
//       });
//     }
//     return res.status(200).send({
//       message: "Student fetched succesfully",
//       success: true,
//       data: student,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "Internal Server Error",
//       success: false,
//     });
//   }
// });

// router.get("/teachers", async (req, res) => {
//   try {
//     const teacher = await TeacherModel.find().populate("myCourses");
//     if (!teacher) {
//       return res.status(200).send({
//         message: "No teacher found",
//         success: false,
//       });
//     }
//     if (teacher.length === 0) {
//       return res.status(200).send({
//         message: "No teacher available",
//         success: true,
//       });
//     }
//     return res.status(201).send({
//       message: "teacher fetched succesfully",
//       success: true,
//       data: teacher,
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
