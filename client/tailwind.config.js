/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        saffron: "#FF9933",
        gold: "#D4AF37",
        ivory: "#FFF9F1",
        sandal: "#F5E4C8",
        ink: "#352314"
      },
      fontFamily: {
        heading: ["Georgia", "Cambria", "Times New Roman", "serif"],
        body: ["Segoe UI", "Tahoma", "Geneva", "Verdana", "sans-serif"]
      },
      boxShadow: {
        aura: "0 18px 50px rgba(212, 175, 55, 0.18)"
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at top, rgba(255,153,51,0.2), transparent 38%), linear-gradient(135deg, rgba(53,35,20,0.92), rgba(90,55,17,0.84))",
        "lotus-pattern":
          "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,249,241,0.94)), radial-gradient(circle at 10% 20%, rgba(212,175,55,0.08), transparent 28%), radial-gradient(circle at 90% 10%, rgba(255,153,51,0.12), transparent 22%)"
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        fadeUp: "fadeUp 0.8s ease both"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      }
    }
  },
  plugins: []
};
