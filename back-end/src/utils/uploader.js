import cloudinary from "./cloudinary.js";
import fs from "fs";

export const uploadToCloudinary = async (filePath, folder) => {
  try {
    const res = await cloudinary.uploader.upload(filePath, { folder });
    fs.unlinkSync(filePath); // Remove temp file
    return res;
  } catch (error) {
    console.error("Upload Error:", error);
    throw error;
  }
};

export const deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Delete Error:", error);
  }
};
