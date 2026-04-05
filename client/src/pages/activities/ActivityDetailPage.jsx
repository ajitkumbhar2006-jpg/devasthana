import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import PageHero from "../../components/common/PageHero";
import Seo from "../../components/common/Seo";
import { activities } from "../../data/siteContent";
import { filterContentBySection } from "../../lib/content";
import { useFetch } from "../../hooks/useFetch";
import { fetchApi } from "../../lib/api";
import NotFoundPage from "../NotFoundPage";

function ActivityDetailPage() {
  const { slug } = useParams();
  const { data, loading } = useFetch(() => fetchApi("/content/activities"), activities);
  const activity = filterContentBySection(data, "activities").find((item) => item.slug === slug);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!activity) {
    return <NotFoundPage />;
  }

  return (
    <>
      <Seo
        title={`${activity.title} | Shree Krishna Devasthana`}
        description={activity.excerpt}
      />
      <PageHero title={activity.title} description={activity.excerpt} image={activity.image} />
      <section className="section-shell py-20">
        <div className="card-surface mx-auto max-w-4xl p-8 sm:p-10">
          <p className="soft-copy text-lg leading-8">{activity.details || activity.content || activity.description}</p>
          <Link
            to="/activities"
            className="mt-8 inline-flex rounded-full bg-gradient-to-r from-saffron to-gold px-5 py-3 text-sm font-semibold text-cosmic transition hover:shadow-glow"
          >
            Back to activities
          </Link>
        </div>
      </section>
    </>
  );
}

export default ActivityDetailPage;
