import { verifyToken } from "../middleware/authJwt.js";
import { isTeacher, isAdmin } from "../middleware/verify.js";
import express from "express";
import { getAllStudent } from "../controller/student.controller.js";

const router = express.Router();

router.route("/admin/student/all").get(verifyToken, isAdmin, getAllStudent);

export default router;