import "@/styles/globals.css";
import "@/styles/_drawer.scss";
import "gitalk/dist/gitalk.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
