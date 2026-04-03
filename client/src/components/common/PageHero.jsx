function PageHero({ title, description, image }) {
  return (
    <section className="relative isolate overflow-hidden bg-hero-glow py-24 text-white">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/95 to-ink/70" />
      <div className="section-shell">
        <div className="max-w-3xl animate-fadeUp">
          <p className="text-sm uppercase tracking-[0.32em] text-gold">
            Shree Krishna Devasthana
          </p>
          <h1 className="mt-5 font-heading text-4xl sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-6 text-lg leading-8 text-white/85">{description}</p>
        </div>
      </div>
    </section>
  );
}

export default PageHero;
