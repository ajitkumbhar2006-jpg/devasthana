import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import PageHero from "../components/common/PageHero";
import Seo from "../components/common/Seo";
import eventsSeed from "../data/events.json";
import { useFetch } from "../hooks/useFetch";
import { fetchApi } from "../lib/api";

function EventDetailPage() {
  const { slug } = useParams();
  const { data: events, loading } = useFetch(() => fetchApi("/events"), eventsSeed);

  if (loading) {
    return <LoadingSpinner />;
  }

  const event = events.find((item) => item.slug === slug);

  if (!event) {
    return (
      <section className="section-shell py-24">
        <div className="card-surface mx-auto max-w-3xl p-10 text-center">
          <h1 className="font-heading text-4xl text-ink">Event not found</h1>
          <Link
            to="/events"
            className="mt-6 inline-flex rounded-full bg-saffron px-5 py-3 text-sm font-semibold text-white"
          >
            Back to events
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <Seo title={`${event.title} | Shree Krishna Devasthana`} description={event.description} />
      <PageHero title={event.title} description={event.description} image={event.image} />
      <section className="section-shell py-20">
        <div className="mx-auto max-w-4xl card-surface overflow-hidden">
          <img src={event.image} alt={event.title} className="h-80 w-full object-cover" />
          <div className="p-8 sm:p-10">
            <p className="text-sm uppercase tracking-[0.26em] text-saffron">{event.date}</p>
            <h2 className="mt-3 font-heading text-4xl text-ink">{event.title}</h2>
            <p className="mt-6 leading-8 text-stone-700">{event.content}</p>
            <Link
              to="/events"
              className="mt-8 inline-flex rounded-full bg-saffron px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink"
            >
              Back to events
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default EventDetailPage;
