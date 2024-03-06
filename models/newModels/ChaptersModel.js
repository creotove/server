import mongoose from "mongoose";
const chapterSchema = mongoose.Schema({
  thumbnail: {
    type: String,
    required: [true, "Cover Image for chapter is Required"],
  },
  title: { type: String, required: [true, "Title of chapter is Required"] },
  file: [{ type: String, required: [true, "Files of chapter is Required"] }],
  description: { type: String },
  useFulLinks: { type: String },
});

const CourseModel = mongoose.model("chapter", chapterSchema);
export default CourseModel;
