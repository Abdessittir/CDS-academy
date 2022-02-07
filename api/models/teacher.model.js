import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    userInfo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    classes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Class",
    }],
    students:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student"
    }]
});

export default mongoose.model("Teacher", teacherSchema);