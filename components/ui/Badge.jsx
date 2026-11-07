"use client";

import React from "react";

export default function Badge({
  children,
  variant = "default", // available, new, featured, reserved, sold, rented, draft, success, danger, warning, info
  size = "md", // sm, md, lg
  className = "",
  showDot = false,
}) {
  const sizeStyles = {
    sm: "px-2 py-0.5 text-[11px] gap-1 font-medium",
    md: "px-2.5 py-1 text-xs gap-1.5 font-medium",
    lg: "px-3 py-1.5 text-sm gap-2 font-semibold",
  };

  const variantStyles = {
    default: "bg-slate-100 text-slate-800 border-slate-200",
    available: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    new: "bg-sky-50 text-sky-700 border-sky-200/80",
    featured: "bg-amber-50 text-amber-800 border-amber-300/80 shadow-sm shadow-amber-500/10",
    reserved: "bg-purple-50 text-purple-700 border-purple-200/80",
    sold: "bg-rose-50 text-rose-700 border-rose-300 font-semibold",
    rented: "bg-cyan-50 text-cyan-700 border-cyan-200/80",
    draft: "bg-slate-100 text-slate-600 border-slate-200",
    archived: "bg-zinc-100 text-zinc-500 border-zinc-200",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    danger: "bg-rose-50 text-rose-700 border-rose-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    info: "bg-blue-50 text-blue-700 border-blue-200",
  };

  const dotColors = {
    default: "bg-slate-500",
    available: "bg-emerald-500",
    new: "bg-sky-500",
    featured: "bg-amber-500",
    reserved: "bg-purple-500",
    sold: "bg-rose-500",
    rented: "bg-cyan-500",
    draft: "bg-slate-400",
    archived: "bg-zinc-400",
    success: "bg-emerald-500",
    danger: "bg-rose-500",
    warning: "bg-amber-500",
    info: "bg-blue-500",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border transition-colors ${
        sizeStyles[size]
      } ${variantStyles[variant] || variantStyles.default} ${className}`}
    >
      {showDot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
            dotColors[variant] || dotColors.default
          }`}
        />
      )}
      <span>{children}</span>
    </span>
  );
}

