import {
    ChangePassword,
    getCallback,
    getUserDetails,
    login,
    regiserTeacher,
    registerStudent
} from "../controller/auth.controller.js";
import uploadAvatar  from "../middleware/upload.js";
import { verifyToken } from "../middleware/authJwt.js";
import express from "express";
import { upDateProfile } from "../../../mern-app/api/controllers/user.controller.js";

const router = express.Router();

router.route("/auth/register/teacher").post(uploadAvatar,regiserTeacher);
router.route("/auth/register/student").post(registerStudent);
router.route("/auth/login").post(login);
router.route("/auth/user").get(verifyToken, getUserDetails);
router.route("/auth/callback").get(getCallback);
router.route("/auth/password/change").put(verifyToken,ChangePassword);
router.route("/user/profile/update").put(verifyToken,uploadAvatar, upDateProfile);

export default router;
