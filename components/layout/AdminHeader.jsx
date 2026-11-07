"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useDelala } from "@/lib/context/DelalaContext";
import {
  Menu,
  Search,
  Bell,
  Calendar,
  Globe,
  User,
  Shield,
  CheckCircle,
} from "lucide-react";
import Dropdown from "@/components/ui/Dropdown";

export default function AdminHeader({ isCollapsed, onMobileMenuToggle }) {
  const { language, setLanguage, t } = useLanguage();
  const { settings, inquiries, sales } = useDelala();
  const [showNotifications, setShowNotifications] = useState(false);

  const brokerName = language === "am" ? (settings?.brokerNameAm || settings?.brokerName) : settings?.brokerName;
  const recentInquiries = inquiries.slice(0, 3);

  return (
    <header className="sticky top-0 z-30 h-20 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={onMobileMenuToggle}
          className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search */}
        <div className="relative hidden md:block w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Date Selector / Current Date Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/80 border border-slate-200 text-xs font-semibold text-slate-600">
          <Calendar className="w-3.5 h-3.5 text-amber-600" />
          <span>{new Date().toLocaleDateString(language === "am" ? "am-ET" : "en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
        </div>

        {/* Language switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={() => setLanguage("en")}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
              language === "en"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLanguage("am")}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
              language === "am"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            አማ
          </button>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            {inquiries.some((i) => i.status === "new") && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50">
              <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Notifications
                </span>
                <span className="text-[11px] text-amber-600 font-semibold">
                  {inquiries.length} Inquiries
                </span>
              </div>

              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {recentInquiries.map((inq) => (
                  <Link
                    key={inq.id}
                    href="/admin/inquiries"
                    onClick={() => setShowNotifications(false)}
                    className="block px-4 py-3 hover:bg-slate-50 transition-colors"
                  >
                    <p className="text-xs font-bold text-slate-800">
                      New Inquiry from {inq.customerName}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {inq.message}
                    </p>
                  </Link>
                ))}
              </div>

              <div className="px-4 pt-2 border-t border-slate-100 text-center">
                <Link
                  href="/admin/inquiries"
                  onClick={() => setShowNotifications(false)}
                  className="text-xs font-semibold text-amber-600 hover:text-amber-700"
                >
                  View All Inquiries &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile */}
        <Link
          href="/admin/settings"
          className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-slate-200 hover:opacity-85 transition-opacity"
        >
          <div className="w-9 h-9 rounded-full bg-slate-900 text-amber-400 font-bold flex items-center justify-center text-sm shadow-sm ring-2 ring-amber-500/20">
            {brokerName ? brokerName.charAt(0) : "A"}
          </div>
          <div className="hidden xl:flex flex-col text-left">
            <span className="text-xs font-bold text-slate-900 leading-tight">
              {brokerName || "Abebe Tadesse"}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              Licensed Delala
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}

