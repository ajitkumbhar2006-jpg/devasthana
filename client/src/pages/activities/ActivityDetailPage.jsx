import { Link, useParams } from "react-router-dom";
import PageHero from "../../components/common/PageHero";
import Seo from "../../components/common/Seo";
import { activities } from "../../data/siteContent";
import NotFoundPage from "../NotFoundPage";

function ActivityDetailPage() {
  const { slug } = useParams();
  const activity = activities.find((item) => item.slug === slug);

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
        <div className="mx-auto max-w-4xl card-surface p-8 sm:p-10">
          <p className="text-lg leading-8 text-stone-700">{activity.details}</p>
          <Link
            to="/activities"
            className="mt-8 inline-flex rounded-full bg-saffron px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink"
          >
            Back to activities
          </Link>
        </div>
      </section>
    </>
  );
}

export default ActivityDetailPage;
