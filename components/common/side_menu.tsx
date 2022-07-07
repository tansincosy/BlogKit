import { singleLineClass } from "@/utils";
import { useRouter } from "next/router";
import Drawer from "rc-drawer";
import React, { forwardRef } from "react";
import { Icon } from "../ui/icon";
import Link from "next/link";
interface SideMenuProps {
  isVisible: boolean;
  onClose: () => void;
}

interface MenuProps {
  name: string;
  icon: string;
  href: string;
  badge?: number;
  id: string;
  exact?: boolean;
  top: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const MenuItem = forwardRef<HTMLAnchorElement, MenuProps>(
  ({ name, icon, href, onClick, badge, exact }, ref) => {
    const { asPath, pathname } = useRouter();
    const isActive = exact ? pathname === href : asPath.startsWith(href);
    return (
      <a
        ref={ref}
        href={href}
        onClick={onClick}
        className={singleLineClass(
          isActive ? "bg-secondary-container" : "",
          "h-14 box-border pl-4 pr-6 flex items-center rounded-[1.75rem] w-full relative overflow-hidden cursor-pointer",
          `hover:after:w-[200%] hover:after:h-[200%] hover:after:bg-on-surface hover:after:opacity-[.16] hover:after:absolute hover:after:top-[-50%] hover:after:left-[-50%]
        active:after:w-[200%] active:after:h-[200%] active:after:bg-on-surface active:after:opacity-[.24] active:after:absolute active:after:top-[-50%] active:after:left-[-50%]`
        )}
      >
        <Icon
          name={icon}
          type="line"
          className="on-secondary-container text-2xl mr-3"
        ></Icon>
        <div className="label-large text-on-secondary-container flex-1">
          {name}
        </div>
        {badge && <span className="label-large">{badge}</span>}
      </a>
    );
  }
);
MenuItem.displayName = "MenuItem";

export const SideMenu: React.FC<SideMenuProps> = ({ isVisible, onClose }) => {
  const data: MenuProps[] = [
    {
      name: "Home",
      icon: "home-smile",
      href: "/",
      id: "home",
      exact: true,
      top: true,
    },
    {
      name: "关于",
      icon: "skull",
      href: "/blog/about",
      id: "about",
      exact: false,
      top: true,
    },
  ];
  return (
    <Drawer
      open={isVisible}
      onClose={onClose}
      handler={false}
      level={null}
      afterVisibleChange={(c: boolean) => {}}
      width="22.5rem"
    >
      <div className="text-on-surface-variant title-small box-border px-4 h-14 leading-[3.5rem]">
        IKan.TV
      </div>
      {data &&
        data.map((menu) => {
          return (
            <Link key={menu.id} passHref href={menu.href}>
              <MenuItem {...menu}></MenuItem>
            </Link>
          );
        })}
      <div className="border-solid border-t-[0.0625rem] border-outline px-2 box-border "></div>
    </Drawer>
  );
};
