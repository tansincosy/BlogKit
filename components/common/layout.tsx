import { Category } from "@/types/post";
import {
  applyTheme,
  argbFromHex,
  themeFromSourceColor,
} from "@material/material-color-utilities/dist";
import React, { ReactNode, useEffect } from "react";
import { Icon } from "../ui/icon";
import { TopAppBar } from "./top_app_bar";
export const Layout = ({
  children,
  categories,
}: {
  children: ReactNode;
  categories: Category[];
}) => {
  useEffect(() => {
    const theme = themeFromSourceColor(argbFromHex("#9b06f8"));
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    applyTheme(theme, { target: document.body, dark: systemDark });
  }, []);

  return (
    <div className="absolute flex left-0 right-0 bottom-0 top-0 flex-col">
      <TopAppBar categories={categories} appTitle={"ssss"} />
      <section className="bg-background flex-1">{children}</section>
      <footer className="w-full flex flex-col justify-center items-center p-9 bg-surface-variant text-on-surface-variant flex-none h-72">
        <ul className="flex space-x-8">
          <li>
            <Icon
              name="github"
              onClick={() => {}}
              className="title-large cursor-pointer"
            />
          </li>
          <li>
            <Icon
              name="weibo"
              onClick={() => {}}
              className="title-large cursor-pointer"
            />
          </li>
          <li>
            <Icon
              name="twitter"
              onClick={() => {}}
              className="title-large cursor-pointer"
            />
          </li>
        </ul>
        <div className="label-large"> &copy; 2022 All rights reserved</div>
      </footer>
    </div>
  );
};

export default Layout;
