import { useState } from "react";
import PageHero from "../components/common/PageHero";
import Seo from "../components/common/Seo";
import { donationTypes } from "../data/siteContent";

const initialForm = {
  name: "",
  amount: "",
  purpose: "Annadan"
};

function DonationsPage() {
  const [formData, setFormData] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setFormData(initialForm);
  };

  return (
    <>
      <Seo
        title="Donations | Shree Krishna Devasthana"
        description="Offer annadan, gau seva, and general donations to support the temple."
      />
      <PageHero
        title="Offer Your Donation"
        description="Support devotional service, festival celebrations, annadan, and temple care through a simple donation experience."
        image="https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1600&q=80"
      />
      <section className="section-shell py-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            {donationTypes.map((type) => (
              <div key={type.title} className="card-surface p-8">
                <h2 className="font-heading text-3xl text-ink">{type.title}</h2>
                <p className="soft-copy mt-3">{type.description}</p>
              </div>
            ))}
            <div className="card-surface p-8">
              <p className="text-sm uppercase tracking-[0.28em] text-gold">Payment Modes</p>
              <h3 className="mt-3 font-heading text-2xl text-ink">Mock Razorpay / UPI Interface</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/8 bg-white/[0.09] p-5">
                  <p className="font-semibold text-ink">Razorpay</p>
                  <p className="mt-2 text-sm text-white/87">
                    Secure card, wallet, and net banking UI placeholder.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.09] p-5">
                  <p className="font-semibold text-ink">UPI</p>
                  <p className="mt-2 text-sm text-white/87">
                    Pay via UPI ID: donate@krishnatemple
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="card-surface p-8 sm:p-10">
            <p className="text-sm uppercase tracking-[0.28em] text-gold">Donation Form</p>
            <h2 className="mt-4 font-heading text-4xl text-ink">Contribute with devotion</h2>
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
                <span className="mb-2 block text-sm font-medium text-white/87">Amount</span>
                <input
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  className="input-surface"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/87">Purpose</span>
                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  className="input-surface"
                >
                  {donationTypes.map((type) => (
                    <option key={type.title} value={type.title}>
                      {type.title}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <button
              type="submit"
              className="mt-8 rounded-full bg-gradient-to-r from-saffron to-gold px-6 py-3 text-sm font-semibold text-cosmic transition hover:shadow-glow"
            >
              Proceed to Donate
            </button>
            {submitted && (
              <p className="mt-5 rounded-2xl border border-emerald-400/10 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
                Donation intent captured successfully. Connect Razorpay or UPI in production.
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

export default DonationsPage;
