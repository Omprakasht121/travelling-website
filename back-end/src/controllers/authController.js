// src/controllers/authController.js
import AdminUser from "../models/AdminUser.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const registerAdmin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "username/password required" });
  const existing = await AdminUser.findOne({ username });
  if (existing) return res.status(400).json({ message: "User exists" });
  const hash = await bcrypt.hash(password, 10);
  const admin = new AdminUser({ username, passwordHash: hash });
  await admin.save();
  res.json({ message: "Admin created" });
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const admin = await AdminUser.findOne({ username });
  if (!admin) return res.status(401).json({ message: "Invalid credentials" });
  const ok = await bcrypt.compare(password, admin.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: admin._id, username: admin.username, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "8h" });
  res.json({ token });
};
