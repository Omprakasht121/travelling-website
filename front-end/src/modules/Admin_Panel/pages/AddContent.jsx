import React, { useState } from "react";
import SelectDropdown from "../component/SelectDropdown";
import DynamicForm from "../component/DynamicForm";
import { regions, categories } from "../utils/contentTypes";
import { addContent } from "../service/adminAPI";

const AddContent = () => {
  const [region, setRegion] = useState("");
  const [category, setCategory] = useState("");
  const [formData, setFormData] = useState({});
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleMainImageChange = (file) => setMainImage(file);
  const handleGalleryChange = (files) => setGalleryImages(files);

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!region || !category) {
    alert("Please select region and category");
    return;
  }

  const form = new FormData();
  form.append("region", region);
  form.append("category", category);

  // ✅ append all text fields
  Object.keys(formData).forEach((key) => {
    form.append(key, formData[key]);
  });

  // ✅ Append both main and gallery images
  if (mainImage) form.append("mainImage", mainImage);
  if (galleryImages?.length > 0) {
    galleryImages.forEach((img) => form.append("gallery", img));
  }

  try {
    setLoading(true);
    await addContent(form);
    alert("Content added successfully!");
    setFormData({});
    setMainImage(null);
    setGalleryImages([]);
  } catch (err) {
    console.error(err);
    alert("Failed to add content");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Add New Content
        </h1>

        <div className="flex flex-col gap-4">
          <SelectDropdown
            label="Region"
            options={regions}
            value={region}
            onChange={setRegion}
          />
          <SelectDropdown
            label="Category"
            options={categories}
            value={category}
            onChange={setCategory}
          />

          <DynamicForm
            category={category}
            formData={formData}
            setFormData={setFormData}
            handleMainImageChange={handleMainImageChange}
            handleGalleryChange={handleGalleryChange}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 mt-4"
          >
            {loading ? "Uploading..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddContent;
