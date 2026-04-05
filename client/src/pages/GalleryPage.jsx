import { useMemo, useState } from "react";
import LoadingSpinner from "../components/common/LoadingSpinner";
import PageHero from "../components/common/PageHero";
import Seo from "../components/common/Seo";
import { galleryItems } from "../data/siteContent";
import { filterContentBySection } from "../lib/content";
import { useFetch } from "../hooks/useFetch";
import { fetchApi } from "../lib/api";

function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);
  const { data, loading } = useFetch(() => fetchApi("/content/gallery"), galleryItems);
  const galleryData = filterContentBySection(data, "gallery");
  const galleryCategories = useMemo(() => {
    const categories = Array.from(
      new Set(
        galleryData
          .map((item) => item.category)
          .filter(Boolean)
          .map((value) => value.charAt(0).toUpperCase() + value.slice(1))
      )
    );

    return ["All", ...categories];
  }, [galleryData]);

  const filteredItems = useMemo(() => {
    const normalizedItems = galleryData.map((item) => ({
      ...item,
      category: item.category
        ? item.category.charAt(0).toUpperCase() + item.category.slice(1)
        : "Gallery",
      image_url: item.image_url || item.image
    }));

    if (activeCategory === "All") {
      return normalizedItems;
    }

    return normalizedItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, galleryData]);

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
                  ? "bg-gradient-to-r from-saffron to-gold text-cosmic"
                  : "glass-pill hover:border-gold"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="mt-10">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => (
              <button
                key={item.id || item.slug || item.title}
                type="button"
                onClick={() => setSelectedImage(item)}
                className="group overflow-hidden rounded-[1.8rem] border border-white/10 text-left shadow-aura"
              >
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="border-t border-white/10 bg-[#06101c] px-5 py-4">
                  <p className="text-sm uppercase tracking-[0.24em] text-gold">{item.category}</p>
                  <h3 className="mt-2 font-heading text-2xl text-ink">{item.title}</h3>
                  <p className="soft-copy mt-3 text-sm">{item.description}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {selectedImage && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/80 p-4">
            <div className="relative max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#06101c] shadow-aura">
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="glass-pill absolute right-4 top-4 px-4 py-2 text-sm font-semibold"
              >
                Close
              </button>
              <img
                src={selectedImage.image_url}
                alt={selectedImage.title}
                className="max-h-[80vh] w-full object-cover"
              />
              <div className="p-5">
                <h3 className="font-heading text-2xl text-ink">{selectedImage.title}</h3>
                <p className="soft-copy mt-3">{selectedImage.description}</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default GalleryPage;
