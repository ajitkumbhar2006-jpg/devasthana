import { useEffect, useMemo, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import PageHero from "../components/common/PageHero";
import Seo from "../components/common/Seo";
import { deleteApi, fetchApi, getAuthToken, postApi, uploadApi } from "../lib/api";

function AdminPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const token = getAuthToken();

  const eventCountLabel = useMemo(() => `${events.length} event${events.length === 1 ? "" : "s"}`, [events.length]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data = await fetchApi("/events");
        if (mounted) {
          setEvents(data);
        }
      } catch (loadError) {
        if (mounted) {
          setError(loadError.message || "Unable to load events.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  async function handleUpload(event) {
    event.preventDefault();

    if (!title.trim() || !description.trim() || !file) {
      setError("Please add a title, description, and image before publishing.");
      setSuccess("");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const uploadData = await uploadApi("/upload", formData, { token });
      console.log("UPLOAD RESPONSE:", uploadData);

      if (!uploadData.url) {
        throw new Error("Image upload failed");
      }

      const createdEvent = await postApi("/events", {
        title: title.trim(),
        description: description.trim(),
        image_url: uploadData.url
      }, { token });
      console.log("EVENT RESPONSE:", createdEvent);

      setEvents((current) => [createdEvent, ...current.filter((item) => item.id !== createdEvent.id)]);
      setTitle("");
      setDescription("");
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setSuccess("Event published successfully.");
    } catch (submitError) {
      console.error("ERROR:", submitError);

      if (submitError.message === "No token" || submitError.message === "Invalid token") {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
        return;
      }

      setError(submitError.message || "Unable to publish event.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    setDeletingId(id);
    setError("");
    setSuccess("");

    try {
      await deleteApi(`/events/${id}`, { token });
      setEvents((current) => current.filter((event) => event.id !== id));
      setSuccess("Event deleted successfully.");
    } catch (deleteError) {
      if (deleteError.message === "No token" || deleteError.message === "Invalid token") {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
        return;
      }

      setError(deleteError.message || "Unable to delete the event.");
    } finally {
      setDeletingId("");
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  }

  return (
    <>
      <Seo
        title="Admin Dashboard | Shree Krishna Devasthana"
        description="Manage temple events, upload event imagery, and remove outdated records from one place."
      />
      <PageHero
        title="Admin Dashboard"
        description="Create, review, and remove event listings with a direct Cloudinary to Supabase workflow."
        image="https://images.unsplash.com/photo-1519817650390-64a93db511aa?auto=format&fit=crop&w=1600&q=80"
      />
      <section className="section-shell py-20">
        <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          <form className="card-surface grid gap-5 p-6 sm:p-8" onSubmit={handleUpload}>
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">Publish Event</p>
              <h2 className="font-heading text-3xl text-ink sm:text-4xl">Upload to Cloudinary, save to Supabase</h2>
              <p className="soft-copy text-sm sm:text-base">
                Add the title, devotional description, and featured image. The dashboard will upload the image first
                and then create the event record.
              </p>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-white/87">Title</span>
              <input
                className="input-surface"
                placeholder="Janmashtami Maha Utsav"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-white/87">Description</span>
              <textarea
                className="input-surface min-h-36 resize-y"
                placeholder="Share the purpose, schedule, and experience devotees can expect."
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-white/87">Featured Image</span>
              <input
                ref={fileInputRef}
                className="input-surface file:mr-4 file:rounded-full file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-sm file:font-medium file:text-ink"
                type="file"
                accept="image/*"
                onChange={(event) => setFile(event.target.files?.[0] || null)}
              />
            </label>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75">
              {file ? `Selected image: ${file.name}` : "No image selected yet."}
            </div>

            {error ? (
              <p className="rounded-2xl border border-rose-400/10 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
                {error}
              </p>
            ) : null}

            {success ? (
              <p className="rounded-2xl border border-emerald-400/10 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
                {success}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={saving}
              className="inline-flex justify-center rounded-full bg-gradient-to-r from-saffron to-gold px-6 py-3 text-sm font-semibold text-cosmic transition hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Publishing..." : "Add Event"}
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-ink transition hover:bg-white/10"
            >
              Logout
            </button>
          </form>

          <div className="card-surface p-6 sm:p-8">
            <div className="flex flex-col gap-2 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">All Events</p>
                <h2 className="mt-2 font-heading text-3xl text-ink">Manage published listings</h2>
              </div>
              <p className="soft-copy text-sm">{loading ? "Loading events..." : eventCountLabel}</p>
            </div>

            {loading ? (
              <div className="py-10 text-center text-sm text-white/65">Loading events from the temple database...</div>
            ) : events.length === 0 ? (
              <div className="py-10 text-center text-sm text-white/65">No events found yet. Publish one to get started.</div>
            ) : (
              <div className="mt-6 grid gap-5">
                {events.map((event) => (
                  <article
                    key={event.id || event.slug}
                    className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-aura"
                  >
                    <div className="grid gap-0 md:grid-cols-[220px_1fr]">
                      <img
                        src={event.image_url || event.image}
                        alt={event.title}
                        className="h-48 w-full object-cover md:h-full"
                        loading="lazy"
                      />
                      <div className="flex flex-col gap-4 p-5">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                            {event.date || "Temple Event"}
                          </p>
                          <h3 className="mt-2 font-heading text-2xl text-ink">{event.title}</h3>
                          <p className="soft-copy mt-3 text-sm leading-6">{event.description}</p>
                        </div>
                        <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <p className="text-xs text-white/45">ID: {event.id || event.slug || "pending"}</p>
                          <button
                            type="button"
                            onClick={() => handleDelete(event.id)}
                            disabled={!event.id || deletingId === event.id}
                            className="inline-flex justify-center rounded-full border border-rose-300/20 bg-rose-300/10 px-5 py-2.5 text-sm font-semibold text-rose-100 transition hover:bg-rose-300/20 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {deletingId === event.id ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default AdminPage;
