import { Link } from "react-router-dom";

function ActivityCard({ activity }) {
  return (
    <article className="card-surface overflow-hidden">
      <img
        src={activity.image}
        alt={activity.title}
        className="h-56 w-full object-cover"
        loading="lazy"
      />
      <div className="p-6">
        <h3 className="font-heading text-2xl text-ink">{activity.title}</h3>
        <p className="mt-4 text-stone-700">{activity.excerpt}</p>
        <Link
          to={`/activities/${activity.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink transition hover:text-saffron"
        >
          Explore seva
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

export default ActivityCard;
