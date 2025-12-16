import express from "express";
import multer from "multer";

import Content from "../models/Content.js";
import cloudinary from "../utils/cloudinary.js";

const router = express.Router();

/* =========================================================
   MULTER CONFIG — MEMORY STORAGE (NO DISK, NO ERRORS)
========================================================= */

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB per file
  },
});

/* =========================================================
   HELPER: UPLOAD BUFFER TO CLOUDINARY
========================================================= */

const uploadToCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: "auto",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      )
      .end(buffer);
  });
};

/* =========================================================
   CREATE CONTENT (POST)
========================================================= */

router.post(
  "/",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "gallery", maxCount: 12 },
  ]),
  async (req, res) => {
    try {
      const body = req.body;

      const titleSlug =
        body.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "unknown";

      let mainImage = null;
      let gallery = [];

      /* ---------- MAIN IMAGE ---------- */
      if (req.files?.mainImage?.[0]) {
        const result = await uploadToCloudinary(
          req.files.mainImage[0].buffer,
          `unseen-bundelkhand/destinations/${titleSlug}/cover`
        );
        mainImage = result.secure_url;
      }

      /* ---------- GALLERY IMAGES ---------- */
      if (req.files?.gallery?.length) {
        for (const file of req.files.gallery) {
          const result = await uploadToCloudinary(
            file.buffer,
            `unseen-bundelkhand/destinations/${titleSlug}/gallery`
          );
          gallery.push(result.secure_url);
        }
      }

      const doc = new Content({
        region: body.region?.toLowerCase(),
        category: body.category?.toLowerCase(),
        title: body.title,
        description: body.description,
        distance: body.distance,
        location: body.location,
        price: body.price,
        special_dish: body.special_dish,
        rating: body.rating,

        reel_url: body.reel_url,
        ytvideo_link: body.ytvideo_link,
        instagram_url: body.instagram_url,
        facebook_url: body.facebook_url,
        youtube_url: body.youtube_url,

        phone: body.phone,
        whatsapp: body.whatsapp,
        email: body.email,

        segment: body.segment,
        posts: body.posts,
        followers: body.followers,
        following: body.following,

        month: body.month,
        day: body.day,
        date: body.date,

        mainImage,
        gallery,
      });

      const saved = await doc.save();
      res.status(201).json(saved);
    } catch (err) {
      console.error("CREATE ERROR:", err);
      res.status(500).json({
        message: "Failed to create content",
        error: err.message,
      });
    }
  }
);

/* =========================================================
   GET ALL CONTENT (ADMIN)
========================================================= */

router.get("/all", async (req, res) => {
  try {
    const items = await Content.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
});

/* =========================================================
   GET BY REGION & CATEGORY (USER)
========================================================= */

router.get("/:region/:category", async (req, res) => {
  try {
    const { region, category } = req.params;

    const items = await Content.find({
      region: region.toLowerCase(),
      category: category.toLowerCase(),
    });

    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
});

/* =========================================================
   DELETE CONTENT (DB ONLY — CLOUDINARY SAFE)
========================================================= */

router.delete("/:id", async (req, res) => {
  try {
    await Content.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;
