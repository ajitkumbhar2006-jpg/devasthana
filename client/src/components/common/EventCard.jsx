import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <article className="card-surface overflow-hidden">
      <img
        src={event.image_url}
        alt={event.title}
        className="h-56 w-full object-cover"
        loading="lazy"
      />
      <div className="p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">
          {event.date}
        </p>
        <h3 className="mt-3 font-heading text-2xl text-ink">{event.title}</h3>
        <p className="soft-copy mt-4">{event.description}</p>
        <Link
          to={`/events/${event.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink transition hover:text-gold"
        >
          View details
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

export default EventCard;
