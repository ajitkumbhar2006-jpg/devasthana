import { lazy, Suspense, useEffect, useRef, useState } from "react";
import "./loader.css";

const GalaxyScene = lazy(() => import("./GalaxyScene"));
const VishnuScene = lazy(() => import("./VishnuScene"));

const PHASE_TIMINGS = {
  flash: 2500,
  vishnu: 2825,
  fadeOut: 3950,
  finish: 4500
};

const ASSETS_TO_PRELOAD = ["/assets/galaxy.jpg", "/assets/vishnu.png"];

function preloadImage(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = src;
    image.onload = resolve;
    image.onerror = resolve;
  });
}

function LoaderFallback() {
  return (
    <div className="temple-loader__fallback">
      <div className="temple-loader__fallback-stars" />
    </div>
  );
}

function TempleLoader({ onFinish }) {
  const timeoutRef = useRef([]);
  const previousOverflowRef = useRef("");
  const finishedRef = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const [phase, setPhase] = useState("galaxy");

  useEffect(() => {
    let cancelled = false;

    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    Promise.all(ASSETS_TO_PRELOAD.map(preloadImage)).then(() => {
      if (!cancelled) {
        setIsReady(true);
      }
    });

    timeoutRef.current = [
      window.setTimeout(() => setPhase("flash"), PHASE_TIMINGS.flash),
      window.setTimeout(() => setPhase("vishnu"), PHASE_TIMINGS.vishnu),
      window.setTimeout(() => setPhase("fade-out"), PHASE_TIMINGS.fadeOut),
      window.setTimeout(() => {
        if (finishedRef.current) {
          return;
        }

        finishedRef.current = true;
        document.body.style.overflow = previousOverflowRef.current;
        onFinish?.();
      }, PHASE_TIMINGS.finish)
    ];

    return () => {
      cancelled = true;
      timeoutRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      document.body.style.overflow = previousOverflowRef.current;
    };
  }, [onFinish]);

  return (
    <div
      className={[
        "temple-loader",
        isReady ? "is-ready" : "",
        phase === "flash" ? "is-flashing" : "",
        phase === "vishnu" || phase === "fade-out" ? "show-vishnu" : "",
        phase === "fade-out" ? "is-fading-out" : ""
      ]
        .filter(Boolean)
        .join(" ")}
      role="presentation"
      aria-hidden="true"
    >
      <Suspense fallback={<LoaderFallback />}>
        <div className="temple-loader__scene temple-loader__scene--galaxy">
          <GalaxyScene active={phase !== "fade-out"} />
        </div>
        <VishnuScene visible={phase === "vishnu" || phase === "fade-out"} />
      </Suspense>
      <div className="temple-loader__flash" />
      <div className="temple-loader__veil" />
    </div>
  );
}

export default TempleLoader;
