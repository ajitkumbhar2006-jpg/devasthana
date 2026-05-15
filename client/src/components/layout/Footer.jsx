import { Link } from "react-router-dom";
import { contactInfo } from "../../data/siteContent";

function Footer() {
  return (
    <footer className="mt-10 border-t border-white/10 bg-[#030814]/90 text-white">
      <div className="section-shell grid gap-10 py-14 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-heading text-3xl text-white">Shree Krishna Devasthana</p>
          <p className="mt-4 max-w-xl text-white/62">
            A peaceful spiritual home for darshan, seva, satsang, and devotional
            community life rooted in the teachings of Lord Krishna.
          </p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-gold">Visit</p>
          <p className="mt-4 text-white/72">{contactInfo.address}</p>
          <p className="mt-3 text-white/72">Shriniwas Annam: {contactInfo.phone}</p>
          <p className="mt-3 text-white/72">{contactInfo.email}</p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-gold">Quick Links</p>
          <div className="mt-4 flex flex-col gap-3">
            <Link to="/activities" className="text-white/72 transition hover:text-gold">
              Temple Activities
            </Link>
            <Link to="/donations" className="text-white/72 transition hover:text-gold">
              Offer Donations
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-sm text-white/60">
        © 2026 Shree Krishna Devasthana. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
