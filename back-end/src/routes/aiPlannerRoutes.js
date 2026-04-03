import express from "express";
import { generateHybridItinerary } from "../controllers/aiPlannerController.js";

const router = express.Router();

// POST /api/ai/planner
// We can optionally add verifyToken middleware here later to restrict to logged-in users only
router.post("/planner", generateHybridItinerary);

export default router;
