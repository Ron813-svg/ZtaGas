import express from 'express';
import loginController from '../controllers/loginControllers.js';

const router = express.Router();

router.route("/").post(loginController.Login);

export default router;