import mongoose from "mongoose";

const customBranding = mongoose.Schema({});

const CustomBrandingModel = mongoose.model("custom-branding", customBranding);
export default CustomBrandingModel;