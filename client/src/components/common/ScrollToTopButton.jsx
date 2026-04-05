import { useEffect, useState } from "react";

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 260);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="glass-pill fixed bottom-6 right-6 z-50 px-4 py-3 text-sm font-semibold transition hover:border-gold hover:text-gold"
      aria-label="Scroll to top"
    >
      Top
    </button>
  );
}

export default ScrollToTopButton;
