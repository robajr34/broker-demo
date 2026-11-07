"use client";

import React from "react";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

export default function StatCard({
  title,
  value,
  comparisonText,
  changePercent,
  trend = "up", // up, down, neutral
  icon: Icon,
  color = "amber", // amber, emerald, blue, purple, rose
  isPrivate = false,
  className = "",
}) {
  const colorStyles = {
    amber: "bg-amber-50 text-amber-600 border-amber-200",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-200",
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    rose: "bg-rose-50 text-rose-600 border-rose-200",
  };

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {title}
            </span>
            {isPrivate && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-300">
                PRIVATE
              </span>
            )}
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
            {value}
          </h3>
        </div>

        {Icon && (
          <div
            className={`w-11 h-11 rounded-2xl border flex items-center justify-center shrink-0 ${
              colorStyles[color] || colorStyles.amber
            }`}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="pt-4 mt-3 border-t border-slate-100 flex items-center gap-2 text-xs">
        {trend === "up" ? (
          <span className="inline-flex items-center text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-md">
            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            {changePercent || "+14.2%"}
          </span>
        ) : trend === "down" ? (
          <span className="inline-flex items-center text-rose-600 font-bold bg-rose-50 px-1.5 py-0.5 rounded-md">
            <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
            {changePercent || "-4.5%"}
          </span>
        ) : (
          <span className="inline-flex items-center text-slate-500 font-semibold bg-slate-50 px-1.5 py-0.5 rounded-md">
            <Minus className="w-3.5 h-3.5 mr-0.5" />
            0%
          </span>
        )}

        <span className="text-slate-500 truncate">
          {comparisonText || "vs previous period"}
        </span>
      </div>
    </div>
  );
}

