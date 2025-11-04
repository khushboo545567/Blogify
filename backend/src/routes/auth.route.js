import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { loginUser, registerUser } from "../controllers/auth.controller.js";

const router = Router();

// Register
router.route("/register").post(upload.single("avatar"), registerUser);

// login
router.route("/login").post(loginUser);

// verifyemail
router.get("/verify-email", verifyEmail);

export default router;
