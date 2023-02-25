import React, { MouseEventHandler } from "react";
import { Icon } from "../Icon/index";

const Button: React.FC<{
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string;
  type?: string;
  label?: string;
  enableIcon: boolean;
}> = ({ onClick, className, type = "default", label = "", enableIcon = false }) => {
  return (
    <button
      onClick={onClick}
      id="edit"
      className={`${className} ${
        enableIcon ? "gap-4" : "gap-0"
      } flex flex-row justify-between  p-2 items-center`}>
      {enableIcon ? <div className={`w-6 h-6`}>{Icon[type]}</div> : null}
      {label !== "" ? <label htmlFor="edit">{label}</label> : null}
    </button>
  );
};

export default Button;
