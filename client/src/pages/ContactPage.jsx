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
        description="Reach out for darshan inquiries, seva participation, donations, and temple visits."
        image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
      />
      <section className="section-shell py-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <div className="card-surface p-8">
              <h2 className="font-heading text-3xl text-ink">Temple Address</h2>
              <p className="soft-copy mt-4">{contactInfo.address}</p>
              <p className="soft-copy mt-3">Shriniwas Annam: {contactInfo.phone}</p>
              <p className="soft-copy mt-3">{contactInfo.email}</p>
              <a
                href={contactInfo.mapLink}
                target="_blank"
                rel="noreferrer"
                className="glass-pill mt-5 inline-flex px-5 py-3 text-sm font-semibold transition hover:border-gold hover:text-gold"
              >
                Open in Google Maps
              </a>
            </div>
            <div className="card-surface p-8">
              <h2 className="font-heading text-3xl text-ink">Contact Info</h2>
              <div className="mt-5 space-y-4">
                {contactInfo.contacts.map((contact) => (
                  <div
                    key={contact.phone}
                    className="rounded-2xl border border-white/8 bg-white/[0.05] px-5 py-4"
                  >
                    <p className="font-semibold text-ink">{contact.name}</p>
                    <p className="mt-1 text-sm text-white/72">{contact.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="card-surface p-8 sm:p-10">
            <h2 className="font-heading text-4xl text-ink">Send a Message</h2>
            <div className="mt-8 space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/87">Name</span>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-surface"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/87">Email</span>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-surface"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/87">Message</span>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="input-surface"
                />
              </label>
            </div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-8 rounded-full bg-gradient-to-r from-saffron to-gold px-6 py-3 text-sm font-semibold text-cosmic transition hover:shadow-glow disabled:opacity-60"
            >
              {status === "submitting" ? "Sending..." : "Submit Inquiry"}
            </button>
            {status === "success" && (
              <p className="mt-5 rounded-2xl border border-emerald-400/10 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
                Your message has been sent to the temple office.
              </p>
            )}
            {status === "error" && (
              <p className="mt-5 rounded-2xl border border-rose-400/10 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
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
