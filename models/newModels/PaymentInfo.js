import mongoose from "mongoose";

const paymentInfoSchema = mongoose.Schema({});

const PaymentInfoModel = mongoose.model("payment-info", paymentInfoSchema);
export default PaymentInfoModel;