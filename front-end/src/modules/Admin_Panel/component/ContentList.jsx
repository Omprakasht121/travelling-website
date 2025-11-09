import React, { useState } from "react";
import EditContentModal from "./EditContentModal";
import { deleteContent } from "../service/adminAPI";

const backendURL = "http://localhost:5000";

const ContentList = ({ contents = [] }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this content?")) return;
    await deleteContent(id);
    alert("Content deleted successfully!");
    window.location.reload();
  };

  if (!contents.length)
    return <p className="text-gray-500 text-lg">No content found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {contents.map((item) => (
        <div
          key={item._id}
          className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
        >
          <div>
            <h2 className="font-bold text-lg mb-1 capitalize">{item.title}</h2>
            <p className="text-gray-600 text-sm mb-2">{item.description}</p>

            {item.mainImage && (
              <img
                src={`${backendURL}${item.mainImage}`}
                alt={item.title}
                className="w-full h-[35vh] md:h-[40vh] object-cover rounded-md mb-2"
              />
            )}

            <p className="text-xs text-gray-500">
              <strong>Region:</strong> {item.region}
            </p>
            <p className="text-xs text-gray-500">
              <strong>Category:</strong> {item.category}
            </p>
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => setSelectedItem(item)}
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(item._id)}
              className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {selectedItem && (
        <EditContentModal
          content={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default ContentList;
