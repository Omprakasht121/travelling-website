import express from "express";
import cors from "cors";
import contentRoutes from "./src/routes/contentRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";


const app = express();

app.use(cors());
app.use(express.json());

// ✅ Serve both upload folders
app.use("/uploads", express.static("uploads"));
app.use("/uploads/gallery", express.static("uploads/gallery"));

// ✅ Routes


app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);



// ✅ Health check
app.get("/api/health", (req, res) => res.json({ ok: true }));

export default app;
