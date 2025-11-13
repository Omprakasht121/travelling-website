import React from "react";
import InputField from "./InputField";
import ImageUploader from "./ImageUploader";

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
  creators: [
    { name: "title", label: "UserName", type: "text" },
    { name: "segment", label: "segment", type: "text" },
    { name: "instagram_url", label: "Insta-URL", type: "text" },
    { name: "youtube_url", label: "Youtube-URL", type: "text" },
    { name: "facebook_url", label: "Facebook-URL", type: "text" },
    { name: "phone", label: "Phone-Number", type: "number" },
    { name: "whatsapp", label: "WhatsApp-No.", type: "number" },
    { name: "email", label: "Email-id", type: "text" },
    { name: "posts", label: "Posts", type: "number" },
    { name: "followers", label: "Followers", type: "number" },
    { name: "following", label: "Following", type: "number" },
    { name: "description", label: "Description", type: "textarea" },
  ],
  Images:[
    { name: "title", label: "title", type: "text" },
  ],
  videos:[
    { name: "title", label: "Title", type: "text" },
    { name: "reel_url", label: "Insta-Reel-URL", type: "text" },
    { name: "description", label: "description", type: "text" },
  ]
};

const DynamicForm = ({
  category,
  formData,
  setFormData,
  handleMainImageChange,
  handleGalleryChange,
}) => {
  if (!category) return null;
  const fields = fieldConfig[category] || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-md">
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

      {/* ✅ Main Image Uploader */}
      <ImageUploader
        label="Upload Main Image"
        onFileSelect={handleMainImageChange}
        multiple={false}
      />

      {/* ✅ Gallery Uploader */}
      <ImageUploader
        label="Upload Gallery Images"
        onFileSelect={handleGalleryChange}
        multiple={true}
      />
    </div>
  );
};

export default DynamicForm;
