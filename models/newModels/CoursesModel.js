import mongoose from "mongoose";
const courseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name of the course is required"],
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "publisher",
    },
    sections: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "section",
      },
    ],
    thumbnail: {
      type: String,
      required: [true, "Thumbnail for the course is required"],
    },
    courseFor: {
      type: String,
      enum: [
        "Beginner",
        "Elementary",
        "Intermediate",
        "Upper Intermediate",
        "Advanced",
      ],
    },
    priceINR: {
      type: Number,
      required: [true, "INR price of the course is required"],
    },
    priceDollar: {
      type: Number,
      required: [true, "Dollar price of the course is required"],
    },
    visible: {
      type: Boolean,
      required: [true, "Visible for public or not is required"],
    },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "category",
    },
    enrolledBy: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "student",
      },
    ],
    expiry: {
      type: Number, //Expiry date for the Course is required
    },
    courseLanguage: {
      type: String,
      required: [true, "Language of the course is required"],
    },
    limitUser: {
      // Limit the user to access the course
      type: Boolean,
    },
    noUserUserAccessedBy: {
      // Number of the user can access the course
      type: Number,
    },
    publish: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      required: [true, "Description for the course is requried"],
    },
  },
  { timeStamps: true }
);

const CourseModel = mongoose.model("course", courseSchema);
export default CourseModel;
