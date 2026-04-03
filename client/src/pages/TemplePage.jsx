import PageHero from "../components/common/PageHero";
import Seo from "../components/common/Seo";
import { timingData } from "../data/siteContent";

const aartiSchedule = [
  { period: "Morning", detail: "Mangala Aarti at 5:00 AM and Shringar Darshan at 7:15 AM" },
  { period: "Afternoon", detail: "Raj Bhog Aarti at 12:30 PM followed by maha prasadam" },
  { period: "Evening", detail: "Sandhya Aarti at 6:45 PM with bhajan and kirtan" }
];

const guidelines = [
  "Please dress modestly and respectfully while entering the temple premises.",
  "Remove footwear before entering darshan and prayer areas.",
  "Maintain silence near the sanctum and during aarti.",
  "Photography may be restricted during worship or festival rituals."
];

function TemplePage() {
  return (
    <>
      <Seo
        title="Temple & Deities | Shree Krishna Devasthana"
        description="View deity details, darshan timings, aarti schedule, and visitor guidelines for Shree Krishna Devasthana."
      />
      <PageHero
        title="Temple & Deities"
        description="Experience the beauty of Shree Krishna darshan, temple worship, and a daily rhythm of sacred devotion."
        image="https://images.unsplash.com/photo-1535535112387-56ffe8db21ff?auto=format&fit=crop&w=1600&q=80"
      />
      <section className="section-shell py-20">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="card-surface p-8 sm:p-10">
            <p className="text-sm uppercase tracking-[0.3em] text-saffron">Shree Krishna Deity</p>
            <h2 className="mt-4 font-heading text-4xl text-ink">
              The temple sanctum radiates grace, beauty, and loving presence.
            </h2>
            <p className="mt-6 leading-8 text-stone-700">
              The presiding deity of Shree Krishna Devasthana is worshipped with
              elaborate alankara, bhog offerings, incense, and lamp ceremonies.
              The darshan experience is designed to be uplifting, peaceful, and
              deeply devotional for every visitor.
            </p>
            <img
              src="https://images.unsplash.com/photo-1527236438218-d82077ae1f85?auto=format&fit=crop&w=1400&q=80"
              alt="Temple deity"
              className="mt-8 h-80 w-full rounded-[1.6rem] object-cover"
            />
          </div>

          <div className="space-y-8">
            <div className="card-surface p-8">
              <h3 className="font-heading text-2xl text-ink">Darshan Timings</h3>
              <div className="mt-6 space-y-4">
                {timingData.map((item) => (
                  <div key={item.label} className="flex justify-between rounded-2xl bg-ivory px-4 py-3">
                    <span>{item.label}</span>
                    <span className="font-semibold text-saffron">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-surface p-8">
              <h3 className="font-heading text-2xl text-ink">Aarti Schedule</h3>
              <div className="mt-6 space-y-5">
                {aartiSchedule.map((item) => (
                  <div key={item.period}>
                    <p className="font-semibold text-saffron">{item.period}</p>
                    <p className="mt-1 text-stone-700">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-surface p-8">
              <h3 className="font-heading text-2xl text-ink">Visitor Guidelines</h3>
              <ul className="mt-6 space-y-4 text-stone-700">
                {guidelines.map((item) => (
                  <li key={item} className="rounded-2xl bg-ivory px-4 py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TemplePage;
