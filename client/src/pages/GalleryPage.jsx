import { useMemo, useState } from "react";
import PageHero from "../components/common/PageHero";
import Seo from "../components/common/Seo";
import { galleryCategories, galleryItems } from "../data/siteContent";

function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") {
      return galleryItems;
    }

    return galleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <Seo
        title="Gallery | Shree Krishna Devasthana"
        description="View the temple gallery featuring festivals, sanctum, and community events."
      />
      <PageHero
        title="Temple Gallery"
        description="A visual glimpse into festivals, sacred spaces, and devotional community moments."
        image="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=80"
      />
      <section className="section-shell py-20">
        <div className="flex flex-wrap gap-3">
          {galleryCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                activeCategory === category
                  ? "bg-saffron text-white"
                  : "bg-white text-ink shadow-sm hover:bg-sandal"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedImage(item)}
              className="group overflow-hidden rounded-[1.8rem] text-left shadow-aura"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="bg-white px-5 py-4">
                <p className="text-sm uppercase tracking-[0.24em] text-saffron">{item.category}</p>
                <h3 className="mt-2 font-heading text-2xl text-ink">{item.title}</h3>
              </div>
            </button>
          ))}
        </div>

        {selectedImage && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/80 p-4">
            <div className="relative max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-aura">
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute right-4 top-4 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-ink"
              >
                Close
              </button>
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-h-[80vh] w-full object-cover"
              />
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default GalleryPage;
