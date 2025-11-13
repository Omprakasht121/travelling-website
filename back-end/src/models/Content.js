import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    region: { type: String, required: true, lowercase: true },
    category: { type: String, required: true, lowercase: true },
    title: { type: String},
    special_dish : {type:String},
    description: { type: String },
    reel_url: { type: String },
    instagram_url: { type: String },
    youtube_url: { type: String },
    facebook_url: { type: String },
    segment:{type:String},
    distance: { type: String },
    location: { type: String },
    price:{type:String},
    rating: { type: Number, default: 0 },
    phone: { type: Number, default: 0},
    whatsapp: { type: Number, default: 0 },
    email: { type: String },              // ✅ single image path
    mainImage: { type: String },              // ✅ single image path
    gallery: { type: [String], default: [] }, // ✅ multiple gallery image paths
    distance: { type: String },
    rating: { type: Number, default: 0 },
    posts: { type: Number, default: 0 },
    followers: { type: Number, default: 0 },
    following: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Content", contentSchema);
