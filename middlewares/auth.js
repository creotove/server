import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import UsersModel from "../models/newModels/UsersModel.js";

export const auth = async (req, res, next) => {
  try {
    const token = await req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Token not found in request header");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      throw new ApiError(401, "Unauthorized to access this route");
    }

    const user = await UsersModel.findOne({ email: decodedToken.email });

    if (!user) {
      throw new ApiError(401, "User not found based on token");
    }
    req.body.email = decodedToken.email;
    req.body.role = user.role;
    req.body.id = user._id;
    next();
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      success: false,
    });
  }
};
