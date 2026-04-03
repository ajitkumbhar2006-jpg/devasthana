import ActivityCard from "../components/common/ActivityCard";
import PageHero from "../components/common/PageHero";
import Seo from "../components/common/Seo";
import { activities } from "../data/siteContent";

function ActivitiesPage() {
  return (
    <>
      <Seo
        title="Activities | Shree Krishna Devasthana"
        description="Explore temple activities including daily puja, bhajan, spiritual classes, and annadan seva."
      />
      <PageHero
        title="Temple Activities"
        description="Take part in worship, spiritual learning, devotional music, and community-centered service."
        image="https://images.unsplash.com/photo-1463592177119-bab2a00f3ccb?auto=format&fit=crop&w=1600&q=80"
      />
      <section className="section-shell py-20">
        <div className="grid gap-8 md:grid-cols-2">
          {activities.map((activity) => (
            <ActivityCard key={activity.slug} activity={activity} />
          ))}
        </div>
      </section>
    </>
  );
}

export default ActivitiesPage;
