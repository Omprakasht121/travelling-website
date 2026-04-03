// backend/routes/search.js
import express from "express";
import Content from "../models/Content.js"; // Assuming one big collection
// import Hotel from "../models/Hotel.js"; // If you had separate collections

const router = express.Router();

router.get("/", async (req, res) => {
  const query = req.query.query;
  const category = req.query.category;

  if (!query || query.trim() === "") return res.json([]);

  // Escape special regex characters to prevent ReDoS attacks
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(escaped, "i");

  let filter = {
    $or: [
      { title: { $regex: regex }},
      { category: { $regex: regex }},
      { region: { $regex: regex }},
      { description: { $regex: regex }},
      { special_dish: { $regex: regex }},
      { location: { $regex: regex }},
      { segment: { $regex: regex }}
    ]
  };

  if (category && category !== "all") {
    filter.category = category.toLowerCase();
  }

  try {
  const results = await Content.find(filter)
    .select("title category region mainImage slug")
    .limit(20);

  // add "source" so frontend knows this item is from DB
  const dbResults = results.map(item => ({
    ...item._doc,
    source: "db"
  }));

  res.json(dbResults);
} 
catch (err) {
  console.error("Search Error:", err);
  res.status(500).json({ message: "Server Error" });
}

});


export default router;