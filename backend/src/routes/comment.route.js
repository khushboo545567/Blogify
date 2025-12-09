import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import {
  commentOn,
  deleteComment,
  editComment,
  getComment,
} from "../controllers/comment.controller.js";

const router = Router();

router.route("/commented-on/:postId").post(verifyJwt, commentOn);

router.route("/delete-comment/:commentId").delete(verifyJwt, deleteComment);

router.route("/get-comment/:postId").get(verifyJwt, getComment);

router.route("/edit-comment/:commentId").put(verifyJwt, editComment);

export default router;
