import mongoose from "mongoose";

const purblisherSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
    },
    courses: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "courses",
      },
    ],
    websiteUrl: {
      type: String,
    },
    domain: {
      type: String,
    },
    privacyPolicy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "privacy-policy",
    },
    paymentInfo: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "payment-info",
    },
    modal: {
      type: Boolean,
      default: true,
    },
    customBranding: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "custom-branding",
    },
    freeTrail: {
      type: Boolean,
      default: true,
    },
    plan: {
      type: String,
      enum: ["BASIC", "PROFESSIONAL", "POWER"],
    },
    settings: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "setting",
    },
  },
  { timeStamps: true }
);
const PublisherModel = mongoose.model("publisher", purblisherSchema);
export default PublisherModel;
