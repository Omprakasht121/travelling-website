import React, { useState } from "react";
import { updateContent } from "../service/adminAPI";
import InputField from "./InputField";
import ImageUploader from "./ImageUploader";

// ✅ SAME CONFIG USED IN DynamicForm.jsx
const fieldConfig = {
  advertisement: [
    { name: "title", label: "Ad Name", type: "text" },
    { name: "distance", label: "Distance (in meter)", type: "number" },
    { name: "location", label: "Location", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
  ],
  shops: [
    { name: "title", label: "Shop Name", type: "text" },
    { name: "distance", label: "Distance (in meter)", type: "number" },
    { name: "location", label: "Location", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
  ],
  hotels: [
    { name: "title", label: "Hotel Name", type: "text" },
    { name: "price", label: "Price (₹/night)", type: "number" },
    { name: "location", label: "Location", type: "text" },
    { name: "rating", label: "Rating", type: "number" },
    { name: "description", label: "Description", type: "textarea" },
  ],
  food: [
    { name: "title", label: "Dish/Restaurant Name", type: "text" },
    { name: "special-dish", label: "Special Dish", type: "text" },
    { name: "location", label: "Location", type: "text" },
    { name: "rating", label: "Rating", type: "number" },
    { name: "description", label: "Description", type: "textarea" },
  ],
  destinations: [
    { name: "title", label: "Destination Name", type: "text" },
    { name: "location", label: "Location", type: "text" },
    { name: "distance", label: "Distance (km)", type: "number" },
    { name: "description", label: "Description", type: "textarea" },
  ],
  Images: [{ name: "title", label: "title", type: "text" }],
  videos: [
    { name: "title", label: "Title", type: "text" },
    { name: "reel_url", label: "Insta-Reel-URL", type: "text" },
    { name: "description", label: "description", type: "text" },
  ],
};

const EditContentModal = ({ content, onClose }) => {
  const category = content.category; // ✅ extract category
  const fields = fieldConfig[category] || [];

  const [formData, setFormData] = useState(() => {
    const initial = {};
    fields.forEach((f) => {
      initial[f.name] = content[f.name] || "";
    });
    return initial;
  });

  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();

  // Append all text fields
  Object.entries(formData).forEach(([key, value]) => {
    data.append(key, value);
  });

  // ✅ Append main image
  if (mainImage) {
    data.append("mainImage", mainImage);
  }

  // ✅ Append gallery images (correct field name!)
  if (galleryImages && galleryImages.length > 0) {
    galleryImages.forEach((img) => data.append("gallery", img));
  }

  try {
    await updateContent(content._id, data);
    alert("✅ Content updated successfully!");
    onClose();
    window.location.reload();
  } catch (error) {
    console.error("Error updating content:", error);
    alert("❌ Failed to update content");
  }
};


  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[430px] shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit {category}</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* ✅ Dynamic Inputs (same style as DynamicForm) */}
          {fields.map((field) => (
            <InputField
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              value={formData[field.name] || ""}
              onChange={handleChange}
            />
          ))}

          {/* ✅ Main Image */}
          <ImageUploader
            label="Replace Main Image"
            onFileSelect={(file) => setMainImage(file)}
            multiple={false}
          />

          {/* ✅ Gallery */}
          <ImageUploader
            label="Add Gallery Images"
            onFileSelect={(files) => setGalleryImages(files)}
            multiple={true}
          />

          <div className="flex justify-between mt-3">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Update
            </button>
            <button
              onClick={onClose}
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditContentModal;
