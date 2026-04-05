import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import getSupabaseClient from "../config/supabase.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const eventsPath = path.join(__dirname, "../data/events.json");

function readEventsFromFile() {
  return JSON.parse(fs.readFileSync(eventsPath, "utf-8"));
}

function slugify(value = "") {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatDate(dateValue) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(new Date(dateValue));
}

function normalizeEventRecord(event) {
  const title = event.title || "Temple Event";
  const image = event.image || event.image_url || "/assets/vishnu.png";
  const slug = event.slug || slugify(title);
  const createdAt = event.created_at || new Date().toISOString();

  return {
    ...event,
    title,
    slug,
    image,
    image_url: event.image_url || image,
    date: event.date || formatDate(createdAt),
    description:
      event.description ||
      "Join us for a temple gathering filled with devotion and community.",
    // ✅ Keep content ONLY for frontend usage
    content:
      event.description ||
      "Event details will be shared soon."
  };
}

export async function getEvents(_req, res) {
  try {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return res.json(data.map(normalizeEventRecord));
  } catch (error) {
    console.warn("Supabase failed → fallback to JSON:", error.message);
  }

  try {
    const localEvents = readEventsFromFile();
    return res.json(localEvents.map(normalizeEventRecord));
  } catch (fallbackError) {
    return res.status(500).json({
      error: "Failed to load events",
      details: fallbackError.message
    });
  }
}

export async function createEvent(req, res) {
  console.log("BODY:", req.body);

  const { title, description, image_url } = req.body;

  if (!title || !image_url) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const supabase = getSupabaseClient();
    const { data: columns, error: schemaError } = await supabase
      .from("events")
      .select("*")
      .limit(1);

    if (schemaError) {
      console.log("SCHEMA ERROR:", schemaError);
      return res.status(500).json(schemaError);
    }

    const validColumns = columns?.[0]
      ? Object.keys(columns[0])
      : ["title", "description", "image_url", "created_at"];

    console.log("VALID COLUMNS:", validColumns);

    const fullPayload = {
      title,
      description: description || "",
      image_url,
      created_at: new Date().toISOString(),
      slug: title.toLowerCase().replace(/\s+/g, "-"),
      image: image_url,
      date: new Date().toISOString(),
      content: description || ""
    };

    const safePayload = {};

    for (const key in fullPayload) {
      if (validColumns.includes(key)) {
        safePayload[key] = fullPayload[key];
      }
    }

    console.log("SAFE PAYLOAD:", safePayload);

    const { data, error } = await supabase
      .from("events")
      .insert([safePayload])
      .select("*")
      .single();

    if (error) {
      console.log("SUPABASE ERROR:", error);
      return res.status(500).json(error);
    }

    return res.status(201).json(normalizeEventRecord(data));
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function deleteEvent(req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Event id is required." });
  }

  try {
    const supabase = getSupabaseClient();

    const { error } = await supabase
      .from("events")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(500).json(error);
    }

    return res.json({ message: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
