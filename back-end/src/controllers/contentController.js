// src/controllers/contentController.js
import Content from "../models/Content.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";

const USE_CLOUDINARY = process.env.USE_CLOUDINARY === "true";

export const createContent = async (req, res) => {
  try {
    const { region, contentType, title, summary, description, published = "true" } = req.body;
    // meta: gather any non-standard fields into meta
    const meta = {};
    // copy all body keys except known ones
    for (const key of Object.keys(req.body)) {
      if (!["region", "contentType", "title", "summary", "description", "published"].includes(key)) {
        meta[key] = req.body[key];
      }
    }

    const media = [];

    // handle uploaded files (req.files from multer)
    // multer will produce req.files where each file field is listed, but if using upload.single multiple fields might not come
    // assume upload.any() used in route and req.files is array
    if (req.files && req.files.length) {
      for (const file of req.files) {
        if (USE_CLOUDINARY) {
          // upload to cloudinary
          const uploadRes = await cloudinary.uploader.upload(file.path, { folder: `content/${contentType}` });
          media.push({ type: "image", url: uploadRes.secure_url });
          // remove local file
          fs.unlinkSync(file.path);
        } else {
          // local file: serve via /uploads/<filename>
          const url = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
          media.push({ type: "image", url });
        }
      }
    }

    // Also allow embed media from body fields (e.g., embedUrl, videoUrl)
    if (req.body.embedUrl) {
      media.push({ type: "embed", url: req.body.embedUrl });
    }
    if (req.body.videoUrl) {
      media.push({ type: "video", url: req.body.videoUrl });
    }

    const doc = new Content({
      title,
      region,
      contentType,
      summary,
      description,
      media,
      meta,
      published: published === "true"
    });

    const saved = await doc.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("createContent error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const listContent = async (req, res) => {
  try {
    const { region, contentType, published } = req.query;
    const filter = {};
    if (region) filter.region = region;
    if (contentType) filter.contentType = contentType;
    if (published !== undefined) filter.published = published === "true";
    const items = await Content.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getContentById = async (req, res) => {
  try {
    const item = await Content.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateContent = async (req, res) => {
  try {
    const updates = { ...req.body };
    // handle files like in createContent if req.files present (left as exercise)
    const item = await Content.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteContent = async (req, res) => {
  try {
    await Content.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
