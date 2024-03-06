import mongoose from "mongoose";

const privacyPoliciesSchema = mongoose.Schema({});

const PrivacyPolicyModel = mongoose.model("privacy-policy", privacyPoliciesSchema);
export default PrivacyPolicyModel;