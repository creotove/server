import PublisherModel from "../models/newModels/PublisherModel.js";
import UsersModel from "../models/newModels/UsersModel.js";
import CoursesModel from "../models/newModels/CoursesModel.js";
import ChaptersModel from "../models/newModels/ChaptersModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import uploadOnCloudinary, { deleteOnCloudinary } from "../utils/cloudinary.js";
import { unLinkFile } from "../utils/unLinkFile.js";
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
    const encodeThis = {
      id: user._id,
      email,
      role: user.role,
    };

    const token = jwt.sign(encodeThis, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const responseUser = await UsersModel.findById(user._id).select(
      "-password"
    );
    return res.status(200).send({
      success: true,
      message: "Logged In successfully",
      token,
      // role: user.role,
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

const createCourse = asyncHandler(async (req, res) => {
  const {
    name,
    chapters,
    createdBy,
    courseFor,
    priceINR,
    priceDollar,
    visible,
    // category,
    expiry,
    courseLanguage,
    limitUser,
    noUserUserAccessedBy,
    publish,
    description,
  } = req.body;
  const thumbnail = req.file;

  // Step 5
  const localpath = thumbnail.path;
  if (!localpath) throw new ApiError(400, "Avatar is required");
  const coverThumbnail = await uploadOnCloudinary(localpath);
  if (!coverThumbnail) throw new ApiError(400, "Avatar is required");

  /// Step 6
  unLinkFile(localpath)
    .then((result) => {
      console.log("Deletion result:", result);
    })
    .catch((error) => {
      console.error("Deletion error:", error);
    });
  const newCourse = await CoursesModel.create({
    name,
    chapters,
    createdBy,
    description,
    thumbnail: coverThumbnail.url,
    courseFor,
    priceDollar,
    priceINR,
    visible,
    expiry,
    courseLanguage,
    limitUser,
    noUserUserAccessedBy,
    publish,
  });
  if (!newCourse) throw new ApiError(400, "Error in new creating course");

  const publisher = await PublisherModel.findOne({ user_id: createdBy });
  
  if (!publisher) throw new ApiError(400, "Linking failed");
  publisher.courses.push(newCourse._id);
  await publisher.save()

  res.status(200).json(new ApiResponse(200, {}, "Course Created Successfully"));
});

const createChapter = asyncHandler(async (req, res) => {
  const {
    publisherId,
    courseId,
    thumbnail,
    title,
    file,
    description,
    useFulLinks,
  } = req.body;
  if (!courseId) throw new ApiError(400, "Course Id is required");
  if (!thumbnail) throw new ApiError(400, "Thumbnail is required");
  if (!title) throw new ApiError(400, "Title is required");
  if (!file) throw new ApiError(400, "File is required");
  if (!description) throw new ApiError(400, "Description is required");
  if (!useFulLinks) throw new ApiError(400, "usefull Links is required");
  if (!publisherId) throw new ApiError(400, "Publisher is required");

  const isValidPublisher = await PublisherModel.findOne({
    courses: { $in: [course] },
  });

  const course = await CoursesModel.findById(courseId);
  if (!course) throw new ApiError(400, "No courses found");

  const chapter = await ChaptersModel.create({
    thumbnail,
    title,
    file,
    description,
    useFulLinks,
  });
  if (!chapter) throw new ApiError(400, "Chapter creation failed");
  course.chapters = chapter._id;
  await course.save();
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Chapter created successfully"));
});

const deleteCourse = asyncHandler(async (req, res) => {
  const { courseId, publisherId } = req.query;
  if (!courseId) throw new ApiError(400, "Course id not received");
  if (!publisherId) throw new ApiError(400, "Course id not received");
  const courseExisted = await CoursesModel.findById(courseId);
  if (!courseExisted) throw new ApiError(404, "Course not found");

  const publisher = await PublisherModel.findOne({ user_id: publisherId });
  if (!publisher) throw new ApiError(404, "Publisher not found");

  const deleteThumbnail = await deleteOnCloudinary(courseExisted.thumbnail);
  if (!deleteThumbnail.result)
    throw new ApiError(500, "Thumbnail deletion failed");
  const deleteCrse = await CoursesModel.findByIdAndDelete(courseId);
  if (!deleteCrse) throw new ApiError(500, "Cannot delete the course");

  const deleteCoursefromPublisherAccount =
    await PublisherModel.findOneAndUpdate({
      $pull: { courses: { $in: [courseId] } },
    });
  if (!deleteCoursefromPublisherAccount)
    throw new ApiError(
      500,
      "Error in deletion of course from publisher account"
    );

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Course deleted successfully"));
});

export { signUp, logIn, createCourse, createChapter, deleteCourse };
