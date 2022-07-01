import { singleLineClass } from "@/utils";
import React from "react";
import { Icon } from "./icon";
interface ButtonProps {
  icon: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  size?: "large" | "small" | "medium";
  color?: "surface" | "secondary" | "tertiary";
  className?: string;
}

const colorCombination: any = {
  surface: "bg-surface text-primary",
  secondary: "bg-secondary-container text-on-secondary-container",
  tertiary: "bg-tertiary text-on-tertiary-container",
};

const colorStateCombination: any = {
  surface: "bg-primary",
  secondary: "bg-on-secondary-container",
  tertiary: "bg-on-tertiary-container",
};

const sizeCombination: any = {
  medium: "w-14 h-14 rounded-2xl text-[1.5rem]",
  small: "w-10 h-10 rounded-xl text-[1.5rem]",
  large: "w-24 h-24 rounded-[1.75rem] text-[2.25rem]",
};
export const Fab: React.FC<ButtonProps> = ({
  icon,
  color = "surface",
  size = "medium",
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={singleLineClass(
        `${sizeCombination[size]} ${colorCombination[color]} 
      inline-flex justify-center items-center overflow-hidden cursor-pointer leading-none appearance-none box-border outline-none m-0
      hover:after:w-[200%] hover:after:h-[200%] hover:after:${colorStateCombination[color]} hover:after:opacity-[0.08] hover:after:absolute hover:after:top-[-50%] hover:after:left-[-50%] hover:shadow-lg
      active:after:w-[200%] active:after:h-[200%] active:after:${colorStateCombination[color]} active:after:opacity-[0.12] active:after:absolute active:after:top-[-50%] active:after:left-[-50%] active:shadow-lg
      `,
        className
      )}
    >
      <Icon name={icon} className=""></Icon>
    </button>
  );
};
