import { Link } from "react-router-dom";

function ActivityCard({ activity }) {
  return (
    <article className="card-surface overflow-hidden">
      <img
        src={activity.image_url}
        alt={activity.title}
        className="h-56 w-full object-cover"
        loading="lazy"
      />
      <div className="p-6">
        <h3 className="font-heading text-2xl text-ink">{activity.title}</h3>
        <p className="soft-copy mt-4">{activity.description}</p>
        <Link
          to={`/activities/${activity.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink transition hover:text-gold"
        >
          Explore seva
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

export default ActivityCard;
