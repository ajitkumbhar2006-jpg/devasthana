import { useRef, useState } from "react";
import { postApi, uploadApi } from "../lib/api";

function UploadEvent({ onCreated }) {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !description.trim() || !file) {
      setError("Please add a title, description, and image.");
      setSuccess("");
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("image", file);
      const uploadData = await uploadApi("/upload", formData);
      const createdEvent = await postApi("/events", {
        title: title.trim(),
        description: description.trim(),
        image_url: uploadData.url
      });

      setTitle("");
      setDescription("");
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setSuccess("Event created successfully.");
      onCreated?.(createdEvent);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="card-surface mb-10 grid gap-4 p-6 sm:p-8" onSubmit={handleSubmit}>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">Create Event</p>
        <h2 className="mt-2 font-heading text-3xl text-ink">Upload to Cloudinary and publish to Supabase</h2>
        <p className="soft-copy mt-3 text-sm sm:text-base">
          Add a title, short description, and image. We will upload the media first, then save the event record.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          className="input-surface"
          placeholder="Event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="input-surface"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>

      <textarea
        className="input-surface min-h-32 resize-y"
        placeholder="Event description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
      {success ? <p className="text-sm text-emerald-300">{success}</p> : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="soft-copy text-sm break-all">{file ? `Selected: ${file.name}` : "No image selected yet."}</p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex justify-center rounded-full bg-gradient-to-r from-saffron to-gold px-6 py-3 text-sm font-semibold text-cosmic transition hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Uploading..." : "Upload Event"}
        </button>
      </div>
    </form>
  );
}

export default UploadEvent;
