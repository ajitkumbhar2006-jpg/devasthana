import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const eventsPath = path.join(__dirname, "../data/events.json");

export function getEvents(_req, res) {
  const events = JSON.parse(fs.readFileSync(eventsPath, "utf-8"));
  res.json(events);
}
