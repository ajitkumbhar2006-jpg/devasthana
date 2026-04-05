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
    <header className="glass-header sticky top-0 z-50">
      <div className="section-shell flex items-center justify-between py-4">
        <Link to="/" className="max-w-[13rem]">
          <p className="font-heading text-xl text-ink sm:text-2xl">Shree Krishna</p>
          <p className="text-xs uppercase tracking-[0.32em] text-gold">
            Devasthana
          </p>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-semibold uppercase tracking-[0.2em] transition ${
                  isActive ? "text-gold" : "text-white/72 hover:text-gold"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/donations"
            className="rounded-full bg-gradient-to-r from-saffron to-gold px-5 py-3 text-sm font-semibold text-cosmic transition hover:shadow-glow"
          >
            Donate Now
          </Link>
        </nav>

        <button
          type="button"
          className="glass-pill inline-flex px-4 py-2 text-sm font-semibold lg:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          Menu
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-white/10 bg-[#040b17]/90 px-4 py-4 lg:hidden">
          <div className="section-shell flex flex-col gap-4 px-0">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-semibold uppercase tracking-[0.18em] ${
                    isActive ? "text-gold" : "text-white/72"
                  }`
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
