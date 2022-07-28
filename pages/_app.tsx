import "@/styles/globals.css";
import "@/styles/_drawer.scss";
import "@/styles/_toc.scss";
import "highlight.js/styles/atom-one-dark.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { getElementPosition } from "@/utils";
import { useRouter } from "next/router";

const hashChangeEvent = () => {
  const hashName = location.hash ? location.hash.slice(1) : "";
  const targetElement =
    document.getElementById(hashName) ||
    document.querySelector(`[name='${hashName}']`);

  if (targetElement) {
    scrollTo({
      top: getElementPosition(targetElement).y - 128,
      behavior: "smooth",
    });
  } else {
    scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    window.addEventListener("hashchange", hashChangeEvent, false);
    return () => {
      window.removeEventListener("hashchange", hashChangeEvent, false);
      router.events.off("hashChangeStart", () => {});
    };
  }, [router.events]);
  return <Component {...pageProps} />;
}

export default MyApp;
