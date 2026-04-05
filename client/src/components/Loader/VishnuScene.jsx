import { useEffect, useRef } from "react";

function VishnuScene({ visible }) {
  const frameRef = useRef(null);
  const pointerRef = useRef({ currentX: 0, currentY: 0, targetX: 0, targetY: 0 });
  const rafRef = useRef(0);

  useEffect(() => {
    const element = frameRef.current;

    if (!element) {
      return undefined;
    }

    const handlePointerMove = (event) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      pointerRef.current.targetX = (event.clientX - centerX) / centerX;
      pointerRef.current.targetY = (event.clientY - centerY) / centerY;
    };

    const animate = () => {
      const pointer = pointerRef.current;
      pointer.currentX += (pointer.targetX - pointer.currentX) * 0.06;
      pointer.currentY += (pointer.targetY - pointer.currentY) * 0.06;

      element.style.setProperty("--parallax-x", `${pointer.currentX * 18}px`);
      element.style.setProperty("--parallax-y", `${pointer.currentY * 14}px`);

      rafRef.current = window.requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    rafRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className={`temple-loader__scene temple-loader__scene--vishnu ${visible ? "is-visible" : ""}`}>
      <div className="vishnu-frame" ref={frameRef}>
        <div className="vishnu-frame__aura" />
        <img className="vishnu-frame__image" src="/assets/vishnu.png" alt="Lord Vishnu reclining on Shesha Naag" />
        <div className="vishnu-frame__halo" />
      </div>
    </div>
  );
}

export default VishnuScene;
