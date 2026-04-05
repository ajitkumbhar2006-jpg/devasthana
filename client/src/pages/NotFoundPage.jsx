import { Link } from "react-router-dom";
import Seo from "../components/common/Seo";

function NotFoundPage() {
  return (
    <>
      <Seo title="Page Not Found | Shree Krishna Devasthana" description="Requested page was not found." />
      <section className="section-shell py-24">
        <div className="card-surface mx-auto max-w-3xl p-10 text-center">
          <p className="text-sm uppercase tracking-[0.28em] text-gold">404</p>
          <h1 className="mt-4 font-heading text-5xl text-ink">Page not found</h1>
          <p className="soft-copy mt-4">
            The page you are looking for may have moved. Return to the temple home page.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex rounded-full bg-gradient-to-r from-saffron to-gold px-5 py-3 text-sm font-semibold text-cosmic transition hover:shadow-glow"
          >
            Go Home
          </Link>
        </div>
      </section>
    </>
  );
}

export default NotFoundPage;
