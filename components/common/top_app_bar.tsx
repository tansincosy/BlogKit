import { singleLineClass } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Icon } from "../index";
import { SideMenu } from "./side_menu";

export interface MenuProps {
  name: string;
  path: string;
}
export interface TopAppBarProps {
  appTitle?: string;
  menus: MenuProps[];
}
export const TopAppBar = ({ appTitle, menus }: TopAppBarProps) => {
  const [isShowSideBar, setShowSideBar] = useState<boolean>(false);
  const router = useRouter();
  const { query } = router;
  const onClickHandle = () => {
    if (router.query.source) {
      onRequestClose();
    } else {
      setShowSideBar(true);
    }
  };
  const closeSlideBar = () => setShowSideBar(false);

  const onRequestClose = () => {
    router.push(`/genre/${query.genreId}`);
  };

  const targetHomePage = () => {
    router.push("/");
  };

  return (
    <div
      className={singleLineClass(
        `flex items-center justify-between fixed 
        top-0 left-0 w-full box-border pl-4 pr-4 h-16 
        z-30 backdrop-filter backdrop-blur backdrop-saturate-50`
      )}
      style={{
        backgroundColor: `rgba(var(--md-sys-color-surface),0.1)`,
      }}
    >
      <Icon
        onClick={onClickHandle}
        type="line"
        name={router.query.source ? "arrow-left-s" : "menu"}
        className="w-12 h-12 text-[1.5rem] leading-[3rem] cursor-pointer text-on-surface md:hidden"
      ></Icon>
      <div
        className="text-on-surface title-large ml-6 mr-6 w-full md:w-auto text-center"
        onClick={targetHomePage}
      >
        {appTitle || "InkanTV"}
      </div>
      <div className="title-medium text-on-surface w-full hidden md:block">
        <div className="flex space-x-9 justify-end mr-8">
          {Array.isArray(menus) &&
            menus.map((menu) => (
              <Link href={`${menu}`} passHref key={menu.name}>
                <a className="text-on-surface-variant">{menu.name}</a>
              </Link>
            ))}
        </div>
      </div>
      <Icon
        name="search"
        type="line"
        className="w-12 h-12 text-[1.5rem] leading-[3rem] text-on-surface"
      ></Icon>
      <SideMenu isVisible={isShowSideBar} onClose={closeSlideBar}></SideMenu>
    </div>
  );
};
