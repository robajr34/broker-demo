"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useDelala } from "@/lib/context/DelalaContext";
import {
  LayoutDashboard,
  Building,
  PlusCircle,
  Receipt,
  TrendingUp,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";

export default function AdminSidebar({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) {
  const pathname = usePathname();
  const { language, t } = useLanguage();
  const { settings, inquiries } = useDelala();

  const newInquiriesCount = inquiries.filter((i) => i.status === "new").length;

  const navItems = [
    {
      href: "/admin",
      label: t("adminOverview"),
      icon: LayoutDashboard,
      exact: true,
    },
    {
      href: "/admin/listings",
      label: t("adminAllListings"),
      icon: Building,
      exact: true,
    },
    {
      href: "/admin/listings/new",
      label: t("adminAddNewListing"),
      icon: PlusCircle,
      exact: true,
    },
    {
      href: "/admin/sales",
      label: t("adminSales"),
      icon: Receipt,
      exact: false,
    },
    {
      href: "/admin/analytics",
      label: t("adminRevenueAnalytics"),
      icon: TrendingUp,
      exact: false,
    },
    {
      href: "/admin/inquiries",
      label: t("adminInquiries"),
      icon: MessageSquare,
      badge: newInquiriesCount > 0 ? newInquiriesCount : null,
      exact: false,
    },
    {
      href: "/admin/settings",
      label: t("adminSettings"),
      icon: Settings,
      exact: false,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col bg-slate-900 text-slate-300 border-r border-slate-800 transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        } ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand header */}
        <div className="h-20 flex items-center justify-between px-5 border-b border-slate-800/80">
          <Link href="/admin" className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shrink-0 shadow-md shadow-amber-500/20">
              ED
            </div>
            {!isCollapsed && (
              <div className="flex flex-col truncate">
                <span className="text-sm font-bold text-white truncate">
                  {language === "am" ? "ኢትዮ ደላላ" : "EthioDelala"}
                </span>
                <span className="text-[10px] uppercase font-semibold text-amber-400 tracking-wider">
                  {t("adminDashboard")}
                </span>
              </div>
            )}
          </Link>

          {/* Collapse toggle (desktop only) */}
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Private Confidential Banner */}
        {!isCollapsed && (
          <div className="px-4 py-2 bg-amber-950/40 border-b border-amber-900/50 text-[10px] text-amber-300 flex items-center gap-2">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="leading-tight font-medium">
              Confidential Broker Financial Space
            </span>
          </div>
        )}

        {/* Navigation items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/10"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/80"
                } ${isCollapsed ? "justify-center" : ""}`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 ${
                    isActive ? "text-slate-950" : "text-slate-400"
                  }`}
                />

                {!isCollapsed && (
                  <span className="truncate flex-1">{item.label}</span>
                )}

                {!isCollapsed && item.badge && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-rose-500 text-white shrink-0">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Link to Public Website */}
        <div className="p-4 border-t border-slate-800">
          <Link
            href="/"
            target="_blank"
            className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ${
              isCollapsed ? "justify-center" : ""
            }`}
            title="Open Marketplace in new tab"
          >
            <ExternalLink className="w-4 h-4 text-amber-400 shrink-0" />
            {!isCollapsed && <span>{t("backToWebsite")}</span>}
          </Link>
        </div>
      </aside>
    </>
  );
}

