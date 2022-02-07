import { catchAsyncErrors } from "../utils/asyncErrors.js";
import DB from "../models/index.js";

const Student = DB.student;

export const getTeacherStudent = catchAsyncErrors(async (req, res) =>{
    
});

//teacher
export const findStudents = catchAsyncErrors(async (req, res) =>{});

//admin
export const getAllStudent = catchAsyncErrors(async (req, res) =>{
    const students = await Student.find().populate(["userInfo","teacher", "classes"]);
    
    res.status(200).send({
        success:true,
        students
    });
});