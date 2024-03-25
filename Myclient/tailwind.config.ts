import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      spacing: {
        leftNavBarWidth: "52px",
      },
      colors: {
        btnPrimary: "#2283f6",
        error: "#ED1D49FF",

        textFade: "#93acd3",
        "white-transparent-80": "hsla(0, 0%, 100%, .8)",
        "white-transparent-70": "hsla(0, 0%, 100%, .7)",
        "white-transparent-65": "hsla(0, 0%, 100%, .65)",
        "white-transparent-60": "hsla(0, 0%, 100%, .6)",
        "white-transparent-50": " hsla(0, 0%, 100%, .5)",
        "white-transparent-30": "hsla(0, 0%, 100%, .3)",
        "background-100": "#0d131c",
        "background-90": "#111923",
        "background-80": "#161f2c",
        "grey-100": "#1c2532",
        "grey-80": "#202a39",
        "grey-70": "#263041",
        "grey-60": "#2a3546",
        "grey-50": "#3c485c",
        "grey-40": "#55657e",
        "grey-30": "#6e81a0",
        "grey-20": "#93acd3",

        "dark-shades-gray-100": "#1c2532",
        "dark-shades-gray-60": "#2a3546",
        "dark-shades-gray-40": "#55657e",
        red: "#ed1d49",
        "red-hover": "#c31d40",
        "red-pressed": "#ae1435",
        blue: "#2283f6",
        "blue-hover": "#0b6ada",
        "blue-pressed": "#075cc0",
        yellow: "#ffb636",
        "yellow-hover": "#ffa200",
        "yellow-pressed": "#f09000",
        "yellow-2": "#fed700",
        green: "#1bb83d",
        "green-hover": "#1ca63a",
        "green-pressed": "#1b9636",
      },
      backgroundColor: {
        twPrimary: "#1b2636",
        twFatePrimary: "#161f2c",
        btnPrimary: "#2283f6",
      },
      width: {},

      screens: {
        sm: { min: "280px", max: "574px" },
        md: { min: "575px", max: "915px" },
        lg: { min: "916px", max: "1199px" },
        xl: { min: "1200px", max: "4000px" },
        gmd: { min: "991px" },

        // xs: { max: '279px' },
        // sm: { max: '574px' },
        // md: { max: '915px' },
        // lg: { max: '1199px' },
        // xl: { max: '4000px' },
        // sm:574,
        // md:915,
        // lg:1200,
      },
    },
  },

  plugins: [],
};
export default config;
