import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import PageHero from "../components/common/PageHero";
import Seo from "../components/common/Seo";
import blogsSeed from "../data/blogs.json";
import { filterContentBySection } from "../lib/content";
import { useFetch } from "../hooks/useFetch";
import { fetchApi } from "../lib/api";

function BlogDetailPage() {
  const { slug } = useParams();
  const { data: blogs, loading } = useFetch(() => fetchApi("/content/blogs"), blogsSeed);

  if (loading) {
    return <LoadingSpinner />;
  }

  const blog = filterContentBySection(blogs, "blogs").find((item) => item.slug === slug);

  if (!blog) {
    return (
      <section className="section-shell py-24">
        <div className="card-surface mx-auto max-w-3xl p-10 text-center">
          <h1 className="font-heading text-4xl text-ink">Article not found</h1>
          <Link
            to="/blog"
            className="mt-6 inline-flex rounded-full bg-gradient-to-r from-saffron to-gold px-5 py-3 text-sm font-semibold text-cosmic"
          >
            Back to blog
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <Seo title={`${blog.title} | Shree Krishna Devasthana`} description={blog.excerpt} />
      <PageHero title={blog.title} description={blog.excerpt} image={blog.image} />
      <section className="section-shell py-20">
        <div className="card-surface mx-auto max-w-4xl overflow-hidden">
          <img src={blog.image} alt={blog.title} className="h-80 w-full object-cover" />
          <div className="p-8 sm:p-10">
            <p className="text-sm uppercase tracking-[0.26em] text-gold">{blog.date}</p>
            <h2 className="mt-3 font-heading text-4xl text-ink">{blog.title}</h2>
            <p className="soft-copy mt-6 leading-8">{blog.content}</p>
            <Link
              to="/blog"
              className="mt-8 inline-flex rounded-full bg-gradient-to-r from-saffron to-gold px-5 py-3 text-sm font-semibold text-cosmic transition hover:shadow-glow"
            >
              Back to blog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default BlogDetailPage;
