import { useEffect, useState } from "react";
import EventCard from "../components/common/EventCard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import PageHero from "../components/common/PageHero";
import Seo from "../components/common/Seo";
import eventsSeed from "../data/events.json";
import { filterContentBySection } from "../lib/content";
import { fetchApi } from "../lib/api";

function EventsPage() {
  const [events, setEvents] = useState(eventsSeed);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadEvents() {
      try {
        const data = await fetchApi("/content/events");
        if (isMounted) {
          setEvents(data);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadEvents();

    return () => {
      isMounted = false;
    };
  }, []);

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
        {error ? (
          <div className="card-surface mb-8 p-5 text-sm text-rose-300">
            We could not refresh the latest events from the server, so showing the best available data.
          </div>
        ) : null}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filterContentBySection(events, "events").map((event) => (
              <EventCard key={event.id || event.slug} event={event} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default EventsPage;
