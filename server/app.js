import express from "express";
import cors from "cors";
import eventsRouter from "./routes/events.js";
import blogsRouter from "./routes/blogs.js";
import contactRouter from "./routes/contact.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173"
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "Shree Krishna Devasthana API" });
});

app.use("/api/events", eventsRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/contact", contactRouter);

export default app;
