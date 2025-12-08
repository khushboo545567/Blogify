import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/rbac.middleware.js";
import {
  createPermission,
  deletePermission,
} from "../controllers/permission.controller.js";

const router = Router();

router
  .route("/create-permission")
  .post(verifyJwt, authorizeRoles("admin"), createPermission);

router
  .route("/delete-permission/:permissionId")
  .delete(verifyJwt, authorizeRoles("admin"), deletePermission);

export default router;
