import { Link } from "react-router-dom";
import SectionTitle from "../components/common/SectionTitle";
import Seo from "../components/common/Seo";
import HeroSection from "../components/home/HeroSection";
import { featuredGallery, introStats, timingData } from "../data/siteContent";

function HomePage() {
  return (
    <>
      <Seo
        title="Shree Krishna Devasthana | Home"
        description="Visit Shree Krishna Devasthana for darshan, aarti, annadan, and devotional community life."
      />
      <HeroSection />

      <section className="section-shell py-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="card-surface p-8 sm:p-10">
            <SectionTitle
              eyebrow="Temple Overview"
              title="A sacred space rooted in devotion, seva, and spiritual learning."
              description="Inspired by timeless temple traditions, Shree Krishna Devasthana offers daily darshan, vibrant festivals, scriptural classes, and community-centered spiritual activities."
            />
          </div>
          <div className="grid gap-5">
            {introStats.map((stat) => (
              <div key={stat.label} className="card-surface p-6 text-center">
                <p className="font-heading text-4xl text-gold">{stat.value}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.24em] text-white/50">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="card-surface p-8 sm:p-10">
            <SectionTitle
              eyebrow="Daily Darshan"
              title="Temple timings for prayer, darshan, and aarti."
              description="Plan your visit with the current daily temple schedule. Major festival timings can vary and are announced in advance."
            />
            <div className="mt-8 space-y-4">
              {timingData.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.04] px-5 py-4"
                >
                  <span className="font-medium text-white/72">{item.label}</span>
                  <span className="font-semibold text-saffron">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {featuredGallery.map((item) => (
              <div key={item.title} className="overflow-hidden rounded-[1.8rem] shadow-aura">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-72 w-full object-cover transition duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="section-shell">
          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(244,163,56,0.2),rgba(245,208,111,0.08),rgba(76,124,255,0.16))] px-8 py-12 text-center text-white shadow-aura sm:px-12">
            <p className="text-sm uppercase tracking-[0.32em] text-white/80">
              Offer Seva
            </p>
            <h2 className="mt-4 font-heading text-3xl sm:text-4xl">
              Support annadan, temple care, and community service.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/82">
              Your donation helps sustain worship, prasadam, education, and
              compassionate outreach in the temple community.
            </p>
            <Link
              to="/donations"
              className="glass-pill mt-8 inline-flex px-6 py-3 text-sm font-semibold transition hover:border-gold hover:text-gold"
            >
              Make a Donation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
