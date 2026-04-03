import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-hero-glow text-white">
      <img
        src="https://images.unsplash.com/photo-1524492449090-1abe1e3f2f49?auto=format&fit=crop&w=1600&q=80"
        alt="Temple"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/95 via-ink/85 to-ink/70" />
      <div className="section-shell grid gap-12 py-24 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:py-32">
        <div className="animate-fadeUp">
          <p className="text-sm uppercase tracking-[0.34em] text-gold">
            Hare Krishna Hare Rama
          </p>
          <h1 className="mt-6 max-w-3xl font-heading text-5xl leading-tight sm:text-6xl">
            A serene temple website for darshan, devotion, and divine community.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82">
            Shree Krishna Devasthana welcomes devotees and visitors into a peaceful
            spiritual space filled with prayer, seva, culture, and timeless Krishna
            consciousness.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/events"
              className="rounded-full bg-saffron px-6 py-3 text-sm font-semibold text-white transition hover:bg-gold hover:text-ink"
            >
              Explore Events
            </Link>
            <Link
              to="/donations"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-gold hover:bg-white/10"
            >
              Support the Temple
            </Link>
          </div>
        </div>
        <div className="card-surface animate-float overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-4 backdrop-blur-md">
          <img
            src="https://images.unsplash.com/photo-1609921141835-710b7fa6e438?auto=format&fit=crop&w=1400&q=80"
            alt="Shree Krishna deity"
            className="h-[24rem] w-full rounded-[1.5rem] object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
