import "@/styles/globals.css";
import "@/styles/_drawer.scss";
import "@/styles/_dialog.scss";
import "@/styles/_toc.scss";
import "highlight.js/styles/atom-one-dark.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
