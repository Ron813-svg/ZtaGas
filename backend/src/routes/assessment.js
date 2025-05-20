import express from "express";
import assessmentsController from "../controllers/assessmentControllers.js";

const router = express.Router();

router.route("/").get(assessmentsController.getAssessments)
.post(assessmentsController.insertAssessment)

router.route("/:id")
.put(assessmentsController.updateAssessment)
.delete(assessmentsController.deleteAssessment)

export default router;