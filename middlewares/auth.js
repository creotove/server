import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import UsersModel from "../models/newModels/UsersModel.js";
import StudentsModel from "../models/newModels/StudentsModel.js";

export const auth = async (req, res, next) => {
  try {
    const token = await req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(400).send({
        message: "token not found",
        success: false,
      });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      throw new ApiError(401, "Unauthorized to access this route");
    }

    const user = await UsersModel.findById(decodedToken.id);
    const student = await StudentsModel.findById(decodedToken.id);

    if (!user && !student) {
      throw new ApiError(401, "User not found based on token");
    }
    req.body.id = user?._id || student?._id;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error",
      success: false,
    });
  }
};
