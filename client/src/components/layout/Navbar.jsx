import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navLinks } from "../../data/siteContent";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/90 backdrop-blur-xl">
      <div className="section-shell flex items-center justify-between py-4">
        <Link to="/" className="max-w-[13rem]">
          <p className="font-heading text-xl text-ink sm:text-2xl">Shree Krishna</p>
          <p className="text-xs uppercase tracking-[0.28em] text-saffron">
            Devasthana
          </p>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-semibold transition ${
                  isActive ? "text-saffron" : "text-ink hover:text-saffron"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/donations"
            className="rounded-full bg-saffron px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink"
          >
            Donate Now
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex rounded-full border border-sandal px-4 py-2 text-sm font-semibold text-ink lg:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          Menu
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-sandal bg-white px-4 py-4 lg:hidden">
          <div className="section-shell flex flex-col gap-4 px-0">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-semibold ${isActive ? "text-saffron" : "text-ink"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
