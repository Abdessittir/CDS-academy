import { download } from "../controller/file.controller.js";
import { verifyToken } from "../middleware/authJwt.js";
import express from "express";

const router = express.Router();

router.route('/:name').get(verifyToken, download);

export default router;