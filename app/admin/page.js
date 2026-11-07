"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useDelala } from "@/lib/context/DelalaContext";
import AdminLayout from "@/components/layout/AdminLayout";
import PageHeader from "@/components/common/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import CategoryChart from "@/components/dashboard/CategoryChart";
import SalesChart from "@/components/dashboard/SalesChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import RecentInquiries from "@/components/dashboard/RecentInquiries";
import Button from "@/components/ui/Button";
import {
  Building2,
  CheckCircle,
  Receipt,
  TrendingUp,
  DollarSign,
  PlusCircle,
  ShieldCheck,
  Calendar,
  Sparkles,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { t, formatPrice } = useLanguage();
  const { analytics, sales, inquiries, adminListings } = useDelala();

  if (!analytics) return null;

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <PageHeader
          title={t("adminDashboard")}
          subtitle="Real-time brokerage performance, private ledger profit metrics, and active listings overview."
          breadcrumbs={[{ label: "Admin Portal", href: "/admin" }, { label: "Overview" }]}
          action={
            <div className="flex items-center gap-2.5">
              <Link href="/admin/sales">
                <Button variant="outline" size="md" icon={Receipt}>
                  Record Sale
                </Button>
              </Link>
              <Link href="/admin/listings/new">
                <Button variant="primary" size="md" icon={PlusCircle}>
                  {t("adminAddNewListing")}
                </Button>
              </Link>
            </div>
          }
        />

        {/* 6 Core KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {/* 1. Total Listings */}
          <StatCard
            title={t("kpiTotalListings")}
            value={analytics.totalListings}
            comparisonText="in portfolio"
            changePercent="+12%"
            trend="up"
            icon={Building2}
            color="blue"
          />

          {/* 2. Active Listings */}
          <StatCard
            title={t("kpiActiveListings")}
            value={analytics.activeListings}
            comparisonText="on marketplace"
            changePercent="Active"
            trend="neutral"
            icon={CheckCircle}
            color="emerald"
          />

          {/* 3. Properties Sold */}
          <StatCard
            title={t("kpiSoldProperties")}
            value={analytics.soldListingsCount}
            comparisonText="closed transactions"
            changePercent="+25%"
            trend="up"
            icon={Receipt}
            color="amber"
          />

          {/* 4. Total Sales Revenue */}
          <StatCard
            title={t("kpiTotalRevenue")}
            value={formatPrice(analytics.totalRevenue)}
            comparisonText="total finalized"
            changePercent="+18.4%"
            trend="up"
            icon={TrendingUp}
            color="amber"
          />

          {/* 5. Total Net Profit (PRIVATE) */}
          <StatCard
            title={t("kpiTotalProfit")}
            value={formatPrice(analytics.totalProfit)}
            comparisonText="net broker income"
            changePercent="+22.1%"
            trend="up"
            icon={DollarSign}
            color="emerald"
            isPrivate
          />

          {/* 6. Monthly Revenue */}
          <StatCard
            title={t("kpiMonthlyRevenue")}
            value={formatPrice(analytics.monthlyRevenue)}
            comparisonText="current month"
            changePercent="+8.5%"
            trend="up"
            icon={Calendar}
            color="purple"
          />
        </div>

        {/* REVENUE CHARTS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Area Chart: Monthly & Yearly Revenue & Profit */}
          <div className="lg:col-span-8">
            <RevenueChart
              monthlyData={analytics.monthlyChartData}
              yearlyData={analytics.yearlyChartData}
              title={t("monthlyRevenueChart")}
            />
          </div>

          {/* Donut Chart: Sales by Category */}
          <div className="lg:col-span-4">
            <CategoryChart
              categoryData={analytics.categoryChartData}
              title={t("salesByCategory")}
            />
          </div>
        </div>

        {/* SECONDARY ANALYTICS & LEDGER ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Monthly Transaction Volume Bar Chart */}
          <div className="lg:col-span-5">
            <SalesChart
              data={analytics.monthlyChartData}
              title={t("monthlySalesCount")}
            />
          </div>

          {/* Recent Sales Transactions */}
          <div className="lg:col-span-7">
            <RecentTransactions sales={sales} />
          </div>
        </div>

        {/* RECENT INQUIRIES */}
        <div className="grid grid-cols-1 gap-6">
          <RecentInquiries inquiries={inquiries} />
        </div>
      </div>
    </AdminLayout>
  );
}

