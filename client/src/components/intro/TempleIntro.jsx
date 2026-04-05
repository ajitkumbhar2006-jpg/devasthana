import { useEffect, useRef, useState } from "react";
import {
  INTRO_ASSETS,
  INTRO_TIMINGS,
  createStarfield,
  preloadImages
} from "../../intro";
import "../../intro.css";

function TempleIntro() {
  const canvasRef = useRef(null);
  const cleanupRef = useRef(() => {});
  const timeoutRef = useRef([]);
  const initializedRef = useRef(false);
  const previousOverflowRef = useRef("");
  const [isReady, setIsReady] = useState(false);
  const [isFlashActive, setIsFlashActive] = useState(false);
  const [isVishnuVisible, setIsVishnuVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    if (initializedRef.current) {
      return undefined;
    }

    initializedRef.current = true;
    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const startIntro = async () => {
      await preloadImages([INTRO_ASSETS.galaxy, INTRO_ASSETS.vishnu]);

      if (isCancelled || !canvasRef.current) {
        return;
      }

      cleanupRef.current = createStarfield(canvasRef.current, { starCount: 150 });
      setIsReady(true);

      timeoutRef.current = [
        window.setTimeout(() => setIsFlashActive(true), INTRO_TIMINGS.flash),
        window.setTimeout(() => setIsVishnuVisible(true), INTRO_TIMINGS.reveal),
        window.setTimeout(() => setIsFadingOut(true), INTRO_TIMINGS.fadeOut),
        window.setTimeout(() => {
          cleanupRef.current();
          document.body.style.overflow = previousOverflowRef.current;
          setIsMounted(false);
        }, INTRO_TIMINGS.remove)
      ];
    };

    startIntro();

    return () => {
      isCancelled = true;
      timeoutRef.current.forEach((timer) => window.clearTimeout(timer));
      cleanupRef.current();
      document.body.style.overflow = previousOverflowRef.current;
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      id="intro-overlay"
      className={[
        isReady ? "is-ready" : "",
        isFlashActive ? "flash" : "",
        isVishnuVisible ? "show-vishnu" : "",
        isFadingOut ? "fade-out" : ""
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <canvas id="starfield" ref={canvasRef}></canvas>
      <div className="intro-galaxy">
        <img src={INTRO_ASSETS.galaxy} alt="" className="intro-galaxy-image" />
      </div>
      <div className="intro-flash"></div>
      <div className="intro-vishnu">
        <img src={INTRO_ASSETS.vishnu} alt="" className="intro-vishnu-image" />
      </div>
    </div>
  );
}

export default TempleIntro;
