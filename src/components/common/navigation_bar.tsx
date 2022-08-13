import { singleLineClass } from "@/utils";
import { useState } from "react";
import { Icon } from "..";

const SmallBadge = () => {
  return (
    <div className="bg-error w-[0.375rem] h-[0.375rem] absolute z-10 rounded-full left-4 -top-[.125rem]"></div>
  );
};

const LargeBadge = ({ errorNumber }: { errorNumber: number }) => {
  return (
    <div
      className={singleLineClass(`bg-error text-on-error label-small rounded-lg
     absolute left-[.1875rem] -top-[.125rem] h-4 min-w-[1rem] leading-[1rem] text-center`)}
    >
      {errorNumber}
    </div>
  );
};

export const NavigatorBar = () => {
  const navigatorList = [
    {
      name: "主页",
      path: "/",
      icon: "home",
    },
    {
      name: "About",
      path: "/about",
      icon: "information",
    },
    {
      name: "Contact",
      path: "/contact",
      icon: "phone",
    },
    {
      name: "Search",
      path: "/search",
      icon: "search",
    },
  ];
  const [active] = useState(navigatorList[0].path);

  const [smallBadge] = useState(navigatorList[2].path);

  const [largeBadge] = useState(navigatorList[3].path);

  return (
    <div className="bg-surface fixed bottom-0 left-0 w-full h-20 flex justify-between space-x-2 z-30">
      {navigatorList.map((navigator) => {
        return (
          <div
            key={navigator.name}
            className={singleLineClass(
              "flex flex-col items-center relative w-full pt-3 pb-4 h-full box-border overflow-hidden",
              "hover:before:bg-on-surface hover:before:opacity-[.18] hover:before:w-[200%]",
              "hover:before:h-[200%] hover:before:absolute hover:before:top-[-50%] hover:before:left-[-50%]",
              active === navigator.path
                ? "after:bg-secondary-container after:h-8 after:w-16 after:rounded-2xl after:absolute after:-z-10"
                : ""
            )}
          >
            <span className={`relative mt-[0.25rem] mb-2`}>
              {smallBadge === navigator.path && <SmallBadge></SmallBadge>}
              {largeBadge === navigator.path && (
                <LargeBadge errorNumber={100}></LargeBadge>
              )}
              <Icon
                name={navigator.icon}
                type="line"
                className={`w-6 h-6
              ${
                active === navigator.path
                  ? "on-secondary-container"
                  : "text-on-surface-variant"
              }`}
              ></Icon>
            </span>

            <label
              className={`label-medium ${
                active === navigator.path
                  ? "text-on-surface"
                  : "text-on-surface-variant"
              }`}
            >
              {navigator.name}
            </label>
          </div>
        );
      })}
    </div>
  );
};
