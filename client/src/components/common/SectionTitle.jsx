function SectionTitle({ eyebrow, title, description, center = false }) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="font-semibold uppercase tracking-[0.28em] text-saffron">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-heading text-3xl text-ink sm:text-4xl">{title}</h2>
      <div className={`mt-5 ${center ? "mx-auto" : ""} gold-divider`} />
      <p className="mt-6 text-base leading-7 text-stone-700 sm:text-lg">
        {description}
      </p>
    </div>
  );
}

export default SectionTitle;
