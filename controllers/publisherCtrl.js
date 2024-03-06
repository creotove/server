import PublisherModel from "../models/newModels/PublisherModel.js";
import UsersModel from "../models/newModels/UsersModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const signUp = asyncHandler(async (req, res) => {
  const { name, email, mobileNumber, password } = req.body;
  if (!name) throw new ApiError(400, "Name is required");
  if (!email) throw new ApiError(400, "Email is required");
  if (!mobileNumber) throw new ApiError(400, "Mobile number is required");
  if (!password) throw new ApiError(400, "Password is required");

  const existedUser = await UsersModel.findOne({ email });
  if (existedUser)
    throw new ApiError(400, "User is already Registered with this email");

  const stringPass = password.toString();
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(stringPass, salt);

  const newUser = await UsersModel.create({
    name,
    email,
    mobileNumber,
    password: hashedPassword,
    role: "PUBLISHER",
  });
  if (!newUser) throw new ApiError(500, "Something went wrong!");

  const publisher = await PublisherModel.create({
    user_id: newUser._id,
  });
  if (!publisher) throw new ApiError(500, "Something went wrong");

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Account Created Successfully"));
});

// const logIn = asyncHandler(async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email) {
//       return res.status(400).send({
//         success: false,
//         message: "Email is required",
//       });
//     }
//     if (!password) {
//       return res.status(400).send({
//         success: false,
//         message: "Password is required",
//       });
//     }

//     const user = await UsersModel.findOne({ email });
//     if (!user) {
//       return res.status(200).send({
//         success: false,
//         message: "No user found with this email",
//       });
//     }

//     const isMatch = await bcryptjs.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).send({
//         success: false,
//         message: "Invalid credentials",
//       });
//     }

//     const token = jwt.sign(
//       { id: user._id, email: user.email, role: user.role },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "1d",
//       }
//     );
//     const responseUser = await UsersModel.findOne({ email });
//     return res.status(200).send({
//       success: true,
//       message: "Logged In successfully",
//       token,
//       role: user.role,
//       user: responseUser,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "Internal Server Error",
//       success: false,
//     });
//   }
// });

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email is required",
      });
    }
    if (!password) {
      return res.status(400).send({
        success: false,
        message: "Password is required",
      });
    }

    const user = await UsersModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "No user found with this email",
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid credentials",
      });
    }
    console.log(user._id)
    const encodeThis = {
      id: user._id,
      email,
      role: user.role,
    };

    const token = jwt.sign(encodeThis, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const responseUser = await UsersModel.findById(user._id);
    return res.status(200).send({
      success: true,
      message: "Logged In successfully",
      token,
      role: user.role,
      user: responseUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export { signUp, logIn };
