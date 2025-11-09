import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Content from "../models/Content.js";

const router = express.Router();

// ✅ Create folders if not exist
const UPLOADS_ROOT = path.join(process.cwd(), "uploads");
const GALLERY_DIR = path.join(UPLOADS_ROOT, "gallery");
if (!fs.existsSync(UPLOADS_ROOT)) fs.mkdirSync(UPLOADS_ROOT);
if (!fs.existsSync(GALLERY_DIR)) fs.mkdirSync(GALLERY_DIR);

// ✅ Storage logic based on field name
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "gallery") cb(null, GALLERY_DIR);
    else cb(null, UPLOADS_ROOT);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

// ✅ POST: Add new content (main image + multiple gallery)
router.post(
  "/",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "gallery", maxCount: 12 },
  ]),
  async (req, res) => {
    try {
      const { region, category, title, description, distance,location,price,special_dish,rating ,reel_url} = req.body;

      const mainImageFile =
        req.files && req.files.mainImage && req.files.mainImage[0];
      const galleryFiles = req.files && req.files.gallery ? req.files.gallery : [];

      const mainImagePath = mainImageFile
        ? `/uploads/${mainImageFile.filename}`
        : null;

      const galleryPaths = galleryFiles.map(
        (f) => `/uploads/gallery/${f.filename}`
      );

      const newContent = new Content({
        region: region.toLowerCase(),
        category: category.toLowerCase(),
        title,
        description,
        special_dish,
        rating,
        distance,
        location,
        price,
        reel_url,
        mainImage: mainImagePath,
        gallery: galleryPaths,
      });

      const saved = await newContent.save();
      res
        .status(201)
        .json({ message: "Content added successfully", content: saved });
    } catch (err) {
      console.error("Error adding content:", err);
      res
        .status(500)
        .json({ message: "Failed to add content", error: err.message });
    }
  }
);

// ✅ GET: Fetch by region & category
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

export default router;
















// import React, { useState } from "react";
// import { updateContent } from "../service/adminAPI";
// import ImageUploader from "./ImageUploader";

// const EditContentModal = ({ content, onClose }) => {
//   const [formData, setFormData] = useState({
//     title: content.title || "",
//     description: content.description || "",
//     distance: content.distance || "",
//     rating: content.rating || 0,
//     location: content.location || "",
//     price: content.price || "",
//   });

//   const [mainImage, setMainImage] = useState(null);
//   const [galleryImages, setGalleryImages] = useState([]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     Object.entries(formData).forEach(([key, value]) =>
//       data.append(key, value)
//     );
//     if (mainImage) data.append("mainImage", mainImage);
//     galleryImages.forEach((img) => data.append("gallery", img));

//     await updateContent(content._id, data);
//     alert("Content updated successfully!");
//     onClose();
//     window.location.reload();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg">
//         <h2 className="text-xl font-bold mb-4">Edit Content</h2>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//           <input
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             placeholder="Title"
//           />
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             placeholder="Description"
//           />
//           <input
//             name="distance"
//             value={formData.distance}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             placeholder="Distance"
//           />
//           <input
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             placeholder="Location"
//           />
//           <input
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             placeholder="Price"
//           />
//           <input
//             name="rating"
//             value={formData.rating}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             placeholder="Rating"
//           />

//           <ImageUploader
//             label="Replace Main Image"
//             onFileSelect={(file) => setMainImage(file)}
//             multiple={false}
//           />
//           <ImageUploader
//             label="Add Gallery Images"
//             onFileSelect={(files) => setGalleryImages(files)}
//             multiple={true}
//           />

//           <div className="flex justify-between mt-3">
//             <button
//               type="submit"
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//             >
//               Update
//             </button>
//             <button
//               onClick={onClose}
//               type="button"
//               className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditContentModal;
