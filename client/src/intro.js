export const INTRO_ASSETS = {
  galaxy: "/assets/galaxy.png",
  vishnu: "/assets/vishnu.png"
};

export const INTRO_TIMINGS = {
  flash: 2500,
  reveal: 3000,
  fadeOut: 5000,
  remove: 6000
};

export const preloadImages = (sources) => {
  return Promise.all(
    sources.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve;
        })
    )
  );
};

const createStar = (width, height) => {
  const depth = Math.random();
  const size = 0.6 + depth * 2.4;
  const speed = 0.12 + depth * 0.55;

  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size,
    speed,
    opacity: 0.18 + Math.random() * 0.65,
    twinkleOffset: Math.random() * Math.PI * 2,
    twinkleSpeed: 0.006 + Math.random() * 0.018,
    drift: (Math.random() - 0.5) * (0.1 + depth * 0.35)
  };
};

export const createStarfield = (canvas, { starCount = 140 } = {}) => {
  const context = canvas.getContext("2d", { alpha: true });

  if (!context) {
    return () => {};
  }

  let animationFrameId = 0;
  let width = window.innerWidth;
  let height = window.innerHeight;
  let stars = [];
  let reducedMotionQuery;

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    stars = Array.from({ length: starCount }, () => createStar(width, height));
  };

  const drawStars = (time) => {
    context.clearRect(0, 0, width, height);

    for (const star of stars) {
      star.y -= star.speed;
      star.x += star.drift;

      if (star.y < -star.size || star.x < -star.size || star.x > width + star.size) {
        Object.assign(star, createStar(width, height), {
          y: height + star.size
        });
      }

      const flicker =
        star.opacity * (0.72 + 0.28 * Math.sin(time * star.twinkleSpeed + star.twinkleOffset));

      context.globalAlpha = flicker;
      context.fillStyle = "#ffffff";
      context.beginPath();
      context.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      context.fill();

      context.globalAlpha = flicker * 0.24;
      context.beginPath();
      context.arc(star.x, star.y, star.size * 4.6, 0, Math.PI * 2);
      context.fill();
    }

    context.globalAlpha = 1;
  };

  const animateStars = (time) => {
    drawStars(time);
    animationFrameId = window.requestAnimationFrame(animateStars);
  };

  resize();

  reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (reducedMotionQuery.matches) {
    drawStars(0);
  } else {
    animationFrameId = window.requestAnimationFrame(animateStars);
  }

  window.addEventListener("resize", resize);

  return () => {
    window.removeEventListener("resize", resize);
    window.cancelAnimationFrame(animationFrameId);
  };
};
