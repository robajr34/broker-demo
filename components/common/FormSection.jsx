"use client";

import React from "react";

export default function FormSection({
  title,
  subtitle,
  badge,
  children,
  className = "",
  highlight = false,
}) {
  return (
    <div
      className={`rounded-2xl border p-6 sm:p-8 space-y-6 transition-all ${
        highlight
          ? "bg-amber-50/40 border-amber-300/80 shadow-sm"
          : "bg-white border-slate-200/90 shadow-sm"
      } ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              {title}
            </h3>
            {badge && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800 border border-amber-300">
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-4">{children}</div>
    </div>
  );
}

