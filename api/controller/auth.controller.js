import DB from "../models/index.js";
import { catchAsyncErrors } from "../utils/asyncErrors.js";
import dotenv from "dotenv";

dotenv.config();

const User = DB.user;
const Teacher = DB.teacher;
const Student = DB.student;
const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 1000
    ),
    httpOnly:true,
};
const Chunks = DB.mongoose.connection.collection("avatars.chunks");
const Files = DB.mongoose.connection.collection("avatars.files");

export const getCallback = catchAsyncErrors(async (req, res) =>{
    res.status(200).send({
        correctToken
    });
})

export const regiserTeacher = catchAsyncErrors(async (req, res) =>{

    const user = await User.create({
        ...req.body,
        avatar:{
            image:req.file.id,
            url:process.env.BASE_URL+req.file.filename
        },
        role:"teacher"
    });
    const teacher = await Teacher.create({
        description: req.body.description,
        userInfo:user._id,
    });

    await teacher.populate("userInfo");

    let token  = user.getJwtToken();

    res.status(201).cookie("token", token, options).send({
        success:true,
        teacher,
    });
});

export const registerStudent = catchAsyncErrors(async (req, res) =>{

    const user = await User.create(rep.body);
    const student = await Student.create({
        educationLevel:req.body.educationLevel,
        userInfo:user._id
    });
    await student.populate("userInfo");
    let token  = user.getJwtToken();

    res.status(201).cookie("token", token, options).send({
        success:true,
        student,
    })
});

export const login = catchAsyncErrors(async (req, res) =>{

    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).send({
            success:false,
            message:"email and password required!"
        });
    }

    const user = await User.findOne({email: email}).select("+password");
    if(!user){
        return res.status(404).send({
            succes: false,
            message:`user with email ${email} does not exist!`
        });
    }

    const isPasswordCorrect = user.compatePasswords(password);
    if(!isPasswordCorrect){
        return res.status(401).send({
            succes: false,
            message:"Password incorrect"
        });
    }
    const token = user.getJwtToken();

    let userData;
    if(user.role === "teacher"){
        const teacher = await Teacher.findOne({userInfo:user._id})
            .populate(["userInfo", "classes", "students"]);
        
        userData = teacher;
    }else if(user.role === "student"){
        const student = await Student.findOne({userInfo:user._id})
            .populate(["userInfo", "classes", "teachers"]);
        
        userData = student;
    }
    if(!userData){
        userData = user;
    }

    res.status(200).cookie("token", token, options).send({
        success:true,
        userData,
    });
});

export const getUserDetails = catchAsyncErrors(async (req, res) =>{

    const user = await User.findById(req.userId);

    let userData;
    if(user.role === "teacher"){
        const teacher = await Teacher.findOne({userInfo:user._id})
            .populate(["userInfo", "classes", "students"]);
        
        userData = teacher;
    }else if(user.role === "student"){
        const student = await Student.findOne({userInfo:user._id})
            .populate(["userInfo", "classes", "teachers"]);
        
        userData = student;
    }

    res.status(200).send({
        success: true,
        userData,
    });
})

export const ChangePassword = catchAsyncErrors(async (req, res) =>{

    const user = await User.findById(req.userId).select("+password");
    const isPasswordCorrect = user.compatePasswords(req.body.password);
    if(!isPasswordCorrect){
        return res.status(401).send({
            succes: false,
            message:"Password incorrect"
        });
    }
    
    if(req.body.newPassword !== req.body.confirmNewPassword){
        return res.status(400).send({
            succes: false,
            message:"Passwords does not match"
        });
    }

    user.password = newPassword;
    const token = user.getJwtToken();
    await user.save();

    res.status(201).cookie("token", token, options).send({
        success:true,
    });

});

export const updateProfile = catchAsyncErrors(async (req, res) =>{
    
    const user = await User.findById(req.userId);

    if(req.body.avatar){
        await Chunks.findOneAndDelete({files_id:user.avatar.image});
        await Files.findOneAndDelete({_id:user.avatar.image});
        user.avatar = {
            image:req.file.id,
            url:process.env.BASE_URL+req.file.filename
        }
    }

    await user.save();

    res.status(201).send({
        success:true,
        user
    })
});