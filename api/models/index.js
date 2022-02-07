import User from "./user.model.js";
import Teacher from "./teacher.model.js";
import Student from "./student.model.js";
import Class from "./class.model.js";
import Review from "./review.model.js";
import mongoose from "mongoose";

const DB = {
    mongoose:mongoose,
    user:User,
    teacher:Teacher,
    student:Student,
    class:Class,
    review:Review,
}

export default DB;