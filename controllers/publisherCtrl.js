import PublisherModel from "../models/newModels/PublisherModel.js";
import UsersModel from "../models/newModels/UsersModel.js";
import CoursesModel from "../models/newModels/CoursesModel.js";
import SectionsModel from "../models/newModels/SectionsModel.js";
import CategoriesModel from "../models/newModels/CategoriesModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import uploadOnCloudinary, { deleteOnCloudinary } from "../utils/cloudinary.js";
import cloudinary from "cloudinary";
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

const createCourse = asyncHandler(async (req, res) => {
  const {
    name,
    createdBy,
    courseFor,
    priceINR,
    priceDollar,
    visible,
    category,
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
    category,
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
  await publisher.save();

  req.body.courseId = newCourse._id;
  next();
});

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

// const createChapter = asyncHandler(async (req, res) => {
//   const {
//     createdBy : publisherId,
//     courseId,
//     thumbnail,
//     title,
//     file,
//     description,
//     useFulLinks,
//   } = req.body;
//   if (!courseId) throw new ApiError(400, "Course Id is required");
//   if (!thumbnail) throw new ApiError(400, "Thumbnail is required");
//   if (!title) throw new ApiError(400, "Title is required");
//   if (!file) throw new ApiError(400, "File is required");
//   if (!description) throw new ApiError(400, "Description is required");
//   if (!useFulLinks) throw new ApiError(400, "usefull Links is required");
//   if (!publisherId) throw new ApiError(400, "Publisher is required");

//   const isValidPublisher = await PublisherModel.findOne({
//     courses: { $in: [course] },
//   });

//   const course = await CoursesModel.findById(courseId);
//   if (!course) throw new ApiError(400, "No courses found");

//   const chapter = await ChaptersModel.create({
//     thumbnail,
//     title,
//     file,
//     description,
//     useFulLinks,
//   });
//   if (!chapter) throw new ApiError(400, "Chapter creation failed");
//   course.chapters = chapter._id;
//   await course.save();
//   return res
//     .status(200)
//     .json(new ApiResponse(200, {}, "Chapter created successfully"));
// });

const createSections = asyncHandler(async (req, res) => {
  const {
    createdBy: publisherId,
    courseId,
    title,
    description,
    usefulLinks,
  } = req.body;

  if (!courseId) throw new ApiError(400, "Course Id is required");
  if (!title) throw new ApiError(400, "Title is required");
  if (!description) throw new ApiError(400, "Description is required");
  if (!usefulLinks) throw new ApiError(400, "Useful Links are required");
  if (!publisherId) throw new ApiError(400, "Publisher is required");

  const course = await CoursesModel.findById(courseId);
  if (!course) throw new ApiError(400, "No courses found");

  const files = req.files; // Assuming files are uploaded using Multer middleware

  // Check if any file is uploaded
  if (!files || files.length === 0) {
    throw new ApiError(400, "No files uploaded");
  }

  // Process each uploaded file
  const uploadedFiles = await Promise.all(
    files.map(async (file) => {
      // Upload file to Cloudinary
      const result = await cloudinary.uploader.upload(file.path);
      // Create Chapter document and store file URL
      return {
        thumbnail: result.url,
        title,
        description,
        usefulLinks,
      };
    })
  );

  // Create chapters in the database
  const chapters = await ChaptersModel.create(uploadedFiles);
  if (!chapters) throw new ApiError(400, "Chapter creation failed");

  // Update course with the created chapters
  course.chapters = chapters.map((chapter) => chapter._id);
  await course.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Chapters created successfully"));
});

// const createNewCourse = asyncHandler(async (req, res) => {
//   const {
//     name, //learn english
//     sections, // array of {name,chapters:[name,files]}
//     inrPrice, // 500
//     usdPrice, // 10
//     language, // Hindi
//     readerLevel, // Beginner
//     visibleToPublic, //false || true
//     featuredCourse, //false || true
//     category, //category name
//     courseExpiry, // false || true
//     courseExpiryDate, //0 means no expiry
//     limitCourseSale, // 0 means no limit
//     limit, // false || true
//   } = req.body;
//   const thumbnail = req.files.filter(
//     (thumbnail) => thumbnail.fieldname === "thumbnail"
//   );
//   const sectionImages = req.files.filter(
//     (thumbnail) => thumbnail.fieldname !== thumbnail
//   );
//   console.log("thumbnail: ", thumbnail);
//   console.log("section Images: ", sectionImages);
//   return res
//     .status(200)
//     .json(new ApiResponse(200, {}, "New course created successfully"));
// });

const createNewCourse = asyncHandler(async (req, res) => {
  const {
    name,
    createdBy,
    courseFor,
    priceINR,
    priceDollar,
    visible,
    category,
    expiry,
    courseLanguage,
    limitUser,
    noUserUserAccessedBy,
    description,
    sections,
  } = req.body;

  // Upload thumbnail to Cloudinary
  const thumbnail = req.files.filter((file) => file.fieldname === "thumbnail");

  const chapterImages = req.files.filter(
    (file) => file.fieldname !== "thumbnail"
  );

  const thumbnailLocalPath = thumbnail[0]?.path;
  if (!thumbnailLocalPath) throw new ApiError(400, "Thumbail is required");
  const coverThumbnail = await uploadOnCloudinary(thumbnailLocalPath);
  if (!coverThumbnail) throw new ApiError(400, "Upload error");

  const sectionFilesLocalPath = [];
  for (let i = 0; i < chapterImages.length; i++) {
    const element = chapterImages[i]?.path;
    sectionFilesLocalPath.push(element);
  }
  const sectionFilesUploadedUrl = [];
  for (let i = 0; i < sectionFilesLocalPath.length; i++) {
    const upload = await uploadOnCloudinary(sectionFilesLocalPath[i]);
    if (!upload) throw new ApiError(400, "Upload error");
    sectionFilesUploadedUrl.push(upload?.url);
  }

  for (let i = 0; i < sectionFilesLocalPath.length; i++) {
    await unLinkFile(sectionFilesLocalPath[i])
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

  let uploadImages = [];
  for (let i = 0; i < chapterImages.length; i++) {
    const element = chapterImages[i]?.path;
    const uploadedFiles = await uploadOnCloudinary(element);
    uploadImages.push(uploadedFiles?.url);
  }

  const newCourse = await CoursesModel.create({
    name,
    createdBy,
    thumbnail: coverThumbnail.url,
    courseFor,
    priceINR,
    priceDollar,
    visible,
    expiry,
    category,
    courseLanguage,
    limitUser,
    noUserUserAccessedBy,
    description: description || "idk",
  });
  if (!newCourse) throw new ApiError(400, "Cannot create course");
  for (let i = 0; i < sections.length; i++) {
    const section = await SectionsModel.create({
      name: sections[i]?.name,
      course_id: newCourse._id,
    });
    if (!section) throw new ApiError(400, "Error in creating the sections");
    await newCourse.sections.push(section._id);
    if (sections[i]?.chapters) {
      for (let j = 0; j < sections[i]?.chapters.length; j++) {
        const chapterName = sections[i]?.chapters[j].name;
        const newChapter = await ChaptersModel.create({
          name: chapterName,
          file: chapterImages[j].url,
        });
        if (!newChapter) throw new ApiError(400, "Chapter creation error");
      }
    }
  }
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
  createCourse,
  createCategory,
  createSections,
  deleteCourse,
  getPublisherCategory,
  createNewCourse,
};
