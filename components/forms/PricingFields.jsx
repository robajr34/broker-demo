"use client";

import React from "react";
import Input from "@/components/ui/Input";
import { useLanguage } from "@/lib/context/LanguageContext";
import { ShieldAlert, Calculator, DollarSign, TrendingUp } from "lucide-react";

export default function PricingFields({ formData, onChange }) {
  const { t, formatPrice } = useLanguage();

  const publicPrice = Number(formData.publicPrice) || 0;
  const acquisitionPrice = Number(formData.acquisitionPrice) || 0;
  const privateDiscount = Number(formData.privateDiscount) || 0;
  const additionalExpenses = Number(formData.additionalExpenses) || 0;

  // Estimated profit = Public selling price - Acquisition price - Discount - Expenses
  const estimatedProfit = publicPrice - acquisitionPrice - privateDiscount - additionalExpenses;
  const profitMargin = publicPrice > 0 ? ((estimatedProfit / publicPrice) * 100).toFixed(1) : "0.0";

  const handleChange = (field, value) => {
    onChange({
      ...formData,
      [field]: value === "" ? "" : Number(value),
    });
  };

  return (
    <div className="space-y-6">
      {/* Confidential Financial Notice */}
      <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-300 text-xs text-amber-900 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold uppercase tracking-wider block">
            {t("privateNote")}
          </span>
          <p className="mt-0.5 text-amber-800 leading-relaxed">
            Acquisition costs, negotiated broker discounts, and legal expenses are strictly confidential and will never be rendered to public marketplace visitors.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Public Asking Price */}
        <div>
          <Input
            type="number"
            label={`${t("publicSellingPrice")} (ETB)`}
            required
            placeholder="e.g. 25000000"
            value={formData.publicPrice || ""}
            onChange={(e) => handleChange("publicPrice", e.target.value)}
            helperText="The visible asking price displayed on the public card."
          />
        </div>

        {/* Acquisition Cost (PRIVATE) */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
              {t("acquisitionCost")} (ETB) *
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-800">
              STRICTLY PRIVATE
            </span>
          </div>
          <Input
            type="number"
            required
            placeholder="e.g. 21000000"
            value={formData.acquisitionPrice || ""}
            onChange={(e) => handleChange("acquisitionPrice", e.target.value)}
            helperText="Internal baseline cost or seller net agreement."
          />
        </div>

        {/* Private Negotiated Discount */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
              {t("privateDiscount")} (ETB)
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
              PRIVATE
            </span>
          </div>
          <Input
            type="number"
            placeholder="e.g. 500000"
            value={formData.privateDiscount || ""}
            onChange={(e) => handleChange("privateDiscount", e.target.value)}
            helperText="Expected room for negotiation or buyer discount."
          />
        </div>

        {/* Additional Expenses */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
              {t("additionalExpenses")} (ETB)
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
              PRIVATE
            </span>
          </div>
          <Input
            type="number"
            placeholder="e.g. 200000"
            value={formData.additionalExpenses || ""}
            onChange={(e) => handleChange("additionalExpenses", e.target.value)}
            helperText="Carta transfer tax, agent commission, or legal fees."
          />
        </div>
      </div>

      {/* Live Financial Margin Preview for Admin */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-md space-y-3">
        <div className="flex items-center justify-between border-b border-slate-700/80 pb-2">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              {t("estimatedProfit")}
            </span>
          </div>
          <span className="text-xs font-semibold text-amber-400">
            Margin: {profitMargin}%
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Public Price</span>
            <span className="font-bold text-white text-sm">{formatPrice(publicPrice)}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Acquisition Cost</span>
            <span className="font-bold text-slate-300 text-sm">{formatPrice(acquisitionPrice)}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Deductions (Dis + Exp)</span>
            <span className="font-bold text-slate-300 text-sm">
              {formatPrice(privateDiscount + additionalExpenses)}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Projected Net Profit</span>
            <span
              className={`font-black text-sm ${
                estimatedProfit >= 0 ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {formatPrice(estimatedProfit)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

