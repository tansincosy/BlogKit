import { singleLineClass } from "@/utils";
import React from "react";
import { Icon } from "./icon";

type ChipType = "assist" | "filter" | "input" | "suggestion";

interface ChipsProps {
  type: ChipType;
  className?: string;
  icon?: string;
  children?: React.ReactNode;
}

const chipsClasses: Record<ChipType, string> = {
  assist: `hover:bg-on-surface`,
  filter: ``,
  input: ``,
  suggestion: ``,
};

export const Chips: React.FC<ChipsProps> = ({
  type = "assist",
  children,
  className = "",
  icon,
}) => {
  return (
    <div
      className={singleLineClass(
        chipsClasses[type],
        "border border-outline bg-surface text-on-surface label-large cursor-pointer z-10 box-border px-4 h-8 rounded-md inline-flex items-center",
        className
      )}
    >
      {icon && (
        <Icon
          name={icon}
          className="text-primary text-[1.125rem] mr-2 -ml-2"
        ></Icon>
      )}
      {children}
    </div>
  );
};
