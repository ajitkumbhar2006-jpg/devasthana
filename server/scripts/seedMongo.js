import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { connectDatabase } from "../config/db.js";
import Event from "../models/Event.js";
import Blog from "../models/Blog.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function readJson(relativePath) {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, relativePath), "utf-8")
  );
}

async function seed() {
  await connectDatabase(process.env.MONGODB_URI);

  const [events, blogs] = await Promise.all([
    readJson("../data/events.json"),
    readJson("../data/blogs.json")
  ]);

  await Promise.all([
    Event.deleteMany({}),
    Blog.deleteMany({})
  ]);

  await Promise.all([
    Event.insertMany(events),
    Blog.insertMany(blogs)
  ]);

  console.log("MongoDB seeded with blog and event data.");
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Seed failed:", error.message);
    process.exit(1);
  });
