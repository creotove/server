import mongoose from "mongoose";
const chapterSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name of the Section is required"],
  },
  file: {
    type: String,
  },
  embeddedLink: {
    type: String,
  },
});

const ChaptersModel = mongoose.model("chapter", chapterSchema);
export default ChaptersModel;
