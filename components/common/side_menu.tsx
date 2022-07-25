import { singleLineClass } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import Drawer from "rc-drawer";
import React, { forwardRef, useMemo } from "react";
import { Icon } from "../ui/icon";
interface SideMenuProps {
  isVisible: boolean;
  appTitle?: string;
  onClose: () => void;
  category: Blog.CategoryPost;
}

interface MenuProps {
  title: string;
  icon: string;
  href: string;
  badge?: number;
  exact?: boolean;
  top: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const MenuItem = forwardRef<HTMLAnchorElement, MenuProps>(
  ({ title, icon, href, onClick, badge, exact }, ref) => {
    const { asPath } = useRouter();
    const isActive = exact ? asPath === href : asPath.startsWith(href);
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
          className="on-secondary-container text-2xl mr-3 text-primary"
        ></Icon>
        <div className="label-large text-on-secondary-container flex-1">
          {title}
        </div>
        {badge && <div className="label-large text-primary">{badge}</div>}
      </a>
    );
  }
);
MenuItem.displayName = "MenuItem";
export const SideMenu: React.FC<SideMenuProps> = ({
  isVisible,
  onClose,
  appTitle,
  category,
}) => {
  const getCategory = () => {
    return Object.keys(category).map((cateKey) => {
      const blogs = category[cateKey];
      return {
        title: cateKey,
        icon: "home",
        href: "/category/" + cateKey,
        exact: true,
        top: true,
        badge: blogs.length || 0,
      };
    });
  };

  const slideMenus = useMemo(() => {
    return [
      {
        title: "首页",
        icon: "home",
        href: "/",
        exact: true,
        top: true,
      },
      ...getCategory(),
      {
        title: "所有标签",
        href: "/tags",
        icon: "bookmark",
        exact: true,
        top: true,
      },
      {
        title: "关于",
        icon: "skull",
        href: "/about",
        exact: true,
        top: true,
      },
    ].map((item) => {
      return (
        <Link key={item.title} passHref href={item.href}>
          <MenuItem {...item}></MenuItem>
        </Link>
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

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
        {appTitle || "Blog"}
      </div>
      {slideMenus}
      <div className="border-solid border-t-[0.0625rem] border-outline px-2 box-border "></div>
    </Drawer>
  );
};
