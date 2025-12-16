import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    region: { type: String, required: true, lowercase: true },
    category: { type: String, required: true, lowercase: true },
    title: { type: String},
    special_dish : {type:String},
    description: { type: String },
    reel_url: { type: String },
    ytvideo_link:{type:String},
    instagram_url: { type: String },
    youtube_url: { type: String },
    facebook_url: { type: String },
    segment:{type:String},
    distance: { type: String },
    location: { type: String },
    price:{type:String},
    rating: { type: Number},
    phone: { type: Number},
    whatsapp: { type: Number},
    email: { type: String },            
    mainImage: { type: String },             
    gallery: { type: [String], default: [] }, 
    distance: { type: String },
    rating: { type: Number },
    posts: { type: String},
    followers: { type: String},
    following: { type: String },
    day: { type: String},
    month: { type: String,  },
    date: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Content", contentSchema);
