import DB from "../models/index.js";
import { catchAsyncErrors } from "../utils/asyncErrors.js";

const Review = DB.review;

export const createReview = catchAsyncErrors(async (req, res) =>{

    const review = await Review.create({
        ...req.body,
        rating: parseFloat(req.body.rating),
    });

    res.status(201).send({
        success: true,
        review
    })
});