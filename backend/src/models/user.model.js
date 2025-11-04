import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = mongoose.Schema(
  {
    userName: { type: String, required: true, trim: true, unique: true },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: { type: String, required: true, minlength: 6 },
    avatar: {
      type: {
        url: String,
        localPath: String,
      },
      default: { url: `https://placehold.co/200x200`, localPath: "" },
    },
    bio: { type: String, maxlength: 100 },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    forgetPasswordToken: {
      type: String,
    },
    expiryPasswordToken: {
      type: Date,
    },
    emailVerificationToken: {
      type: String,
    },
    emailExpiryVerificationToken: {
      type: Date,
    },
  },
  { timestamps: true }
);

// pre methods

userSchema.pre("save", async function (next) {
  // only runs if the password gets changed
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// generate access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      role: this.role,
      userName: this.userName,
    },
    process.env.ACCESSTOKEN_SECRET,
    { expiresIn: "1h" }
  );
};

// generate refresh token
userSchema.methods.generateRefershToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESHTOKEN_SECRET, {
    expiresIn: "2d",
  });
};

// generate the token for password reset and password forget
userSchema.methods.generateTemporaryToken = function () {
  const unHahsedToken = crypto.randomBytes(20).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(unHahsedToken)
    .digest("hex");

  const min = 20 * 60 * 1000;
  const tokenExpiry = Date.now() + min;
  return { unHahsedToken, hashedToken, tokenExpiry };
};

export const User = mongoose.model("User", userSchema);
