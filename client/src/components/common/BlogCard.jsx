import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  return (
    <article className="card-surface overflow-hidden">
      <img
        src={blog.image_url}
        alt={blog.title}
        className="h-56 w-full object-cover"
        loading="lazy"
      />
      <div className="p-6">
        <p className="text-sm uppercase tracking-[0.24em] text-gold">{blog.date}</p>
        <h3 className="mt-3 font-heading text-2xl text-ink">{blog.title}</h3>
        <p className="soft-copy mt-4">{blog.description}</p>
        <Link
          to={`/blog/${blog.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink transition hover:text-gold"
        >
          Read article
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

export default BlogCard;
