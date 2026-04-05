import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-hero-glow text-white">
      <img
        src="https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?auto=format&fit=crop&w=1800&q=80"
        alt="Temple"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-[0.18]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cosmic/95 via-midnight/85 to-ocean/80" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(244,163,56,0.16),transparent_18%),radial-gradient(circle_at_80%_10%,rgba(92,138,255,0.18),transparent_24%)]" />
      <div className="section-shell grid gap-12 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-32">
        <div className="animate-fadeUp">
          <p className="text-sm uppercase tracking-[0.4em] text-gold">
            Cosmic Darshan Experience
          </p>
          <h1 className="mt-6 max-w-3xl font-heading text-5xl leading-tight sm:text-6xl">
            A divine digital temple shaped around stillness, light, and Krishna consciousness.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
            The site now opens with a cinematic celestial intro, then settles into a
            dark glass-driven experience for darshan, seva, events, and spiritual
            storytelling.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/events"
              className="rounded-full bg-gradient-to-r from-saffron to-gold px-6 py-3 text-sm font-semibold text-cosmic transition hover:shadow-glow"
            >
              Explore Events
            </Link>
            <Link
              to="/donations"
              className="glass-pill px-6 py-3 text-sm font-semibold text-white transition hover:border-gold hover:bg-white/10"
            >
              Support the Temple
            </Link>
          </div>
        </div>
        <div className="card-surface animate-float relative overflow-hidden rounded-[2rem] p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,208,111,0.16),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.01))]" />
          <div className="relative flex h-[24rem] flex-col justify-between rounded-[1.5rem] border border-white/10 bg-gradient-to-b from-[#09142a] via-[#0b1d39] to-[#07111f] p-6">
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-white/50">
                Website Intro
              </p>
              <p className="mt-3 max-w-xs font-heading text-3xl text-ink">
                Galaxy to Kshira Sagar transition with luminous devotional framing.
              </p>
            </div>
            <div className="relative h-40 overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#050c18]">
              <div className="absolute inset-x-[18%] top-4 h-20 rounded-full bg-[radial-gradient(circle,rgba(255,248,212,0.95),rgba(245,208,111,0.5)_20%,rgba(57,113,217,0.34)_42%,transparent_68%)] blur-[2px]" />
              <div className="absolute inset-x-10 bottom-0 h-24 rounded-t-[100%] bg-gradient-to-b from-[#12305a]/20 via-[#0d2550] to-[#050b14]" />
              <div className="absolute left-[26%] bottom-10 h-5 w-40 -rotate-6 rounded-full bg-gradient-to-r from-[#4a8cff] to-[#356fd8]" />
              <div className="absolute left-[57%] bottom-16 h-8 w-8 rounded-full bg-gradient-to-br from-[#85b7ff] to-[#3c74d7]" />
              <div className="absolute left-[57.4%] bottom-[5.5rem] h-5 w-5 -translate-x-1/2 rounded-full bg-gradient-to-b from-[#ffeab7] to-[#f1b55c]" />
              {[38, 46, 54, 62, 70].map((left) => (
                <div
                  key={left}
                  className="absolute bottom-20 h-10 w-8 rounded-[50%_50%_38%_38%] border border-white/10 bg-gradient-to-b from-[#ffedc3]/60 via-[#5f8bff]/55 to-[#10214a]"
                  style={{ left: `${left}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
