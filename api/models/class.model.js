import mongoose from "mongoose";
import validator from "validator";

const classSchema = new mongoose.Schema({
    name:String,
    description:{
        type:String,
        required:[true, "Please enter description for this class"]
    },
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Teacher",
        required:true,
    },
    students:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student",
    }],
    days:[{
        name:{
            type:String,
            required:[true, "Please enter specific days for this class"]
        },
        startTime:{
            type:Date,
            required:[true, "Please enter specific time for this class"]
        }
    }],
    price:{
        type:mongoose.Decimal128,
        required:[true, "Please enter specific price for this class"]
    },
    subjects:[{
        type:String,
        required:[true, "Please enter at least one specific subject for this class"]
    }],
    educationLevel:{
        type:String,
        required:[true, "Please enter specific educationLevel for this class"]
    },
    newStudents:[{
        type:String,
        validate:[validator.isEmail, "Please enter a valid email!!"],
    }],
    rating: {
        type: Number,
        default:0
    },
    numOfReviews: {
        type:Number,
        default:0,
    },
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review"
    }],
});

export default  mongoose.model("Class", classSchema);
