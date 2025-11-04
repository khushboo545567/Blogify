import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

// configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadOnCloudnary = async (localPath) => {
  try {
    if (!localPath) return null;
    const upload = await cloudinary.uploader.upload(localPath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localPath);
    return upload;
  } catch (error) {
    fs.unlinkSync(localPath);
    return null;
  }
};

export { uploadOnCloudnary };
