

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