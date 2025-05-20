 
import express from "express";
import branchesControllers from "../controllers/branchesControllers.js";


const router = express.Router();

router.route("/").get(branchesControllers.getBranch)
  .post(branchesControllers.insertBranch);

router.route("/:id").put(branchesControllers.updateBranch)
.delete(branchesControllers.deleteBranch);

export default router;