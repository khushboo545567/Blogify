// do only authorize role and the ower check do not need of permission check

import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { Role } from "../models/roles.model.js";

// RESOLVE USER ROLE AND CASH IT IN REQ.USER.ROLENAME SO THAT WE DONT HAVE TO CALL DB FREQUENTLY
// accept the object of user
// return the array of roleName
const resolveRoleName = asyncHandler(async (user) => {
  if (!user) {
    return [];
  }
  // return cached if present
  if (Array.isArray(user._roleNames) && user._roleNames.length)
    return user._roleNames;

  //   roles object id fetch  the roleName and return an array of roleNames

  const roles = await Role.find({ _id: { $in: user.role } }).select("name");
  const names = roles.map((r) => String(r.name).trim().toLowerCase());
  user._roleNames = names;
  return names;
});

// AUTHORIZE ROLES
const authorizeRoles = (...allowedRoles) => {
  asyncHandler(async (req, res, next) => {
    const user = req.user;
    if (!user) {
      throw new ApiError(401, "Unauthenticated");
    }

    const allowed = allowedRoles.map((r) => String(r).trim().toLowerCase());
    const userRoleNames = await resolveRoleName(user);
    const ok = userRoleNames.some((rn) => allowed.includes(rn));
    if (!ok) throw new ApiError(403, "Forbidden");
    next();
  });
};

// allowRoleOrOwner(resourceModel, options)
const allowRoleOrOwner =
  (resourceModel,
  (options = {}) =>
    asyncHandler(async (req, res, next) => {
      const user = req.user;
      if (!user) throw new ApiError(401, "Unauthenticated");

      const {
        idParam = "id", //target id post,comment
        ownerField = "author", //user id
        allowedRoles = ["admin", "editor"],
      } = options;

      // 1) If user has an allowed role -> allow immediately
      const userRoleNames = await resolveRoleName(user);
      const allowedLower = allowedRoles.map((r) =>
        String(r).trim().toLowerCase()
      );
      if (userRoleNames.some((rn) => allowedLower.includes(rn))) {
        return next();
      }

      // 2) Otherwise check ownership
      const resourceId = req.params[idParam];
      if (!resourceId)
        throw new ApiError(400, "Missing resource id for ownership check");

      const resource = await resourceModel
        .findById(resourceId)
        .select(ownerField); //it will find the user id

      if (!resource) throw new ApiError(404, "Resource not found"); // if the user is not found it means that the post is not created by that user

      const ownerVal = resource[ownerField];
      if (!ownerVal) throw new ApiError(500, "Resource owner field not found");

      const ownerId = ownerVal.toString();
      if (ownerId === user.id.toString()) return next();

      throw new ApiError(403, "Forbidden — not owner");
    }));

export { resolveRoleName, authorizeRoles, allowRoleOrOwner };
