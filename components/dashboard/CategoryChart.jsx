"use client";

import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { useLanguage } from "@/lib/context/LanguageContext";

export default function CategoryChart({
  categoryData = [],
  title,
  subtitle,
}) {
  const { t, formatPrice } = useLanguage();

  const filteredData = categoryData.filter((d) => d.value > 0);
  const totalValue = filteredData.reduce((acc, curr) => acc + curr.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percent = totalValue > 0 ? ((data.value / totalValue) * 100).toFixed(1) : 0;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1">
          <p className="font-bold text-amber-400">{data.name}</p>
          <p className="text-slate-300 font-semibold">{formatPrice(data.value)}</p>
          <p className="text-slate-400 text-[10px]">{percent}% of Total Sales</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      <div>
        <h3 className="text-base font-bold text-slate-900 tracking-tight">
          {title || t("salesByCategory")}
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          {subtitle || "Revenue distribution across property & automotive asset classes."}
        </p>
      </div>

      <div className="w-full h-64 my-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={filteredData.length > 0 ? filteredData : [{ name: "No Sales", value: 1, color: "#cbd5e1" }]}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {filteredData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || "#d97706"} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend Grid */}
      <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
        {filteredData.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 truncate">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-slate-600 truncate font-medium">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

