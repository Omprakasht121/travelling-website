// src/middlewares/upload.js
import multer from "multer";
import fs from "fs";
import path from "path";

const uploadsDir = "uploads";
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// local disk storage (used when USE_CLOUDINARY != "true")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = Date.now() + "-" + Math.random().toString(36).substring(2, 8) + ext;
    cb(null, name);
  }
});

export const upload = multer({ storage });
