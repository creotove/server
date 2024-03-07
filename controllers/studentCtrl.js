import StudentModel from "../models/newModels/StudentsModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const signUp = asyncHandler(async (req, res) => {
  const { name, email, mobileNumber, password, publisherId } = req.body;
  if (!name) throw new ApiError(400, "Name is required");
  if (!email) throw new ApiError(400, "Email is required");
  if (!mobileNumber) throw new ApiError(400, "Mobile number is required");
  if (!password) throw new ApiError(400, "Password is required");
  if (!publisherId) throw new ApiError(400, "Something went wrong");
  const existedStudent = await StudentModel.findOne({
    email,
    publisherId,
  });
  if (existedStudent) throw new ApiError(400, "Account exists with this email");

  const stringPass = password.toString();
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(stringPass, salt);

  const student = await StudentModel.create({
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
  const student = await StudentModel.findOne({ email, publisherId });
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

  const responseUser = await StudentModel.findById(student._id).select(
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
export { signUp, logIn };
