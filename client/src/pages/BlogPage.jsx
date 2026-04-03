import BlogCard from "../components/common/BlogCard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import PageHero from "../components/common/PageHero";
import Seo from "../components/common/Seo";
import blogsSeed from "../data/blogs.json";
import { useFetch } from "../hooks/useFetch";
import { fetchApi } from "../lib/api";

function BlogPage() {
  const { data: blogs, loading } = useFetch(() => fetchApi("/blogs"), blogsSeed);

  return (
    <>
      <Seo
        title="Blog | Shree Krishna Devasthana"
        description="Read articles on devotion, temple life, Krishna consciousness, and spiritual practice."
      />
      <PageHero
        title="Temple Blog"
        description="Insights on devotion, scriptures, culture, festivals, and practical spiritual living."
        image="https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1600&q=80"
      />
      <section className="section-shell py-20">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard key={blog.slug} blog={blog} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default BlogPage;
