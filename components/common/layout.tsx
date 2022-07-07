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
}: {
  children: ReactNode;
  isPhone?: boolean;
  isShowNav?: boolean;
}) => {
  useEffect(() => {
    const theme = themeFromSourceColor(argbFromHex("#0632f8"));
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    applyTheme(theme, { target: document.body, dark: true });
  }, []);
  return (
    <div className="absolute flex left-0 right-0 bottom-0 top-0 flex-col">
      <TopAppBar />
      <section className="bg-background flex-1">{children}</section>
      <footer className="w-full flex flex-col items-center p-9 bg-surface-variant text-on-surface-variant">
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
