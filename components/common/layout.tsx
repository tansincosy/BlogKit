import { Category, FootLink } from "@/types/post";
import {
  applyTheme,
  argbFromHex,
  themeFromSourceColor,
} from "@material/material-color-utilities/dist";
import React, { ReactNode, useEffect } from "react";
import Footer from "./footer";
import { TopAppBar } from "./top_app_bar";

const footers: FootLink[] = [
  {
    id: "github",
    name: "GitHub",
    icon: "github",
    url: "https://github.com/tansincosy",
  },
  {
    id: "rss",
    name: "RSS 订阅",
    icon: "rss",
    url: "/rss/feed.xml",
  },
];

export const Layout = ({
  children,
  categories,
  themeColor,
}: {
  children: ReactNode;
  categories: Category[];
  themeColor?: string;
}) => {
  useEffect(() => {
    const theme = themeFromSourceColor(argbFromHex(themeColor || "#9b06f8"));
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    applyTheme(theme, { target: document.body, dark: systemDark });
  }, []);

  return (
    <div className="absolute flex left-0 right-0 bottom-0 top-0 flex-col">
      <TopAppBar categories={categories} appTitle={"ssss"} />
      <section className="bg-background flex-1 pb-20 box-border">
        {children}
      </section>
      <Footer footers={footers}></Footer>
    </div>
  );
};

export default Layout;
