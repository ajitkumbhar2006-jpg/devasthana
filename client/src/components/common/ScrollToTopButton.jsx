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
      className="fixed bottom-6 right-6 z-50 rounded-full bg-saffron px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-ink"
      aria-label="Scroll to top"
    >
      Top
    </button>
  );
}

export default ScrollToTopButton;
