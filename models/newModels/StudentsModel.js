import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user",
        required: [true, 'User id is required to create student']
    },
    name : {
        type : String,
        required : [true,'Name of the user is required']
    },
    email :{
        type : String,
        required : [true,'Email of the user is required']
    },
    mobileNumber :{
        type : Number,
        required : [true, 'Mobile number of the user is required']
    },
    enrolledIn: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref : 'course'
        }
    ],
})

const StudentsModel = mongoose.model("student", studentSchema);
export default StudentsModel;
