import { Category } from "@/types/post";
import { singleLineClass } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Button, Icon } from "../index";
import { SideMenu } from "./side_menu";

export interface TopAppBarProps {
  appTitle?: string;
  categories: Category[];
}

export const TopAppBar = ({ appTitle, categories = [] }: TopAppBarProps) => {
  const [isShowSideBar, setShowSideBar] = useState<boolean>(false);
  const [activeClass, setActiveClass] = useState("active");
  const { asPath, isReady, push, query } = useRouter();
  const onClickHandle = () => {
    if (query.source) {
      onRequestClose();
    } else {
      setShowSideBar(true);
    }
  };
  const closeSlideBar = () => setShowSideBar(false);

  const onRequestClose = () => {
    push(`/genre/${query.genreId}`);
  };

  const targetHomePage = () => {
    push("/");
  };

  useEffect(() => {
    if (isReady) {
      const activePathname = new URL(asPath, location.href).pathname;
      setActiveClass(decodeURI(activePathname));
    }
  }, [asPath, isReady]);

  const mainNavs = useMemo(() => {
    const staticMenu = [
      {
        title: "主页",
        path: "/",
      },
      ...categories,
      {
        title: "所有标签",
        path: "/tags",
      },
      {
        title: "关于",
        path: "/about",
      },
    ];
    return staticMenu;
  }, [categories]);

  return (
    <div
      className={singleLineClass(
        `flex fixed h-16
        top-0 left-0 w-full box-border px-4 md:px-0
        z-30 
        bg-surface
        backdrop-filter backdrop-blur backdrop-saturate-50
        `
      )}
    >
      <div className="container flex items-center justify-between mx-auto h-full">
        <Icon
          onClick={onClickHandle}
          type="line"
          name={query.source ? "arrow-left-s" : "menu"}
          className="w-12 h-12 text-[1.5rem] leading-[3rem] cursor-pointer text-on-surface md:hidden"
        ></Icon>
        <div
          className="text-on-surface title-large ml-6 mr-6 w-full md:w-auto text-center"
          onClick={targetHomePage}
        >
          {appTitle || "InkanTV"}
        </div>
        <div className="title-medium text-on-surface w-full hidden md:block">
          <div className="flex space-x-2 justify-end mr-8">
            {mainNavs.length > 0 &&
              mainNavs.map((cate) => (
                <Link href={`${cate.path}`} passHref key={cate.title}>
                  <Button
                    className="text-on-surface-variant"
                    type={cate.path === activeClass ? "filled" : "text"}
                  >
                    {cate.title}
                  </Button>
                </Link>
              ))}
          </div>
        </div>
        {/* <Icon
          name="search"
          type="line"
          className="w-12 h-12 text-[1.5rem] leading-[3rem] text-on-surface"
        ></Icon> */}
      </div>
      <SideMenu
        isVisible={isShowSideBar}
        onClose={closeSlideBar}
        categories={categories}
      ></SideMenu>
    </div>
  );
};
