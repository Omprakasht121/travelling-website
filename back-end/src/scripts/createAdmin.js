// src/scripts/createAdmin.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import AdminUser from "../models/AdminUser.js";
import bcrypt from "bcrypt";
dotenv.config();

const MONGO = process.env.MONGO_URI;

async function run() {
  await mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
  const username = process.argv[2];
  const password = process.argv[3];
  if (!username || !password) return console.log("usage: node createAdmin.js username password");
  const hash = await bcrypt.hash(password, 10);
  await AdminUser.create({ username, passwordHash: hash });
  console.log("Admin created");
  process.exit(0);
}

run().catch((e) => { console.error(e); process.exit(1); });
