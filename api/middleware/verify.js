import { catchAsyncErrors } from "../utils/asyncErrors.js";
import DB from "../models/index.js";

const User = DB.user;
export const isTeacher = catchAsyncErrors(async (req, res, next) =>{
    
    const user = await User.findById(req.userId);
    if(user.role !== "teacher"){
        return res.status(403).send({
            success:false,
            message:"Teacher role required!"
        });
    }
    next();
});

export const isStudent = catchAsyncErrors(async (req, res, next) =>{
    const user = await User.findById(req.userId);
    if(user.role !== "student"){
        return res.status(403).send({
            success:false,
            message:"Student role required!"
        });
    }
    next();
});

export const isAdmin = catchAsyncErrors(async (req, res, next) =>{
    const user = await User.findById(req.userId);
    if(user.role !== "admin"){
        return res.status(403).send({
            success:false,
            message:"Admin role required!"
        });
    }
    next();
});
