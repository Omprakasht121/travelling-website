// src/models/AdminUser.js
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  passwordHash: String,
  role: { type: String, default: "admin" }
}, { timestamps: true });

export default mongoose.model("AdminUser", adminSchema);
