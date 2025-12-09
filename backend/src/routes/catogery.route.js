import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import {
  createCatogery,
  deleteCatogery,
  getCatogery,
} from "../controllers/catogery.controller.js";
import { authorizeRoles } from "../middleware/rbac.middleware.js";

const router = Router();

router
  .route("/create-catogery")
  .post(verifyJwt, authorizeRoles("admin"), createCatogery);

router.route("/get-catogery").get(verifyJwt, getCatogery);

router
  .route("/delete-catogery/:catId")
  .delete(verifyJwt, authorizeRoles("admin"), deleteCatogery);

export default router;
