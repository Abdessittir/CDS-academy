import {
    createReview
} from "../controller/review.controller.js";
import express from "express";
import { verifyToken } from "../middleware/authJwt.js";
import {isStudent} from "../middleware/verify.js";

const router = express.Router();

router.route("/student/review/new").post(verifyToken, isStudent, createReview);

export default router;