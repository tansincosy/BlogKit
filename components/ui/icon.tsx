import React from "react";

type IconProps = {
  name: string;
  type?: "fill" | "line";
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

export const Icon: React.VFC<IconProps> = ({
  name,
  type,
  className,
  onClick,
}) => {
  return (
    <i
      className={
        className
          ? `text-center ri-${name}-${type} ${className}`
          : `text-center ri-${name}-${type}`
      }
      onClick={onClick}
      aria-hidden="true"
    />
  );
};

Icon.defaultProps = {
  className: "",
  type: "fill",
};
