import mongoose from "mongoose";
const sectionSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name of the Section is required"],
  },
  chapters: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "chapter",
    },
  ],
  course_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "course",
  },
});

const SectionsModel = mongoose.model("section", sectionSchema);
export default SectionsModel;
