import { useEffect, useRef } from "react";
import loaderVideo from "./assets/loader.mp4";
import "./Loader.css";

export default function Loader({ onFinish }) {
  const videoRef = useRef(null);
  const loaderRef = useRef(null); // ✅ better than parentElement

  useEffect(() => {
    const video = videoRef.current;
    const loader = loaderRef.current;

    // lock scroll
    document.body.style.overflow = "hidden";

    const handleEnd = () => {
      if (loader) {
        loader.classList.add("fade-out"); // smooth transition
      }

      setTimeout(() => {
        document.body.style.overflow = "auto"; // restore scroll
        onFinish();
      }, 800); // match CSS transition
    };

    if (video) {
      video.addEventListener("ended", handleEnd);
    }

    return () => {
      document.body.style.overflow = "auto";
      if (video) {
        video.removeEventListener("ended", handleEnd);
      }
    };
  }, [onFinish]);

  return (
    <div ref={loaderRef} className="loader">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"   // ✅ smoother start
      >
        <source src={loaderVideo} type="video/mp4" />
      </video>
    </div>
  );
}