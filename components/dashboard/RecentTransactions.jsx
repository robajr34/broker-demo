"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/context/LanguageContext";
import Badge from "@/components/ui/Badge";
import { ArrowRight, Receipt, User, Calendar } from "lucide-react";

export default function RecentTransactions({ sales = [] }) {
  const { t, formatPrice } = useLanguage();

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            {t("recentSales")}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Latest finalized deals recorded in your sales ledger.
          </p>
        </div>

        <Link
          href="/admin/sales"
          className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 hover:underline"
        >
          <span>{t("viewAll")}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {sales.length === 0 ? (
        <p className="text-xs text-slate-400 py-6 text-center">
          No sales transactions recorded yet.
        </p>
      ) : (
        <div className="divide-y divide-slate-100">
          {sales.slice(0, 5).map((sale) => (
            <div
              key={sale.id}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:bg-slate-50/70 px-2 rounded-xl transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 line-clamp-1">
                    {sale.listingTitle}
                  </span>
                  <Badge variant="sold" size="sm">
                    {t("statusSold")}
                  </Badge>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3 text-slate-400" />
                    {sale.buyer?.name || "Direct Client"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {sale.saleDate}
                  </span>
                </div>
              </div>

              {/* Financial values */}
              <div className="text-left sm:text-right shrink-0">
                <span className="text-sm font-black text-slate-900 block">
                  {formatPrice(sale.actualSellingPrice)}
                </span>
                <span className="text-xs font-bold text-emerald-600">
                  +{formatPrice(sale.netProfit)} net profit
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

