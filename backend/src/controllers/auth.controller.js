import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return ApiError(409, "user id already exists.", []);
  }
  const userData = { userName, email, password };
  if (req.body.bio) {
    userData.bio = bio;
  }
});

export { registerUser };
