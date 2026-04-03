import express from "express";
import Trip from "../models/Trip.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// Middleware inside the route files to protect all Trip routes
router.use(verifyToken);

// 1. Create a new trip
router.post("/", async (req, res) => {
  try {
    const { title, days } = req.body;
    
    // Create base trip
    const newTrip = new Trip({
      userId: req.user.id,
      title: title || "My Trip",
      days: days || [{ dayNumber: 1, locations: [] }],
    });

    const savedTrip = await newTrip.save();
    res.status(201).json(savedTrip);
  } catch (error) {
    console.error("Error creating trip:", error);
    res.status(500).json({ error: "Failed to create trip" });
  }
});

// 2. Get all trips for the authenticated user
router.get("/", async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user.id })
                            .sort({ createdAt: -1 })
                            .populate("days.locations.contentId");
    res.status(200).json(trips);
  } catch (error) {
    console.error("Error fetching trips:", error);
    res.status(500).json({ error: "Failed to fetch trips" });
  }
});

// 3. Get a specific trip by ID (Populate content details)
router.get("/:id", async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, userId: req.user.id })
                           .populate("days.locations.contentId");
    
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }
    
    res.status(200).json(trip);
  } catch (error) {
    console.error("Error fetching trip:", error);
    res.status(500).json({ error: "Failed to fetch trip details" });
  }
});

// 4. Update trip (Rename, Reorder days/locations)
router.put("/:id", async (req, res) => {
  try {
    const { title, days, status } = req.body;
    const tripId = req.params.id;

    // We replace the days array or specific fields
    const updatedTrip = await Trip.findOneAndUpdate(
      { _id: tripId, userId: req.user.id },
      { $set: { title, days, status } },
      { new: true }
    ).populate("days.locations.contentId");

    if (!updatedTrip) {
      return res.status(404).json({ error: "Trip not found or unauthorized update" });
    }

    res.status(200).json(updatedTrip);
  } catch (error) {
    console.error("Error updating trip:", error);
    res.status(500).json({ error: "Failed to update trip" });
  }
});

// 5. Delete a trip
router.delete("/:id", async (req, res) => {
  try {
    const tripId = req.params.id;
    const deletedTrip = await Trip.findOneAndDelete({ _id: tripId, userId: req.user.id });
    
    if (!deletedTrip) {
      return res.status(404).json({ error: "Trip not found or unauthorized delete" });
    }
    
    res.status(200).json({ message: "Trip deleted successfully" });
  } catch (error) {
    console.error("Error deleting trip:", error);
    res.status(500).json({ error: "Failed to delete trip" });
  }
});

// 6. Add a location to a specific day of a trip
router.post("/:id/locations", async (req, res) => {
  try {
    const tripId = req.params.id;
    const { contentId, category, dayNumber } = req.body;

    const trip = await Trip.findOne({ _id: tripId, userId: req.user.id });
    if (!trip) return res.status(404).json({ error: "Trip not found" });

    // Find the requested day or create it
    let day = trip.days.find(d => d.dayNumber === dayNumber);
    if (!day) {
      day = { dayNumber, locations: [] };
      trip.days.push(day);
    }
    
    // Check if the location is already on this day
    const alreadyExists = day.locations.some(loc => loc.contentId.toString() === contentId);
    if (alreadyExists) {
      return res.status(400).json({ error: "Location already exists in this day" });
    }

    // Add exactly to that day's locations
    day.locations.push({ contentId, category });
    
    await trip.save();
    
    // Send back fully populated trip so frontend can get the newly added content details immediately
    const populatedTrip = await Trip.findById(tripId).populate("days.locations.contentId");
    res.status(200).json(populatedTrip);
  } catch (error) {
    console.error("Error adding location to trip:", error);
    res.status(500).json({ error: "Failed to add location" });
  }
});

export default router;
