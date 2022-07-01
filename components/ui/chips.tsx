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
  assist: `border border-outline bg-surface text-on-surface label-large`,
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
        "border border-outline bg-surface text-on-surface label-large",
        className
      )}
    >
      {icon && <Icon name={icon} className="text-primary"></Icon>}
      {children}
    </div>
  );
};
