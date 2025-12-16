// src/server.js
// import dotenv from "dotenv";
// dotenv.config(); 

import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

async function start() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server running on port :${PORT}`)
    );
  } catch (err) {
    console.error("Failed to start", err);
    process.exit(1);
  }
}

start();
