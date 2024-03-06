import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name of the course is required"],
  },
  duration: {
    type: String,
    required: [true, "duration of the course is required"],
  },
//   description: {
//     type: String,
//     required: [true, "Description is required"],
//   },
//   publish: {
//     type: Boolean,
//     required: [true, "Publish is required"],
//   },
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "teacher",
    required: [true, "Created by is required"],
  },
  enrolledBy: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "student",
    },
  ],
  files: [
    {
      type: String,
      required: [true, "Files are required to create course"],
    },
  ],
});

const CourseModel = mongoose.model("course", courseSchema);
export default CourseModel;
