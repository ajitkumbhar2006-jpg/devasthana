import EventCard from "../components/common/EventCard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import PageHero from "../components/common/PageHero";
import Seo from "../components/common/Seo";
import eventsSeed from "../data/events.json";
import { useFetch } from "../hooks/useFetch";
import { fetchApi } from "../lib/api";

function EventsPage() {
  const { data: events, loading } = useFetch(() => fetchApi("/events"), eventsSeed);

  return (
    <>
      <Seo
        title="Events | Shree Krishna Devasthana"
        description="Browse upcoming and past spiritual events at Shree Krishna Devasthana."
      />
      <PageHero
        title="Temple Events"
        description="Discover festival celebrations, satsangs, community gatherings, and devotional programs."
        image="https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&w=1600&q=80"
      />
      <section className="section-shell py-20">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default EventsPage;
