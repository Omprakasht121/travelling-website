import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Content",
    required: true,
  },
  category: {
    type: String, // e.g., 'destination', 'hotel', 'food'
    required: true,
  },
  notes: {
    type: String,
    maxLength: 500,
  },
}, { _id: true }); // keep _id for easy drag and drop identification

const DaySchema = new mongoose.Schema({
  dayNumber: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
  },
  locations: [LocationSchema],
}, { _id: true });

const TripSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100,
  },
  status: {
    type: String,
    enum: ["planned", "completed", "draft"],
    default: "planned",
  },
  days: [DaySchema],
}, { timestamps: true });

const Trip = mongoose.model("Trip", TripSchema);
export default Trip;
