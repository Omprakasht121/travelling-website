// src/routes/authRoutes.js
import express from "express";
import { registerAdmin, login } from "../controllers/authController.js";
const router = express.Router();

// NOTE: protect register route or run only once to create initial admin
router.post("/register", registerAdmin);
router.post("/login", login);

export default router;
