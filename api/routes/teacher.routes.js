import { verifyToken } from "../middleware/authJwt.js";
import { isAdmin, isStudent } from "../middleware/verify.js";
import express from "express";
import {
    findTeacher,
    getAllTeachers,
    getTeacherPublicProfile
} from "../controller/teacher.controller.js";

const router = express.Router();

router.route("/admin/teacher/all").get(verifyToken, isAdmin, getAllTeachers);
router.route("/student/teacher/find").get(verifyToken, isStudent, findTeacher);
router.route("/student/teacher/profile").get(verifyToken,isStudent, getTeacherPublicProfile);

export default router;