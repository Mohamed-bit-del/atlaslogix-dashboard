import React from "react";
import type { InputProps } from "../../types";


const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
    return (
        <div className="mb-3 w-full">
            {label && <label className="block text-sm font-medium mb-1">{label}</label>}
            <input
                {...props}
                className={`w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder-slate-400 ${error ? "border-red-500" : ""
                    } ${className ? className : ""}`}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default Input;
