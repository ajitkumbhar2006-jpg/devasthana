import PageHero from "../components/common/PageHero";
import SectionTitle from "../components/common/SectionTitle";
import Seo from "../components/common/Seo";

function AboutPage() {
  return (
    <>
      <Seo
        title="About | Shree Krishna Devasthana"
        description="Learn about the history, mission, and spiritual purpose of Shree Krishna Devasthana."
      />
      <PageHero
        title="About the Temple"
        description="Learn the story, spiritual mission, and devotional purpose behind Shree Krishna Devasthana."
        image="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=80"
      />
      <section className="section-shell py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="card-surface p-8 sm:p-10">
            <SectionTitle
              eyebrow="Temple History"
              title="A temple established to nurture devotion, discipline, and service."
              description="Shree Krishna Devasthana began as a humble gathering space for prayer and has grown into a temple that hosts daily worship, community celebrations, annadan, and spiritual education for all age groups."
            />
          </div>
          <div className="card-surface p-8 sm:p-10">
            <SectionTitle
              eyebrow="Mission & Vision"
              title="To create a living spiritual center grounded in Krishna bhakti."
              description="Our mission is to share the teachings of Lord Krishna through worship, culture, music, service, and scripture. Our vision is a compassionate and dharmic community where devotion shapes everyday life."
            />
          </div>
          <div className="card-surface p-8 sm:p-10">
            <SectionTitle
              eyebrow="Lord Krishna"
              title="The embodiment of divine love, wisdom, and joyful devotion."
              description="Lord Krishna teaches duty with surrender, action with awareness, and devotion with love. The temple celebrates his lilas, teachings, and universal message through worship and study."
            />
          </div>
          <div className="card-surface p-8 sm:p-10">
            <SectionTitle
              eyebrow="Organization"
              title="A volunteer-led and community-supported spiritual institution."
              description="Temple activities are guided by trustees, priests, volunteers, and donor families working together to maintain a welcoming devotional environment and sustainable community programs."
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutPage;
