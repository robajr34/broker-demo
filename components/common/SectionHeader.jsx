"use client";

import React from "react";

export default function SectionHeader({
  badge,
  title,
  subtitle,
  align = "center", // center, left
  className = "",
  action,
}) {
  const isCentered = align === "center";

  return (
    <div
      className={`flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12 ${
        isCentered ? "text-center md:text-center items-center" : "text-left items-start"
      } ${className}`}
    >
      <div className={`space-y-2.5 ${isCentered ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>
        {badge && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
            {badge}
          </span>
        )}

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          {title}
        </h2>

        {subtitle && (
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

