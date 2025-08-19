import express from "express";
import { addReview, approveReview, deleteReview, getReviews } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/", addReview)
reviewRouter.get("/", getReviews)
reviewRouter.put("/approve/:email", approveReview)
reviewRouter.delete("/:email", deleteReview)







export default reviewRouter;