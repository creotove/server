import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import CourseModel from "../models/newModels/CoursesModel.js";
import StudentsModel from "../models/newModels/StudentsModel.js";
import SectionsModel from "../models/newModels/SectionsModel.js";

const signUp = asyncHandler(async (req, res) => {
  const { name, email, mobileNumber, password, publisherId } = req.body;
  if (!name) throw new ApiError(400, "Name is required");
  if (!email) throw new ApiError(400, "Email is required");
  if (!mobileNumber) throw new ApiError(400, "Mobile number is required");
  if (!password) throw new ApiError(400, "Password is required");
  if (!publisherId) throw new ApiError(400, "Something went wrong");
  const existedStudent = await StudentsModel.findOne({
    email,
    publisherId,
  });
  if (existedStudent) throw new ApiError(400, "Account exists with this email");

  const stringPass = password.toString();
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(stringPass, salt);

  const student = await StudentsModel.create({
    name,
    email,
    mobileNumber,
    password: hashedPassword,
    publisherId,
  });
  if (!student) throw new ApiError(400, "Error in creating account");

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Account created successfully"));
});
const logIn = asyncHandler(async (req, res) => {
  const { email, password, publisherId } = req.body;
  if (!email) throw new ApiError(400, "Email is required");
  if (!password) throw new ApiError(400, "Password is required");
  if (!publisherId) throw new ApiError(400, "PublisherId is required");
  const student = await StudentsModel.findOne({ email, publisherId });
  if (!student)
    throw new ApiError(400, "Account with this email does not exists");

  const isMatch = await bcryptjs.compare(password, student.password);
  if (!isMatch) {
    throw new ApiError(400, "Invalid credentials");
  }
  const encodeThis = {
    id: student._id,
    email,
    role: "STUDENT",
  };

  const token = jwt.sign(encodeThis, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  const responseUser = await StudentsModel.findById(student._id).select(
    "-password"
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        token,
        user: responseUser,
      },
      "Logged in successfully"
    )
  );
});
const purchaseCourse = asyncHandler(async (req, res) => {
  const { courseId, studentId } = req.params;
  if (!courseId) throw new ApiError(400, "Course Id not found");
  if (!studentId) throw new ApiError(400, "Student Id not found");
  const course = await CourseModel.findById(courseId);
  if (!course) throw new ApiError(404, "Course not found");
  const student = await StudentsModel.findById(studentId);
  if (!student) throw new ApiError(404, "Student not found");
  await course.enrolledBy.push(studentId);
  await student.enrolledIn.push(courseId);

  await course.save();
  await student.save();
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Course purchased successfully"));
});
const getPurchasedCoruses = asyncHandler(async (req, res) => {
  const { studentId } = req.params;
  if (!studentId) throw new ApiError(400, "Student id not found");
  const stduent = await StudentsModel.findById(studentId).populate(
    "enrolledIn"
  );
  if (!stduent) throw new ApiError(404, "Student not found");

  console.log(stduent);
  return res
    .status(200)
    .json(new ApiResponse(200, stduent, "Purchased course found successfully"));
});
const seePurchasedCourse = asyncHandler(async (req, res) => {
  const { courseId, studentId } = req.params;
  if (!courseId) throw new ApiError(400, "Course id not found");
  if (!studentId) throw new ApiError(400, "Student id not found");
  const course = await CourseModel.findById(courseId);
  if (!course) throw new ApiError(404, "Course not found");

  const sectionArray = course.sections;

  const data = [];
  for (let i = 0; i < sectionArray.length; i++) {
    const section = await SectionsModel.findById(sectionArray[i]).populate(
      "chapters"
    );
    if (!section) throw new ApiError(404, "No courses found");
    data.push(section);
  }
  console.log(data);
  return res.status(200).json(new ApiResponse(200, {}, "Course details found"));
});
export {
  signUp,
  logIn,
  purchaseCourse,
  getPurchasedCoruses,
  seePurchasedCourse,
};
