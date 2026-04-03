import { useState } from "react";
import PageHero from "../components/common/PageHero";
import Seo from "../components/common/Seo";
import { contactInfo } from "../data/siteContent";
import { postApi } from "../lib/api";

const initialForm = {
  name: "",
  email: "",
  message: ""
};

function ContactPage() {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState("idle");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("submitting");

    try {
      await postApi("/contact", formData);
      setStatus("success");
      setFormData(initialForm);
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <>
      <Seo
        title="Contact | Shree Krishna Devasthana"
        description="Contact Shree Krishna Devasthana for darshan, seva, donations, and temple visits."
      />
      <PageHero
        title="Contact the Temple"
        description="Reach out for darshan inquiries, seva participation, event information, and temple visits."
        image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
      />
      <section className="section-shell py-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <div className="card-surface p-8">
              <h2 className="font-heading text-3xl text-ink">Temple Address</h2>
              <p className="mt-4 text-stone-700">{contactInfo.address}</p>
              <p className="mt-3 text-stone-700">{contactInfo.phone}</p>
              <p className="mt-3 text-stone-700">{contactInfo.email}</p>
            </div>
            <div className="overflow-hidden rounded-[2rem] shadow-aura">
              <iframe
                title="Temple location map"
                src={contactInfo.mapEmbed}
                className="h-[22rem] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="card-surface p-8 sm:p-10">
            <h2 className="font-heading text-4xl text-ink">Send a Message</h2>
            <div className="mt-8 space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-stone-700">Name</span>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-sandal bg-white px-4 py-3 outline-none transition focus:border-saffron"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-stone-700">Email</span>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-sandal bg-white px-4 py-3 outline-none transition focus:border-saffron"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-stone-700">Message</span>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-sandal bg-white px-4 py-3 outline-none transition focus:border-saffron"
                />
              </label>
            </div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-8 rounded-full bg-saffron px-6 py-3 text-sm font-semibold text-white transition hover:bg-ink disabled:opacity-60"
            >
              {status === "submitting" ? "Sending..." : "Submit Inquiry"}
            </button>
            {status === "success" && (
              <p className="mt-5 rounded-2xl bg-ivory px-4 py-3 text-sm text-stone-700">
                Your message has been sent to the temple office.
              </p>
            )}
            {status === "error" && (
              <p className="mt-5 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
                The contact API is unavailable right now. Please try again later.
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

export default ContactPage;
