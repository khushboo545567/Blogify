import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { uploadOnCloudnary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Role } from "../models/roles.model.js";
import { emailVerificationContent, sendMail } from "../utils/mail.js";

// ✅ REGISTER USER CONTROLLER
const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password, bio } = req.body;

  // Check if user already exists
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  //  Assign role (find from Role collection)
  const userRole = await Role.findOne({ name: "user" });
  if (!userRole) {
    throw new ApiError(500, "Default role 'user' not found in database");
  }

  // Create user object
  const user = new User({
    userName,
    email,
    password,
    bio,
    role: userRole._id,
  });

  // Upload avatar to Cloudinary if provided
  if (req.file?.path) {
    const avatarUrl = await uploadOnCloudnary(req.file.path);
    if (avatarUrl) user.avatar = avatarUrl;
  }

  // Generate email verification token
  const { unHahsedToken, hashedToken, tokenExpiry } = generateTemporaryToken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationTokenExpiry = tokenExpiry;

  // save user before sending email
  await user.save({ validateBeforeSave: false });

  // Generate verification link (frontend or backend endpoint)
  const verificationUrl = `http://localhost:3000/api/v1/users/verify-email?token=${unHahsedToken}`;

  // Send verification email
  const mailgenContent = emailVerificationContent(userName, verificationUrl);
  await sendMail({
    email,
    subject: "Verify your email address",
    mailgenContent,
  });

  // Send success response
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        "User registered successfully! Verification email sent.",
        user
      )
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  const user = await User.findOne({
    $or: [{ userName: userName }, { email: email }],
  });
  if (!user) {
    throw new ApiResponse(400, "user does not exist");
  }
});
export { registerUser, loginUser };
