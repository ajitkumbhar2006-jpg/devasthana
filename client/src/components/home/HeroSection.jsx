import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-hero-glow text-white">
      {/* Main Section Background */}
      <img
        src="https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?auto=format&fit=crop&w=1800&q=80"
        alt="Temple"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-[0.18]"
      />
      
      {/* Global Gradients */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cosmic/95 via-midnight/85 to-ocean/80" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(244,163,56,0.16),transparent_18%),radial-gradient(circle_at_80%_10%,rgba(92,138,255,0.18),transparent_24%)]" />

      <div className="section-shell grid gap-12 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-32">
        {/* Left Content */}
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

        {/* Right Content - FULL IMAGE CARD */}
        <div className="card-surface animate-float relative h-[28rem] overflow-hidden rounded-[2.5rem] p-2">
          {/* The Full Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1660280037297-a3b5e79a3d20?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Lord Krishna"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
            />
            {/* Dark Overlay to make text pop */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050c18] via-[#050c18]/40 to-transparent" />
          </div>

          {/* Card Content Overlay */}
          <div className="relative z-10 flex h-full flex-col justify-between rounded-[2.2rem] border border-white/10 p-8">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-gold/90 font-medium">
                Website Intro
              </p>
              <h3 className="mt-4 font-heading text-4xl text-white drop-shadow-lg">
                Hare Krishna 
              </h3>
            </div>

            <div className="flex items-center gap-3">
               <div className="h-[1px] flex-1 bg-white/20" />
               <p className="text-[10px] uppercase tracking-widest text-white/40">Divine Presence</p>
               <div className="h-[1px] flex-1 bg-white/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;