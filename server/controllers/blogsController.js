import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import getSupabaseClient from "../config/supabase.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const blogsPath = path.join(__dirname, "../data/blogs.json");

function readBlogsFromFile() {
  return JSON.parse(fs.readFileSync(blogsPath, "utf-8"));
}

export async function getBlogs(_req, res) {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from("blogs").select("*");

    if (error) {
      throw error;
    }

    return res.json(data);
  } catch (error) {
    console.warn(`Supabase blogs lookup failed, using local blogs JSON: ${error.message}`);
  }

  try {
    const localBlogs = readBlogsFromFile();
    return res.json(localBlogs);
  } catch (fallbackError) {
    console.error("Unable to load blogs from local JSON:", fallbackError.message);
    return res.status(500).json({ error: "Unable to load blogs", detail: fallbackError.message });
  }
}

export async function createBlog(req, res) {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from("blogs").insert([req.body]).select("*");

    if (error) {
      return res.status(500).json(error);
    }

    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
