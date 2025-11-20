import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import contentRoutes from "./src/routes/contentRoutes.js";
import { userRoutes } from "./src/routes/userRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import searchRoutes from "./src/routes/searchRoutes.js";





const app = express();

app.use(cors());
dotenv.config();
app.use(express.json());

// ✅ Serve both upload folders
app.use("/uploads", express.static("uploads"));
app.use("/uploads/gallery", express.static("uploads/gallery"));

// ✅ Routes


app.use('/',userRoutes);
app.use("/admin", adminRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/search", searchRoutes);




// ✅ Health check
app.get("/api/health", (req, res) => res.json({ ok: true }));

export default app;
