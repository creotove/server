import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name of the user is required"],
    },
    email: {
      type: String,
      required: [true, "Email of the user is required"],
      unique: [true, "Email already Registered"],
    },
    mobileNumber: {
      type: Number,
      required: [true, "Mobile number of the user is required"],
      unique: [
        true,
        "Some email has already linked the mobile number with this email",
      ],
    },
    role: {
      type: String,
      enum: ["ADMIN", "STUDENT", "PUBLISHER"],
      required: [true, "role of the user is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timeStamps: true }
);
const UserModel = mongoose.model("user", userSchema);
export default UserModel;
