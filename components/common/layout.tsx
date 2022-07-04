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
    applyTheme(theme, { target: document.body, dark: true });
  }, []);
  return (
    <div className="absolute flex left-0 right-0 bottom-0 top-0 flex-col">
      <TopAppBar />
      <section className="bg-background flex-1">{children}</section>
    </div>
  );
};

export default Layout;
