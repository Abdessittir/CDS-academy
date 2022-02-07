import DB from "../models/index.js";
import { catchAsyncErrors } from "../utils/asyncErrors.js";

const Teacher = DB.teacher;
const User = DB.user;

//student
export const findTeacher = catchAsyncErrors(async (req, res) =>{
    const {email, fullName} = req.body;
    
    let teacherData = {};
    let success = true;
    if(email){
        const user = await User.findOne({email:email});
        if(!user){
            teacherData.message = `No teacher with email ${email}!`;
            success = false;

        }
        else if(user.role !== "teacher"){
            teacherData.message = `User with email ${email} is not a teacher!`;
            success = false;
        }
        else{
            teacherData.teacher = {
                avatar:user.avatar,
                name:user.fullName,
                email:user.email
            }
        }
    }
    
    if(teacherData.message){
        const users = await User.find({
            fullName:{
                $regex:fullName,
                $options:"i"
            },
            role:"teacher"
        });
        teacherData.teachers = users.map(user => ({
            avatar:user.avatar,
            name:user.fullName,
            email:user.email,
        }));
    }

    res.status(200).send({
        success,
        teacherData
    });

});

//student
export const getTeacherPublicProfile = catchAsyncErrors(async (req, res) =>{
    
    const user = await User.findOne({email:req.body.email});
    if(user.role !== "teacher"){
        return res.status(400).send({
            success:false,
            message:`User with email ${email} is not a teacher!`
        });
    }

    const teacher = Teacher.findOne({userInfo:user._id})
        .populate(["userInfo", "classes"]);
    res.status(200).send({
        success:true,
        teacher
    });
});


//admin
export const getAllTeachers = catchAsyncErrors(async (req, res) =>{
    const teachers = await Teacher.find().populate(["userInfo", "classes","students"]);

    res.status(200).send({
        success:true,
        teachers
    });
});