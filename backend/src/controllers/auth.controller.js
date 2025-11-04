import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { uploadOnCloudnary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Role } from "../models/roles.model.js";

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  const existeduser = await User.findOne({ email });
  if (existeduser) {
    throw new ApiError(409, "User already exists");
  }

  const userData = { userName, email, password };
  if (req.body.bio) {
    userData.bio = req.body.bio;
  }

  const usersRole = await Role.findOne({ name: "user" });
  userData.role = usersRole._id;

  // get the file path to upload in the cloudnary
  const avatarFilePath = req.file?.path;

  if (avatarFilePath) {
    const avatarUrl = await uploadOnCloudnary(avatarFilePath);
    if (avatarUrl) {
      userData.avatar = avatarUrl;
    }
  }

  // verify users email so genreate the token
  const { unHahsedToken, hashedToken, tokenExpiry } = generateTemporaryToken();
  userData.emailVerificationToken = hashedToken;
  userData.emailExpiryVerificationToken = unHahsedToken;
  await userData.save({ validateBeforeSave: false });

  // send the mail to verify email

  const user = await User.create(userData);
  return res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully !", user));
});

const loginUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  const existedUser = await User.findOne({ $or: [{ userName, email }] });
  if (!existedUser) {
    throw new ApiError(409, "user does not exsit ! please reigster");
  }
});
export { registerUser, loginUser };
