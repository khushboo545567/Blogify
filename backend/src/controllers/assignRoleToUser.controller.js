import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Role } from "../models/roles.model.js";
import { User } from "../models/user.model.js";

// add a role to the user
const addRoleToUser = asyncHandler(async (req, res, next) => {
  const { userName, role } = req.body;

  // check if the username and role already exits
  const existUserName = await User.findOne({ userName });
  if (!existUserName) throw new ApiError(404, "User not found");
  const existsRole = await Role.findOne({ name: role });
  if (!existsRole) throw new ApiError(404, "Role not found");

  //check if the user have alredy that role
  if (
    existUserName.role.some((r) => r.toString() === existsRole._id.toString())
  ) {
    throw new ApiError(409, "User already has this role");
  }

  existUserName.role.push(existsRole._id);
  await existUserName.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        existUserName.role,
        `${role} is assigned to ${userName}`
      )
    );
});

// REMOVE ROLE FROM THE USER
const removeRoleToUser = asyncHandler(async (req, res, next) => {});

export { addRoleToUser };
