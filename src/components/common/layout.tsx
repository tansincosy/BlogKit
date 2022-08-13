import { contact } from "@/config";
import {
  applyTheme,
  argbFromHex,
  themeFromSourceColor,
} from "@material/material-color-utilities/dist";
import React, { ReactNode, useEffect } from "react";
import BackToTopBtn from "./back_to_top";
import Footer from "./footer";
import { TopAppBar } from "./top_app_bar";

export const Layout = ({
  children,
  category,
  themeColor,
}: {
  children: ReactNode;
  category: Blog.CategoryPost;
  themeColor?: string;
}) => {
  useEffect(() => {
    const theme = themeFromSourceColor(argbFromHex(themeColor || "#066bf8"));
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    applyTheme(theme, { target: document.body, dark: systemDark });
  }, [themeColor]);

  const footers = Object.keys(contact).map((item: string) => {
    return {
      id: item,
      name: contact[item].name,
      icon: contact[item].icon,
      url: contact[item].url,
    };
  });

  return (
    <div className="absolute flex left-0 right-0 bottom-0 top-0 flex-col">
      <TopAppBar category={category} appTitle={"BlogKit"} />
      <section className="bg-background flex-1 pb-20 box-border">
        {children}
      </section>
      <Footer footers={footers}></Footer>
      <BackToTopBtn />
    </div>
  );
};

export default Layout;
