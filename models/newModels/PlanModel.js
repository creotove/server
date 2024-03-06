import mongoose from "mongoose";

const planSchema = mongoose.Schema({});

const PlanModel = mongoose.model("plans", planSchema);
export default PlanModel;