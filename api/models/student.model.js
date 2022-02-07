import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    userInfo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    classes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Class"
    }],
    educationLevel:String,
    teachers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Teacher"
    }]
});

export default mongoose.model("Student", studentSchema);