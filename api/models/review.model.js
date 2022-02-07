import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:String,
            required: true
        },
        class:{
            type: mongoose.Schema.ObjectId,
            ref: "Class",
            required: true,
        },
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;