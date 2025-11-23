// src/routes/contentRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Content from "../models/Content.js";

const router = express.Router();

const UPLOADS_ROOT = path.join(process.cwd(), "uploads");
const GALLERY_DIR = path.join(UPLOADS_ROOT, "gallery");
if (!fs.existsSync(UPLOADS_ROOT)) fs.mkdirSync(UPLOADS_ROOT);
if (!fs.existsSync(GALLERY_DIR)) fs.mkdirSync(GALLERY_DIR);

// Multer: store gallery in uploads/gallery, main images in uploads root
const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.fieldname === "gallery") cb(null, GALLERY_DIR);
    else cb(null, UPLOADS_ROOT);
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, name);
  },
});
const upload = multer({ storage });

// POST (create) — you already have this; keep it
router.post(
  "/",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "gallery", maxCount: 12 },
  ]),
  async (req, res) => {
    try {
      const {
        region,
        category,
        title,
        description,
        distance,
        location,
        price,
        special_dish,
        rating,
        reel_url,ytvideo_link,instagram_url, facebook_url, youtube_url, phone, whatsapp, email, segment,posts, followers, following,
        month, day, date,
      } = req.body;

      const mainFile = req.files?.mainImage?.[0];
      const galleryFiles = req.files?.gallery || [];

      const mainImagePath = mainFile
        ? `/uploads/${mainFile.filename}`
        : null;

      const galleryPaths = galleryFiles.map(
        (f) => `/uploads/gallery/${f.filename}`
      );

      const doc = new Content({
        region: region?.toLowerCase(),
        category: category?.toLowerCase(),
        title,
        description,
        special_dish,
        rating,
        distance,
        location,
        price,
        reel_url,
        ytvideo_link,
        instagram_url,
        facebook_url,
        youtube_url,
        phone,
        whatsapp,
        email,
        segment,
        posts,
        followers,
        following,
        day,
        month,
        date,
        mainImage: mainImagePath,
        gallery: galleryPaths,
        
      });

      const saved = await doc.save();
      res.status(201).json(saved);
    } catch (err) {
      console.error("Error adding content:", err);
      res.status(500).json({
        message: "Failed to add content",
        error: err.message,
      });
    }
  }
);


// GET all content (admin list)
router.get("/all", async (req, res) => {
  try {
    const items = await Content.find({}).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error("Error fetching all content:", err);
    res.status(500).json({ message: "Failed to fetch content" });
  }
});

// GET by region/category (you have this already)
router.get("/:region/:category", async (req, res) => {
  try {
    const { region, category } = req.params;
    const contents = await Content.find({
      region: region.toLowerCase(),
      category: category.toLowerCase(),
    });
    res.json(contents);
  } catch (err) {
    console.error("Error fetching content:", err);
    res.status(500).json({ message: "Failed to fetch content" });
  }
});

// PUT update content (supports replacing files)
// ✅ PUT update content (supports replacing files cleanly)
router.put(
  "/:id",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "gallery", maxCount: 12 },
  ]),
  async (req, res) => {
    try {
      const id = req.params.id;
      const existing = await Content.findById(id);
      if (!existing)
        return res.status(404).json({ message: "Content not found" });

      // 🧩 Extract body data safely
      const data =
        typeof req.body.data === "string"
          ? JSON.parse(req.body.data)
          : req.body;

      // ✅ 1️⃣ Replace main image if uploaded
      if (req.files?.mainImage?.[0]) {
        const newMain = req.files.mainImage[0];
        const newPath = `/uploads/${newMain.filename}`;

        // delete old main image if exists
        if (
          existing.mainImage &&
          existing.mainImage.startsWith("/uploads") &&
          fs.existsSync(path.join(process.cwd(), existing.mainImage))
        ) {
          fs.unlinkSync(path.join(process.cwd(), existing.mainImage));
        }

        data.mainImage = newPath;
      } else {
        // keep old main image if none uploaded
        data.mainImage = existing.mainImage;
      }

      // ✅ 2️⃣ Replace gallery if new files uploaded
      if (req.files?.gallery?.length) {
        const galleryPaths = req.files.gallery.map(
          (f) => `/uploads/gallery/${f.filename}`
        );

        // 🧠 Replace (not append) gallery images
        // If you prefer to append, uncomment next line and remove the one after
        // data.gallery = [...existing.gallery, ...galleryPaths];
        data.gallery = galleryPaths;
      } else {
        // keep old gallery if no new files uploaded
        data.gallery = existing.gallery;
      }

      // ✅ 3️⃣ Remove specific gallery items (optional)
      if (data.removeGallery) {
        const toRemove = Array.isArray(data.removeGallery)
          ? data.removeGallery
          : JSON.parse(data.removeGallery || "[]");

        data.gallery = (data.gallery || []).filter(
          (g) => !toRemove.includes(g)
        );

        toRemove.forEach((p) => {
          if (p && p.startsWith("/uploads")) {
            const fp = path.join(process.cwd(), p);
            if (fs.existsSync(fp)) fs.unlinkSync(fp);
          }
        });
      }

      // ✅ 4️⃣ Update document in DB
      const updated = await Content.findByIdAndUpdate(id, data, { new: true });

      console.log("✅ Updated Content:", updated);
      res.json(updated);
    } catch (err) {
      console.error("Error updating content:", err);
      res
        .status(500)
        .json({ message: "Failed to update content", error: err.message });
    }
  }
);


// DELETE content (remove DB doc + files)
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Content.findById(id);
    if (!item) return res.status(404).json({ message: "Not found" });

    // delete mainImage file
    if (item.mainImage && typeof item.mainImage === "string" && item.mainImage.startsWith("/uploads")) {
      const fp = path.join(process.cwd(), item.mainImage);
      if (fs.existsSync(fp)) fs.unlinkSync(fp);
    }
    // delete gallery files
    if (Array.isArray(item.gallery)) {
      item.gallery.forEach(p => {
        if (p && p.startsWith("/uploads")) {
          const fp = path.join(process.cwd(), p);
          if (fs.existsSync(fp)) fs.unlinkSync(fp);
        }
      });
    }

    await Content.findByIdAndDelete(id);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("Error deleting content:", err);
    res.status(500).json({ message: "Failed to delete", error: err.message });
  }
});

export default router;
