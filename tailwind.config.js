/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

const themeColors = () => {
  return [
    "primary",
    "on-primary",
    "primary-container",
    "on-primary-container",
    "error",
    "on-error",
    "error-container",
    "on-error-container",
    "secondary",
    "on-secondary",
    "secondary-container",
    "on-secondary-container",
    "surface",
    "on-surface",
    "surface-variant",
    "on-surface-variant",
    "tertiary",
    "on-tertiary",
    "tertiary-container",
    "on-tertiary-container",
    "background",
    "on-background",
    "outline",
    "shadow",
    "inverse-on-surface",
    "inverse-primary",
    "inverse-surface",
  ].reduce((total, item) => {
    total[`${item}`] = `var(--md-sys-color-${item})`;
    return total;
  }, {});
};

const fontUnit = (size) => {
  return `${size / 16}rem`;
};
const typography = plugin(({ addComponents, theme }) => {
  addComponents({
    ".toc": {
      // display: "fixed",
      // backgroundColor: ,
      // padding: theme("spacing.6"),
      // boxShadow: theme("boxShadow.xl"),
      // bottom: 0,
      // zIndex: 20,
      // padding: 10 8 10 8,
      // overflowY: "auto",
      // top-[3.8125rem] bottom-0 right-[max(0px,calc(50%-45rem))] w-[19.5rem] py-10 px-8 overflow-y-auto xl:block
    },
    ".display-large": {
      lineHeight: fontUnit(64),
      fontSize: fontUnit(57),
      fontWeight: 400,
      fontFamily: "Roboto ,sans-serif",
    },
    ".display-medium": {
      lineHeight: fontUnit(52),
      fontSize: fontUnit(45),
      fontWeight: 400,
      fontFamily: "Roboto ,sans-serif",
    },
    ".display-small": {
      lineHeight: fontUnit(44),
      fontSize: fontUnit(36),
      fontWeight: 400,
      fontFamily: "Roboto ,sans-serif",
    },
    ".headline-large": {
      lineHeight: fontUnit(40),
      fontSize: fontUnit(32),
      fontWeight: 400,
      fontFamily: "Roboto ,sans-serif",
    },
    ".headline-medium": {
      lineHeight: fontUnit(36),
      fontSize: fontUnit(28),
      fontWeight: 400,
      fontFamily: "Roboto ,sans-serif",
    },
    ".headline-small": {
      lineHeight: fontUnit(32),
      fontSize: fontUnit(24),
      fontWeight: 400,
      fontFamily: "Roboto ,sans-serif",
    },
    ".title-large": {
      lineHeight: fontUnit(28),
      fontSize: fontUnit(22),
      fontWeight: 400,
      fontFamily: "Roboto ,sans-serif",
    },
    ".title-medium": {
      lineHeight: fontUnit(24),
      fontSize: fontUnit(16),
      fontWeight: 500,
      fontFamily: "Roboto ,sans-serif",
      letterSpacing: fontUnit(0.15),
    },
    ".title-small": {
      lineHeight: fontUnit(20),
      fontSize: fontUnit(14),
      fontWeight: 500,
      fontFamily: "Roboto ,sans-serif",
      letterSpacing: fontUnit(0.1),
    },
    ".label-large": {
      lineHeight: fontUnit(20),
      fontSize: fontUnit(14),
      fontWeight: 400,
      fontFamily: "Roboto ,sans-serif",
      letterSpacing: fontUnit(0.1),
    },
    ".label-medium": {
      lineHeight: fontUnit(16),
      fontSize: fontUnit(12),
      fontWeight: 500,
      fontFamily: "Roboto ,sans-serif",
      letterSpacing: fontUnit(0.5),
    },
    ".label-small": {
      lineHeight: fontUnit(6),
      fontSize: fontUnit(11),
      fontWeight: 500,
      fontFamily: "Roboto ,sans-serif",
      letterSpacing: fontUnit(0.5),
    },
    ".body-large": {
      lineHeight: fontUnit(24),
      fontSize: fontUnit(16),
      fontWeight: 500,
      fontFamily: "Roboto ,sans-serif",
      letterSpacing: fontUnit(0.15),
    },
    ".body-medium": {
      lineHeight: fontUnit(20),
      fontSize: fontUnit(14),
      fontWeight: 500,
      fontFamily: "Roboto ,sans-serif",
      letterSpacing: fontUnit(0.25),
    },
    ".body-small": {
      lineHeight: fontUnit(16),
      fontSize: fontUnit(12),
      fontWeight: 500,
      fontFamily: "Roboto ,sans-serif",
      letterSpacing: fontUnit(0.4),
    },
  });
});

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...themeColors(),
      },
      typography(theme) {
        return {
          DEFAULT: {
            css: {
              img: {
                borderRadius: "8px",
              },
              h1: {
                color: theme("colors.on-surface"),
                "&:hover": {
                  color: theme("colors.on-surface"),
                },
              },
              h2: {
                color: theme("colors.on-surface"),
                "&:hover": {
                  color: theme("colors.on-surface"),
                },
              },
              h3: {
                color: theme("colors.on-surface"),
                "&:hover": {
                  color: theme("colors.on-surface"),
                },
              },
              h4: {
                color: theme("colors.on-surface"),
                "&:hover": {
                  color: theme("colors.on-surface"),
                },
              },
              mark: {
                backgroundColor: theme("colors.on-primary-container:"),
              },
              a: {
                color: theme("colors.on-secondary-container"),
              },
              strong: {
                color: theme("colors.on-surface"),
              },
              blockquote: {
                color: theme("colors.on-surface"),
              },
              th: {
                color: theme("colors.on-surface"),
              },
              code: {
                padding: "0 5px",
                color: theme("colors.on-surface"),
                "&::before": {
                  content: '" " !important',
                },
                "&::after": {
                  content: '"" !important',
                },
                backgroundColor: theme("colors.primary-container"),
                borderRadius: "6px",
              },
            },
          },
        };
      },
    },
  },
  plugins: [typography, require("@tailwindcss/typography")],
};
