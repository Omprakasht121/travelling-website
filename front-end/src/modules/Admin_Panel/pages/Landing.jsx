import React, { useState } from "react";
import InputField from "../component/InputField";
import SelectDropdown from "../component/SelectDropdown";
import ImageUploader from "../component/ImageUploader";
import { addContent } from "../service/adminAPI";

 const regions = [
  { label: "Jhansi", value: "jhansi" },
  { label: "Orchha", value: "orchha" },
  { label: "Mauranipur", value: "mauranipur" },
  { label: "Bnadha", value: "Banda" },
  { label: "Chitrakoot", value: "Chitrakoot" },
];


const categories = [
  { label: "Videos", value: "videos" },
  { label: "Images", value: "images" },
  { label: "Advertisement", value: "advertisement" },
  { label: "Destinations", value: "destinations" },
  { label: "About", value: "about" },
  // add more as needed
];

const fieldMap = {
  videos: [
    { name: "title", label: "Title", type: "text" },
    { name: "yt_url", label: "YouTube URL", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
  ],
  images: [
    { name: "title", label: "Title", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
  ],
  advertisement: [
    { name: "title", label: "Ad title", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
  ],
  destinations: [
    { name: "title", label: "Destination Name", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "distance", label: "Distance (km)", type: "text" },
  ],
  about: [
    { name: "title", label: "Heading", type: "text" },
    { name: "description", label: "Content", type: "textarea" },
  ],
};

const AdminLanding = () => {
  const [category, setCategory] = useState("");
  const [formData, setFormData] = useState({});
  const [mainImage, setMainImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const fields = category ? (fieldMap[category] || []) : [];

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category) return setMsg("Please select a category.");
    setLoading(true);
    setMsg("");

    try {
      const payload = new FormData();
      // send category (backend expects "category")
      payload.append("category", category);

      // append fields
      fields.forEach((f) => {
        const val = formData[f.name] || "";
        payload.append(f.name, val);
      });

      // images: mainImage and gallery (names must match backend expected field names)
      if (mainImage) payload.append("mainImage", mainImage);
      if (gallery && gallery.length) {
        gallery.forEach((file) => {
          // backend expects field "gallery" per your routes
          payload.append("gallery", file);
        });
      }

      // If you want region later, you can append region here
      // payload.append("region", "mauranipur");

      const res = await addContent(payload);
      setMsg("Saved successfully.");
      // reset form
      setFormData({});
      setMainImage(null);
      setGallery([]);
      setCategory("");
    } catch (err) {
      console.error(err);
      setMsg("Failed to save content.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin — Add Content (Landing)</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
            <SelectDropdown
              label="Select Category"
              options={categories}
              value={category}
              onChange={(val) => {
                setCategory(val);
                setFormData({}); // clear previous
                setMainImage(null);
                setGallery([]);
              }}
            />

            {fields.map((f) => (
              <InputField
                key={f.name}
                label={f.label}
                name={f.name}
                type={f.type === "textarea" ? "textarea" : f.type}
                value={formData[f.name] || ""}
                onChange={handleFieldChange}
              />
            ))}

            {/* main image (optional for videos too) */}
            <ImageUploader
              label="Main Image (optional)"
              onFileSelect={(file) => setMainImage(file)}
              multiple={false}
            />

            {/* gallery (optional) */}
            <ImageUploader
              label="Gallery Images (optional)"
              onFileSelect={(files) => setGallery(files)}
              multiple={true}
            />

            <div className="flex items-center gap-4">
              <button disabled={loading} type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                {loading ? "Saving..." : "Save Content"}
              </button>
              <div className="text-sm text-gray-700">{msg}</div>
            </div>
          </form>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold">Preview</h3>
          <p className="text-sm text-gray-600 mb-2">Category: {category || "—"}</p>
          <pre className="text-xs bg-gray-100 p-2 rounded">{JSON.stringify(formData, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default AdminLanding;
