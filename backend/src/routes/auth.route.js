import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { verifyEmail } from "../controllers/verifyEmail.controller.js";
import { registerUserValidator } from "../validators/auth.validator.js";
import { validate } from "../middleware/validator.middleware.js";

const router = Router();

// Register
router
  .route("/register")
  .post(
    upload.single("avatar"),
    registerUserValidator(),
    validate,
    registerUser
  );

// login
router.route("/login").post(loginUser);

// verifyemail
router.get("/verify-email", verifyEmail);

export default router;
