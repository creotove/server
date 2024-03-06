import mongoose from "mongoose";

const settingsSchema = mongoose.Schema({});

const SettingsModel = mongoose.model("settings", settingsSchema);
export default SettingsModel;