import React from "react";
import type { ButtonProps } from "../../types";


const Button: React.FC<ButtonProps> = ({ variant = "primary", loading, children, className, ...props }) => {
    const baseClass = "w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
    const secondaryClass = "w-full py-2.5 px-4 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2";

    return (
        <button
            {...props}
            className={`${variant === "primary" ? baseClass : secondaryClass} ${className || ""}`}
            disabled={props.disabled || loading}
        >
            {loading ? "Loading..." : children}
        </button>
    );
};

export default Button;
