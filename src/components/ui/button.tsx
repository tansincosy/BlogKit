import { singleLineClass } from "@/utils";
import React, { forwardRef } from "react";
import { Icon } from "./icon";

type ButtonType = "elevated" | "filled" | "outlined" | "text" | "tonal";
interface ButtonProps {
  disabled?: boolean;
  type?: ButtonType;
  icon?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  children?: React.ReactNode;
  nativeType?: "button" | "submit" | "reset";
}

const buttonStyleMap = {
  elevated: `bg-surface text-primary label-large shadow-sm
            hover:after:w-[200%] hover:after:h-[200%] hover:after:bg-primary hover:after:opacity-[.08] hover:after:absolute hover:after:top-[-50%] hover:after:left-[-50%] hover:shadow-md
              active:after:w-[200%] active:after:h-[200%] active:after:bg-primary active:after:opacity-[.12] active:after:absolute active:after:top-[-50%] active:after:left-[-50%]
              active:shadow-md`,
  filled: `bg-primary text-on-primary label-large
          hover:after:w-[200%] hover:after:h-[200%] hover:after:bg-on-primary hover:after:opacity-[.08] hover:after:absolute hover:after:top-[-50%] hover:after:left-[-50%] hover:shadow-md
          active:after:w-[200%] active:after:h-[200%] active:after:bg-on-primary active:after:opacity-[.12] active:after:absolute active:after:top-[-50%] active:after:left-[-50%]
          `,
  tonal: `bg-secondary-container text-on-secondary-container label-large 
          hover:after:w-[200%] hover:after:h-[200%] hover:after:bg-on-secondary-container hover:after:opacity-[.08] hover:after:absolute hover:after:top-[-50%] hover:after:left-[-50%] hover:shadow-md
          active:after:w-[200%] active:after:h-[200%] active:after:bg-on-secondary-container active:after:opacity-[.12] active:after:absolute active:after:top-[-50%] active:after:left-[-50%]`,
  outlined: `bg-surface text-primary label-large border border-outline border-solid border-primary
  hover:after:w-[200%] hover:after:h-[200%] hover:after:bg-primary hover:after:opacity-[.08] hover:after:absolute hover:after:top-[-50%] hover:after:left-[-50%]
  active:after:w-[200%] active:after:h-[200%] active:after:bg-primary active:after:opacity-[.12] active:after:absolute active:after:top-[-50%] active:after:left-[-50%]
    `,
  text: `text-primary label-large 
  hover:after:w-[200%] hover:after:h-[200%] hover:after:bg-primary hover:after:opacity-[.08] hover:after:absolute hover:after:top-[-50%] hover:after:left-[-50%]
  active:after:w-[200%] active:after:h-[200%] active:after:bg-primary active:after:opacity-[.12] active:after:absolute active:after:top-[-50%] active:after:left-[-50%]
  
  `,
};

const disableClass = (disabled?: boolean, type?: ButtonType): string => {
  if (disabled) {
    if (type === "outlined") {
      return `cursor-not-allowed bg-transparent disabled-text disable-border
      after:w-[200%] after:h-[200%] after:bg-on-surface after:opacity-0 after:absolute after:top-[-50%] after:left-[-50%]
      hover:after:w-[200%] hover:after:h-[200%] hover:after:bg-on-surface hover:after:opacity-0 hover:after:absolute hover:after:top-[-50%] hover:after:left-[-50%] hover:shadow-none
      active:after:w-[200%] active:after:h-[200%] active:after:bg-on-surface active:after:opacity-0 active:after:absolute active:after:top-[-50%] active:after:left-[-50%]`;
    } else if (type === "text") {
      return `cursor-not-allowed bg-transparent disabled-text 
      after:w-[200%] after:h-[200%] after:bg-on-surface after:opacity-[.12] after:absolute after:top-[-50%] after:left-[-50%]
      hover:after:w-[200%] hover:after:h-[200%] hover:after:bg-on-surface hover:after:opacity-[.12] hover:after:absolute hover:after:top-[-50%] hover:after:left-[-50%] hover:shadow-none
      active:after:w-[200%] active:after:h-[200%] active:after:bg-on-surface active:after:opacity-[.12] active:after:absolute active:after:top-[-50%] active:after:left-[-50%]
      `;
    } else {
      return `cursor-not-allowed bg-transparent disabled-text
      after:w-[200%] after:h-[200%] after:bg-on-surface after:opacity-0 after:absolute after:top-[-50%] after:left-[-50%]
      hover:after:w-[200%] hover:after:h-[200%] hover:after:bg-on-surface hover:after:opacity-0 hover:after:absolute hover:after:top-[-50%] hover:after:left-[-50%] hover:shadow-none
      active:after:w-[200%] active:after:h-[200%] active:after:bg-on-surface active:after:opacity-0 active:after:absolute active:after:top-[-50%] active:after:left-[-50%]
      `;
    }
  }
  return "";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      icon,
      children,
      type = "elevated",
      onClick,
      disabled,
      className = "",
      nativeType = "button",
    },
    ref
  ) => {
    return (
      <button
        type={nativeType}
        onClick={onClick}
        className={singleLineClass(
          icon ? "pl-4 pr-6" : "pl-6 pr-6",
          !children ? "pl-2.5 pr-2.5" : "",
          `inline-flex justify-center items-center relative overflow-hidden cursor-pointer leading-none appearance-none box-border outline-none m-0 rounded-full h-10
       ${disableClass(disabled, type)} ${buttonStyleMap[type]}
      `,
          className
        )}
      >
        {icon && (
          <span className="mx-1 text-[1.125rem] flex w-[1.125rem] h-[1.125rem]">
            <Icon name={icon}></Icon>
          </span>
        )}
        {children && (
          <span className={singleLineClass(!icon ? "" : "ml-1")}>
            {children}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
