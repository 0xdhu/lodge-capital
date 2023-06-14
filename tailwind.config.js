/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "fade-out":
          "fade-out-bck 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
        "slide-in-elliptic-bottom-fwd":
          "slide-in-elliptic-bottom-fwd 1.4s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
        "scale-in-center":
          "scale-in-center 1.4s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
        "fade-in": "fade-in 0.5s linear forwards",
        border: "border 2.5s linear infinite",
        marquee: "marquee var(--marquee-duration) linear infinite",
        "spin-slow": "spin 4s linear infinite",
        "spin-slower": "spin 6s linear infinite",
        "spin-reverse": "spin-reverse 1s linear infinite",
        "spin-reverse-slow": "spin-reverse 4s linear infinite",
        "spin-reverse-slower": "spin-reverse 6s linear infinite",
        "scale-out-center":
          "scale-out-center 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530)   both",
        "slide-in-elliptic-top-fwd":
          "slide-in-elliptic-top-fwd 1.4s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
        "tilt-in-fwd-tr":
          "tilt-in-fwd-tr 1.4s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
        "tilt-in-fwd-tl":
          "tilt-in-fwd-tl 1.4s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
      },
      keyframes: {
        "fade-out": {
          "0%": {
            transform: "translateZ(0)",
            opacity: "1",
          },
          to: {
            transform: "translateZ(-80px)",
            opacity: "0",
          },
        },
        "slide-in-elliptic-bottom-fwd": {
          "0%": {
            transform: "translateY(600px) rotateX(30deg) scale(0)",
            "transform-origin": "50% 100%",
            opacity: "0",
          },
          to: {
            transform: "translateY(0) rotateX(0) scale(1)",
            "transform-origin": "50% -1400px",
            opacity: "1",
          },
        },
        "tilt-in-fwd-tl": {
          "0%": {
            transform:
              "rotateY(-20deg) rotateX(35deg) translate(-300px, -300px) skew(35deg, -10deg)",
            opacity: "0",
          },
          "100%": {
            transform:
              "rotateY(0) rotateX(0deg) translate(0, 0) skew(0deg, 0deg)",
            opacity: "1",
          },
        },
        "tilt-in-fwd-tr": {
          "0%": {
            transform:
              "rotateY(20deg) rotateX(35deg) translate(300px, -300px) skew(-35deg, 10deg)",
            opacity: "0",
          },
          "100%": {
            transform:
              "rotateY(0) rotateX(0deg) translate(0, 0) skew(0deg, 0deg)",
            opacity: "1",
          },
        },
        "slide-in-elliptic-top-fwd": {
          "0%": {
            transform: "translateY(-600px) rotateX(-30deg) scale(0)",
            "transform-origin": "50% 100%",
            opacity: "0",
          },
          to: {
            transform: "translateY(0) rotateX(0) scale(1)",
            "transform-origin": "50% 1400px",
            opacity: "1",
          },
        },
        border: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "scale-in-center": {
          "0%": {
            transform: "scale(0)",
            opacity: "1",
          },
          to: {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        "scale-out-center": {
          "0%": {
            transform: "scale(1)",
            opacity: "1",
          },
          to: {
            transform: "scale(0)",
            opacity: "1",
          },
        },
      },
      fontFamily: {
        lodge: ["LODGEFONT"],
        calibri: ["calibri"],
        Montserrat: ["Montserrat", "Montserrat"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
