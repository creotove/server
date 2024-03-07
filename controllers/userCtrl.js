import PublisherModel from "../models/newModels/PublisherModel.js";
import UsersModel from "../models/newModels/UsersModel.js";
import StudentModel from "../models/newModels/StudentsModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import CoursesModel from "../models/newModels/CoursesModel.js";

const getMyprofile = asyncHandler(async (req, res) => {
  const { email, role, id } = req.body;
  if (!email || !role || !id) throw new ApiError(401, "Unauthorized Request");
  const user = await UsersModel.findById(id);
  if (!user) throw new ApiError(404, "User not found");

  switch (role) {
    case "PUBLISHER":
      const publisher = await PublisherModel.findOne({ user_id: id });
      if (!publisher) throw new ApiError(404, "No publisher found!");
      return res
        .status(200)
        .json(new ApiResponse(200, publisher, "Publisher found!"));
    case "STUDENT":
      const student = await StudentModel.findById({ user_id: id });
      if (!student) throw new ApiError(404, "No student found!");
      return res
        .status(200)
        .json(new ApiResponse(200, publisher, "Student found!"));
  }
});
const getAuthenticatedUser = asyncHandler(async (req, res) => {
  const { id } = req.body;
  console.log("auth called");

  const user = await UsersModel.findById(id).select("-password");
  if (!user) throw new ApiError(404, "User not found");

  res.status(200).json(
    new ApiResponse(
      200,
      {
        user,
      },
      "Authorized user fetched"
    )
  );
});
const getLoggedInUser =asyncHandler(async(req,res)=>{
  const { id } = req.body;
  console.log("auth called");

  const user = await StudentModel.findById(id).select("-password");
  if (!user) throw new ApiError(404, "User not found");

  res.status(200).json(
    new ApiResponse(
      200,
      {
        user,
      },
      "Authorized user fetched"
    )
  );
})
const getPublisherCourses = asyncHandler(async (req, res) => {
  const { publisherId } = req.params;
  console.log(publisherId)

  const courses = await CoursesModel.find({
    createdBy: publisherId,
  });
  if (!courses) return res.status(404).json(new ApiResponse(404, {}, "No courses found"))
  return res.status(200).json(new ApiResponse(200, courses, "Courses found!"));
});

export { getMyprofile, getAuthenticatedUser, getPublisherCourses,getLoggedInUser };
