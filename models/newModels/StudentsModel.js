import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name of the user is required"],
  },
  email: {
    type: String,
    required: [true, "Email of the user is required"],
  },
  mobileNumber: {
    type: Number,
    required: [true, "Mobile number of the user is required"],
  },
  password:{
    type: String,
    required: [true, "Email of the user is required"],
  },
  publisherId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "publisher",
  },
  enrolledIn: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "course",
    },
  ],
});

const StudentsModel = mongoose.model("student", studentSchema);
export default StudentsModel;
