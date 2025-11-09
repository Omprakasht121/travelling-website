import React, { useState } from "react";

const ImageUploader = ({ label, onFileSelect, multiple = false }) => {
  const [previews, setPreviews] = useState([]);

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    if (multiple) {
      onFileSelect(files);
      setPreviews(files.map((file) => URL.createObjectURL(file)));
    } else {
      const file = files[0];
      onFileSelect(file);
      setPreviews([URL.createObjectURL(file)]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleChange}
      />
      <div className="flex gap-2 mt-2 flex-wrap">
        {previews.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`preview-${idx}`}
            className="w-24 h-24 object-cover rounded-md border"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
