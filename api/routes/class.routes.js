import express from "express";
import {
    createClass,
    findClasses,
    getAllClasses,
    getClassDetails,
    getTeacherClasses,
    upDateClass
} from "../controller/class.controller.js";
import { verifyToken } from "../middleware/authJwt.js";
import { isAdmin, isStudent, isTeacher } from "../middleware/verify.js";

const router = express.Router();

router.route("/teacher/class/new").post(verifyToken,isTeacher, createClass);
router.route("/teacher/class/all").get(verifyToken, isTeacher, getTeacherClasses);
router.route("/teacher/class/update").put(verifyToken,isTeacher, upDateClass);

router.route("/student/class/find").get(verifyToken, isStudent, findClasses);
router.route("/student/class/:id").get(verifyToken, isStudent,getClassDetails);

router.route("/admin/class/all").get(verifyToken, isAdmin, getAllClasses);

export default router;