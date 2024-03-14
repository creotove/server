import PublisherModel from "../models/newModels/PublisherModel.js";
import UsersModel from "../models/newModels/UsersModel.js";
import CoursesModel from "../models/newModels/CoursesModel.js";
import SectionsModel from "../models/newModels/SectionsModel.js";
import CategoriesModel from "../models/newModels/CategoriesModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import uploadOnCloudinary, { deleteOnCloudinary } from "../utils/cloudinary.js";
import { unLinkFile } from "../utils/unLinkFile.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import ChaptersModel from "../models/newModels/ChaptersModel.js";

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

const createCategory = asyncHandler(async (req, res) => {
  const { name, description, createdBy } = req.body;
  const existedCategory = await CategoriesModel.findOne({ name, createdBy });
  if (existedCategory) throw new ApiError(400, "Category Exists");
  const newCategory = await CategoriesModel.create({
    name,
    description,
    createdBy,
  });
  if (!newCategory) throw new ApiError(400, "Category creation failed");
  return res
    .status(201)
    .json(new ApiResponse(201, {}, "Category created successfully"));
});

const getPublisherCategory = asyncHandler(async (req, res) => {
  const { publisherId } = req.params;
  if (!publisherId) throw new ApiError(400, "Publisher Id not found");
  const categories = await CategoriesModel.find({ createdBy: publisherId });
  if (!categories || categories.length < 0) {
    throw new ApiError(404, "No categories found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, categories, "Categories fetched"));
});

const createNewCourse = asyncHandler(async (req, res) => {
  const {
    name,
    createdBy,
    courseFor,
    inrPrice: priceINR,
    usdPrice: priceDollar,
    visibleToPublic: visible,
    category,
    expiry,
    language: courseLanguage,
    limitUser,
    noUserUserAccessedBy,
    description,
    sections,
  } = req.body;

  const publisher = await PublisherModel.findOne({ user_id: createdBy });
  if (!publisher)  throw new ApiError(404, "Publisher not found");

  // Upload thumbnail to Cloudinary
  const thumbnail = req.files.filter((file) => file.fieldname === "thumbnail");

  const chapterImages = req.files.filter(
    (file) => file.fieldname !== "thumbnail"
  );

  const thumbnailLocalPath = thumbnail[0]?.path;
  if (!thumbnailLocalPath) throw new ApiError(400, "Thumbail is required");
  const coverThumbnail = await uploadOnCloudinary(thumbnailLocalPath);
  if (!coverThumbnail) throw new ApiError(400, "Upload error");

  const chapterFiles = [];
  for (let i = 0; i < chapterImages.length; i++) {
    const filelocalFilePath = chapterImages[i]?.path;
    const uploadedFile = await uploadOnCloudinary(filelocalFilePath);
    if (!uploadedFile) throw new ApiError(400, "Upload Error");
    chapterFiles.push(uploadedFile?.url);
    await unLinkFile(filelocalFilePath)
      .then((result) => {
        console.log("Deletion result:", result);
      })
      .catch((error) => {
        console.error("Deletion error:", error);
      });
  }

  await unLinkFile(thumbnailLocalPath)
    .then((result) => {
      console.log("Deletion result:", result);
    })
    .catch((error) => {
      console.error("Deletion error:", error);
    });
  const existedCategory = await CategoriesModel.findOne({ name: category });
  if (!existedCategory) throw new ApiError(404, "Category not found");

  const newCourse = await CoursesModel.create({
    name,
    createdBy,
    thumbnail: coverThumbnail.url,
    courseFor,
    priceINR,
    priceDollar,
    visible,
    expiry,
    category: existedCategory._id,
    courseLanguage,
    limitUser,
    noUserUserAccessedBy,
    description: description || "idk",
  });
  if (!newCourse) throw new ApiError(400, "Cannot create course");
  for (let i = 0; i < sections.length; i++) {
    const name = sections[i].name;
    console.log(name, 208);
    const newSection = await SectionsModel.create({
      name,
      course_id: newCourse._id,
    });
    if (!newSection) throw new ApiError(400, "Error in creating the sections");
    await newCourse.sections.push(newSection._id);
    if (sections[i]?.chapters) {
      for (let j = 0; j < sections[i]?.chapters.length; j++) {
        const chapterName = sections[i]?.chapters[j].name;
        const newChapter = await ChaptersModel.create({
          name: chapterName,
          file: chapterFiles[j],
        });
        if (!newChapter) throw new ApiError(400, "Chapter creation error");
        newSection.chapters.push(newChapter._id);
        await newSection.save();
      }
    }
  }

  await publisher.courses.push(newCourse._id);
  await newCourse.save();
  await publisher.save();

  return res
    .status(201)
    .json(new ApiResponse(201, {}, "Course Created successfully"));
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

export {
  signUp,
  logIn,
  createCategory,
  deleteCourse,
  getPublisherCategory,
  createNewCourse,
};
