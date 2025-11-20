// backend/routes/search.js
import express from "express";
import Content from "../models/Content.js"; // Assuming one big collection
// import Hotel from "../models/Hotel.js"; // If you had separate collections

const router = express.Router();

router.get("/", async (req, res) => {
  const query = req.query.query;
  const category = req.query.category;

  if (!query || query.trim() === "") return res.json([]);

  const regex = new RegExp(query, "i");

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
      .select("title category mainImage slug")
      .limit(20);

    res.json(results);
  } catch (err) {
    console.error("Search Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});


export default router;