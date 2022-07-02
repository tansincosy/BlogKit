import {
  applyTheme,
  argbFromHex,
  themeFromSourceColor,
} from "@material/material-color-utilities/dist";
import React, { ReactNode, useEffect } from "react";
import { TopAppBar } from "./top_app_bar";
export const Layout = ({
  children,
}: {
  children: ReactNode;
  isPhone?: boolean;
  isShowNav?: boolean;
}) => {
  useEffect(() => {
    const theme = themeFromSourceColor(argbFromHex("#f82506"));
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    applyTheme(theme, { target: document.body, dark: systemDark });
  }, []);
  return (
    <div className="absolute flex left-0 right-0 bottom-0 top-0 flex-col">
      <TopAppBar />
      <div className="w-full h-80 md:h-96">
        <img
          className="w-full"
          src={`https://images.unsplash.com/photo-1656425311485-3c10dbcc9758?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60`}
          alt="background"
        ></img>
      </div>
      <section className="bg-background flex-1 mt-16 ">{children}</section>
    </div>
  );
};

export default Layout;
