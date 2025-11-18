import express from "express";
import { login, registerAdmin } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// Public routes
router.post("/login", login);
router.post("/register", registerAdmin);

// Protected admin-only route example
router.get("/check", verifyToken, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  res.json({ message: "Admin verified" });
});

export default router;
