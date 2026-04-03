

import bcrypt from "bcrypt";
import { UserModel } from "../models/user-schema.js";

//register user

export const registerUser = async (userObject) => {
  try {
    // Generate salt and hash password
    const salt = await bcrypt.genSalt(3);
    const hashedPassword = await bcrypt.hash(userObject.password, salt);

    // Replace plain password with hashed one
    userObject.password = hashedPassword;

    const doc = await UserModel.create(userObject);
    return doc;
  } catch (err) {
    console.log("Error while registering user:", err);
    throw err;
  }
};


export const loginUser = async (userObject) => {
  try {
    const user = await UserModel.findOne({ email: userObject.email }).exec();

    if (!user) return null; // No user with this email

    // Compare entered password with stored hashed password
    const isMatch = await bcrypt.compare(userObject.password, user.password);
    if (!isMatch) return null; // Password incorrect

    return user;
  } catch (err) {
    console.log("Error while logging in user:", err);
    throw err;
  }
};

// get user by id
export const getUserById = async (userId) => {
  try {
    const user = await UserModel.findById(userId).select("-password").exec();
    return user;
  } catch (err) {
    console.log("Error while fetching user:", err);
    throw err;
  }
};

// update user details
export const updateUserDetails = async (userId, data) => {
  try {
    const user = await UserModel.findByIdAndUpdate(userId, { name: data.name }, { new: true }).select("-password").exec();
    return user;
  } catch (err) {
    console.log("Error while updating user:", err);
    throw err;
  }
};

// update user password
export const updateUserPassword = async (userId, oldPassword, newPassword) => {
  try {
    const user = await UserModel.findById(userId).exec();
    if (!user) throw new Error("User not found");

    // Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) throw new Error("Incorrect current password");

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    user.password = hashedPassword;
    await user.save();
    return true;
  } catch (err) {
    console.log("Error while updating password:", err);
    throw err;
  }
};