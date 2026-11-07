"use client";

import React from "react";
import { Loader2 } from "lucide-react";

export default function Button({
  children,
  variant = "primary", // primary, secondary, outline, ghost, danger, success
  size = "md", // sm, md, lg
  isLoading = false,
  disabled = false,
  icon: Icon,
  iconPosition = "left",
  className = "",
  type = "button",
  onClick,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 shadow-sm";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-amber-600 hover:bg-amber-700 text-white focus:ring-amber-500 shadow-amber-600/20",
    secondary:
      "bg-slate-900 hover:bg-slate-800 text-white focus:ring-slate-700 shadow-slate-900/20",
    outline:
      "border border-slate-300 hover:bg-slate-100 text-slate-700 focus:ring-slate-400 bg-white shadow-none",
    ghost:
      "text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-300 shadow-none",
    danger:
      "bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500 shadow-rose-600/20",
    success:
      "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500 shadow-emerald-600/20",
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : Icon && iconPosition === "left" ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}

      <span>{children}</span>

      {!isLoading && Icon && iconPosition === "right" ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}
    </button>
  );
}

