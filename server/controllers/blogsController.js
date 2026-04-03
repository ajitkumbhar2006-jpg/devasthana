import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const blogsPath = path.join(__dirname, "../data/blogs.json");

export function getBlogs(_req, res) {
  const blogs = JSON.parse(fs.readFileSync(blogsPath, "utf-8"));
  res.json(blogs);
}
