"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { useLanguage } from "@/lib/context/LanguageContext";
import { ShieldAlert } from "lucide-react";

export default function RevenueChart({
  monthlyData = [],
  yearlyData = [],
  title,
  subtitle,
}) {
  const { t, formatPrice } = useLanguage();
  const [timeframe, setTimeframe] = useState("monthly"); // 'monthly' | 'yearly'

  const activeData = timeframe === "monthly" ? monthlyData : yearlyData;
  const xDataKey = timeframe === "monthly" ? "month" : "year";

  const formatYAxis = (tickItem) => {
    if (tickItem >= 1000000) {
      return `${(tickItem / 1000000).toFixed(1)}M`;
    }
    if (tickItem >= 1000) {
      return `${(tickItem / 1000).toFixed(0)}k`;
    }
    return tickItem;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1.5 min-w-[200px]">
          <p className="font-bold text-slate-300 border-b border-slate-800 pb-1">
            {timeframe === "monthly" ? `Month: ${label}` : `Year: ${label}`}
          </p>
          <div className="flex items-center justify-between text-amber-400">
            <span>Closed Revenue:</span>
            <span className="font-bold">{formatPrice(payload[0]?.value)}</span>
          </div>
          {payload[1] && (
            <div className="flex items-center justify-between text-emerald-400">
              <span>Net Profit (Private):</span>
              <span className="font-bold">{formatPrice(payload[1]?.value)}</span>
            </div>
          )}
          {payload[0]?.payload?.transactions !== undefined && (
            <div className="flex items-center justify-between text-slate-400 pt-1 border-t border-slate-800 text-[10px]">
              <span>Closed Transactions:</span>
              <span className="font-bold text-white">
                {payload[0].payload.transactions}
              </span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              {title || t("monthlyRevenueChart")}
            </h3>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
              Verified Sales Ledger
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {subtitle || "Cumulative revenue and broker profit generated from recorded transactions."}
          </p>
        </div>

        {/* Timeframe Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setTimeframe("monthly")}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              timeframe === "monthly"
                ? "bg-white text-slate-900 shadow-xs font-bold"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {t("timeframeMonthly")}
          </button>
          <button
            type="button"
            onClick={() => setTimeframe("yearly")}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              timeframe === "yearly"
                ? "bg-white text-slate-900 shadow-xs font-bold"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {t("timeframeYearly")}
          </button>
        </div>
      </div>

      {/* Chart Render Area */}
      <div className="w-full h-72 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={activeData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d97706" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#d97706" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#059669" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey={xDataKey}
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatYAxis}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: 15, fontSize: 12 }}
              formatter={(value) => (
                <span className="text-slate-700 font-medium">
                  {value === "revenue" ? "Actual Revenue (ETB)" : "Net Profit (ETB)"}
                </span>
              )}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              name="revenue"
              stroke="#d97706"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="profit"
              name="profit"
              stroke="#059669"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorProfit)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5 text-amber-700 font-medium">
          <ShieldAlert className="w-3.5 h-3.5" />
          Profit calculations exclude broker discounts and deed expenses
        </span>
        <span>Currency: ETB</span>
      </div>
    </div>
  );
}

