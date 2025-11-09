import React, { useState } from "react";
import SelectDropdown from "../component/SelectDropdown";
import ContentList from "../component/ContentList";
import { regions, categories } from "../utils/contentTypes";
import { getContent } from "../service/adminAPI";

const Dashboard = () => {
  const [region, setRegion] = useState("");
  const [category, setCategory] = useState("");
  const [contentList, setContentList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    if (!region || !category) {
      alert("Please select both Region and Category first!");
      return;
    }

    setLoading(true);
    try {
      const data = await getContent(region, category);
      setContentList(data);
    } catch (error) {
      console.error("Error fetching content:", error);
      alert("Failed to fetch content.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full bg-gradient-to-b from-sky-950 to-slate-900 text-black py-4 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-0 w-full">
        <h1 className="text-3xl font-bold mb-6 text-white">Admin Dashboard</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <SelectDropdown
          label="Select Region"
          value={region}
          options={regions}
          onChange={setRegion} // ✅ fix: direct value
        />

        <SelectDropdown
          label="Select Category"
          value={category}
          options={categories}
          onChange={setCategory} // ✅ fix: direct value
        />

        <div>
          <button
          onClick={handleFetch}
          className="bg-blue-600 text-white px-24 py-2 rounded-md hover:bg-blue-700"
        >
          Show Content
        </button>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-600 text-lg">Loading...</p>
      ) : (
        <ContentList contents={contentList} />
      )}
      </div>
    </main>
  );
};

export default Dashboard;
