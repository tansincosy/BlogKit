import { singleLineClass } from "@/utils";
import React from "react";
type CardType = "elevated" | "filled" | "outlined";
interface CardProps {
  type?: CardType;
  className?: string;
  children?: React.ReactNode;
}

const cardClasses: Record<CardType, string> = {
  elevated: `bg-surface shadow-md hover:after:w-[200%] hover:after:h-[200%] hover:after:bg-primary hover:after:opacity-[.08]
  hover:after:absolute hover:after:-z-10 hover:after:top-[-50%] hover:after:left-[-50%] hover:shadow-md
  active:after:w-[200%] active:after:h-[200%] active:after:bg-primary active:after:opacity-[.12] active:after:absolute active:after:top-[-50%] active:after:left-[-50%]
  active:shadow-md
  
  `,
  filled: `bg-surface-variant 
  hover:after:w-[200%] hover:after:h-[200%] hover:after:bg-on-primary hover:after:opacity-[.08] hover:after:absolute hover:after:-z-10 hover:after:top-[-50%] hover:after:left-[-50%] hover:shadow-md
          active:after:w-[200%] active:after:h-[200%] active:after:bg-on-primary active:after:opacity-[.12] active:after:absolute active:after:top-[-50%] active:after:left-[-50%]
  
  `,
  outlined: `
  bg-surface text-primary label-large border border-outline border-solid border-primary
  hover:after:w-[200%] hover:after:h-[200%] hover:after:bg-primary hover:after:opacity-[.08] hover:after:absolute hover:after:-z-10 hover:after:top-[-50%] hover:after:left-[-50%]
  active:after:w-[200%] active:after:h-[200%] active:after:bg-primary active:after:opacity-[.12] active:after:absolute active:after:top-[-50%] active:after:left-[-50%]
  
  `,
};

export const Card: React.FC<CardProps> = ({
  type = "elevated",
  children,
  className = "",
}) => {
  return (
    <div
      className={singleLineClass(
        cardClasses[type],
        "overflow-hidden shadow-lg relative box-border rounded-xl",
        className
      )}
    >
      {children}
    </div>
  );
};
