/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Intentional inverted theme naming: light-themed semantic names map to dark palette
        saffron: "#f4a338",
        gold: "#f5d06f",
        ivory: "#0b1020",
        sandal: "#2b3d63",
        ink: "#f5f0df",
        cosmic: "#030712",
        midnight: "#08111f",
        ocean: "#0c203f",
        starlight: "#c4d7ff"
      },
      fontFamily: {
        heading: ["Cinzel", "Georgia", "Cambria", "Times New Roman", "serif"],
        body: ["\"Segoe UI\"", "Tahoma", "Geneva", "Verdana", "sans-serif"]
      },
      boxShadow: {
        aura: "0 24px 80px rgba(7, 14, 30, 0.45)",
        glow: "0 0 60px rgba(245, 208, 111, 0.16)"
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at 20% 20%, rgba(244,163,56,0.26), transparent 26%), radial-gradient(circle at 78% 18%, rgba(72,123,255,0.22), transparent 24%), linear-gradient(135deg, rgba(3,7,18,0.96), rgba(7,17,31,0.94) 42%, rgba(12,32,63,0.92))",
        "lotus-pattern":
          "radial-gradient(circle at top, rgba(31,61,115,0.38), transparent 32%), radial-gradient(circle at 15% 20%, rgba(244,163,56,0.14), transparent 20%), radial-gradient(circle at 85% 10%, rgba(103,145,255,0.18), transparent 24%), linear-gradient(135deg, #02050f 0%, #071220 48%, #0b1c33 100%)",
        "site-shimmer":
          "linear-gradient(120deg, rgba(255,255,255,0.14), rgba(255,255,255,0.02) 45%, rgba(245,208,111,0.12))"
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        fadeUp: "fadeUp 0.8s ease both",
        pulseHalo: "pulseHalo 5s ease-in-out infinite",
        drift: "drift 20s linear infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        pulseHalo: {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "0.95", transform: "scale(1.08)" }
        },
        drift: {
          "0%": { transform: "translate3d(-2%, 0, 0)" },
          "50%": { transform: "translate3d(2%, -2%, 0)" },
          "100%": { transform: "translate3d(-2%, 0, 0)" }
        }
      }
    }
  },
  plugins: []
};
