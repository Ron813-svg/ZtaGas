import express from "express"
import reviewsController from "../controllers/reviewsControllers.js";

const router = express.Router();

router.route("/").get(reviewsController.getReviews)
.post(reviewsController.insertReview)

router.route("/:id")
.put(reviewsController.updateReview)
.delete(reviewsController.deleteReview)

export default router;