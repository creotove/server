import mongoose from "mongoose";

const teacherSchema = mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user",
        required: [true, 'User id is required to create teacher']
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
    myCourses: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref : 'course'
        }
    ],
})

const TeacherModel = mongoose.model('teacher', teacherSchema)
export default TeacherModel