import DB from "../models/index.js";
import { catchAsyncErrors } from "../utils/asyncErrors.js";

const Class = DB.class;
//teacher
export const createClass = catchAsyncErrors(async (req, res) =>{
    console.log(req.body);
    const classData = {
        ...req.body,
        days:req.body.days.map(day =>({
            name:day.name,
            startTime:Date(day.startTime)
        }))
    }
    const newClass = await Class.create({
        ...classData,
        teacher:req.body.teacherId
    });

    res.status(201).send({
        success:true,
        newClass
    });
});

//teacher
export const getTeacherClasses = catchAsyncErrors(async (req, res) =>{

    const classes = await Class.find({teacher:req.body.teacherId});
    res.status(200).send({
        success:false,
        classes
    });
});

//teacher
export const upDateClass = catchAsyncErrors(async (req, res) =>{
    const {
        classId,
        name,
        description,
        startTime,
        dayNames,
        price,
        subjects,// required
        educationLevel,//required
    } = req.body;
    const newData = {
        name,
        description,
        startTime,
        dayNames,
        price,
        subjects,
        educationLevel
    };
    const myClass = await Class.findByIdAndUpdate(classId, newData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).send({
        success:true,
        myClass
    });
});

//student
export const findClasses = catchAsyncErrors(async (req, res) =>{
    const {
        startTime,
        dayNames,
        maxPrice,
        minPrice,
        subjects,// required
        educationLevel,//required
    } = req.body;

    if(!subjects || level){
        return res.status(400).send({
            success:false,
            message:"Please enter a level and at least one subject"
        });
    }
    
    const options = {
        price:{
            $gte:minPrice? parseFloat(minPrice) : -Infinity,
            $lt: maxPrice? parseFloat(maxPrice) : Infinity,
        },
        educationLevel,
        subjects,
        startTime : {
            $gte:startTime
        },
        dayNames,
    };
    const classes = await Class.find(options);

    //{$in: _chatUsers}
    res.status(200).send({
        success:true,
        classes
    });
});
//student
export const joinClass = catchAsyncErrors(async (req, res) =>{

});
//student
export const getClassDetails = catchAsyncErrors(async (req, res) =>{

    const myClass = await Class.findById(req.params.id).populate("teacher").populate("userInfo");

    res.status(200).send({
        success:true,
        myClass
    });
})

//only admin
export const getAllClasses = catchAsyncErrors(async (req, res) =>{
    const classes = await Class.find();

    res.status(200).send({
        success:false,
        classes
    });
});