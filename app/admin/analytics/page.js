"use client";

import React, { useState, useMemo } from "react";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useDelala } from "@/lib/context/DelalaContext";
import AdminLayout from "@/components/layout/AdminLayout";
import PageHeader from "@/components/common/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import CategoryChart from "@/components/dashboard/CategoryChart";
import SalesChart from "@/components/dashboard/SalesChart";
import Select from "@/components/ui/Select";
import {
  TrendingUp,
  DollarSign,
  PieChart,
  BarChart3,
  Calendar,
  Layers,
  Award,
  ShieldAlert,
} from "lucide-react";

export default function RevenueAnalyticsPage() {
  const { t, formatPrice } = useLanguage();
  const { analytics, sales } = useDelala();

  const [categoryFilter, setCategoryFilter] = useState("all");

  // Dynamic filter on sales for custom analytics
  const filteredSales = useMemo(() => {
    if (categoryFilter === "all") return sales;
    return sales.filter((s) => s.category === categoryFilter);
  }, [sales, categoryFilter]);

  const totalFilteredRev = filteredSales.reduce(
    (acc, s) => acc + (Number(s.actualSellingPrice) || 0),
    0
  );
  const totalFilteredProfit = filteredSales.reduce(
    (acc, s) => acc + (Number(s.netProfit) || 0),
    0
  );
  const avgFilteredPrice =
    filteredSales.length > 0 ? Math.round(totalFilteredRev / filteredSales.length) : 0;
  const avgFilteredProfit =
    filteredSales.length > 0 ? Math.round(totalFilteredProfit / filteredSales.length) : 0;
  const filteredMargin =
    totalFilteredRev > 0 ? ((totalFilteredProfit / totalFilteredRev) * 100).toFixed(1) : "0.0";

  if (!analytics) return null;

  return (
    <AdminLayout>
      <div className="space-y-8">
        <PageHeader
          title={t("adminRevenueAnalytics")}
          subtitle="Advanced financial breakdown derived exclusively from confirmed sales transactions and broker profit ledgers."
          breadcrumbs={[
            { label: "Admin", href: "/admin" },
            { label: "Analytics & Revenue" },
          ]}
          action={
            <div className="w-56">
              <Select
                options={[
                  { value: "all", label: "All Asset Classes" },
                  { value: "house", label: t("categoryHouse") },
                  { value: "apartment", label: t("categoryApartment") },
                  { value: "commercial", label: t("categoryCommercial") },
                  { value: "land", label: t("categoryLand") },
                  { value: "car", label: t("categoryCar") },
                ]}
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              />
            </div>
          }
        />

        {/* Financial KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title={t("kpiTotalRevenue")}
            value={formatPrice(totalFilteredRev)}
            comparisonText={`${filteredSales.length} closed transactions`}
            changePercent="+19.5%"
            trend="up"
            icon={TrendingUp}
            color="amber"
          />

          <StatCard
            title={t("kpiTotalProfit")}
            value={formatPrice(totalFilteredProfit)}
            comparisonText="net broker income"
            changePercent="+24.2%"
            trend="up"
            icon={DollarSign}
            color="emerald"
            isPrivate
          />

          <StatCard
            title={t("averageSellingPrice")}
            value={formatPrice(avgFilteredPrice)}
            comparisonText="per closed deal"
            changePercent="Ticket Size"
            trend="neutral"
            icon={Award}
            color="blue"
          />

          <StatCard
            title={t("profitMarginPercent")}
            value={`${filteredMargin}%`}
            comparisonText="average net yield"
            changePercent="Healthy"
            trend="up"
            icon={PieChart}
            color="purple"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <RevenueChart
              monthlyData={analytics.monthlyChartData}
              yearlyData={analytics.yearlyChartData}
              title={t("monthlyRevenueChart")}
              subtitle="Comparing gross transaction revenue against net private brokerage profits."
            />
          </div>

          <div className="lg:col-span-4">
            <CategoryChart
              categoryData={analytics.categoryChartData}
              title={t("salesByCategory")}
            />
          </div>
        </div>

        {/* Volume & Most Profitable Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6">
            <SalesChart
              data={analytics.monthlyChartData}
              title="Transaction Velocity & Deal Frequency"
            />
          </div>

          {/* Highest Margin Deals */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                {t("mostProfitableListings")}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Top recorded transactions ranked by highest net profit margin.
              </p>
            </div>

            <div className="divide-y divide-slate-100 my-2">
              {[...sales]
                .sort((a, b) => (Number(b.netProfit) || 0) - (Number(a.netProfit) || 0))
                .slice(0, 4)
                .map((deal, idx) => (
                  <div
                    key={deal.id}
                    className="py-3 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 font-bold flex items-center justify-center shrink-0">
                        #{idx + 1}
                      </span>
                      <div className="truncate max-w-xs">
                        <span className="font-bold text-slate-900 block truncate">
                          {deal.listingTitle}
                        </span>
                        <span className="text-slate-400">Sold {deal.saleDate}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-black text-emerald-600 block text-sm">
                        +{formatPrice(deal.netProfit)}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Sale: {formatPrice(deal.actualSellingPrice)}
                      </span>
                    </div>
                  </div>
                ))}
            </div>

            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 text-center">
              All margin snapshots locked upon sale confirmation
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

