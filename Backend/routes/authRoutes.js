import express from "express";
import { registerUser, loginUser, checkEmail, resetPassword } from "../controllers/authController.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password/check", checkEmail);           // Step 1: check email
router.post("/forgot-password/reset", resetPassword);        // Step 2: update password


export default router;
