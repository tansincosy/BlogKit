import { singleLineClass } from "@/utils";
import { useRouter } from "next/router";
import { useState } from "react";
import { Icon } from "../index";
import { SideMenu } from "./side_menu";

export interface TopAppBarProps {
  appTitle?: string;
}

export const TopAppBar = ({ appTitle }: TopAppBarProps) => {
  const [isShowSideBar, setShowSideBar] = useState<boolean>(false);
  const router = useRouter();
  const onClickHandle = () => {
    if (router.query.source) {
      onRequestClose();
    } else {
      setShowSideBar(true);
    }
  };
  const closeSlideBar = () => setShowSideBar(false);

  const onRequestClose = () => {
    const { query } = router;
    router.push(`/genre/${query.genreId}`);
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
      <div className="text-on-surface title-large ml-6 mr-6 w-full md:w-auto text-center">
        {appTitle || "InkanTV"}
      </div>
      <div className="title-medium text-on-surface w-full hidden md:block">
        <ul className="flex space-x-9 justify-end mr-8">
          <li className="cursor-pointer">首页</li>
          <li className="cursor-pointer">生活</li>
          <li className="cursor-pointer">技术</li>
          <li className="cursor-pointer">笔记</li>
          <li className="cursor-pointer">关于</li>
        </ul>
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
