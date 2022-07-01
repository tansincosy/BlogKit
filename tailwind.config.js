/** @type {import('tailwindcss').Config} */

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
    },
  },
  plugins: [],
};
