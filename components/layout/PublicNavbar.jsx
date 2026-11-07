"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useDelala } from "@/lib/context/DelalaContext";
import Button from "@/components/ui/Button";
import {
  Phone,
  Menu,
  X,
  Globe,
  Building2,
  Car,
  Home,
  Info,
  Mail,
  ShieldCheck,
  LayoutDashboard,
} from "lucide-react";

export default function PublicNavbar() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const { settings } = useDelala();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t("home"), icon: Home },
    { href: "/properties", label: t("properties"), icon: Building2 },
    { href: "/cars", label: t("cars"), icon: Car },
    { href: "/about", label: t("about"), icon: Info },
    { href: "/contact", label: t("contact"), icon: Mail },
  ];

  const brokerPhone = settings?.phone || "+251911234567";

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-500 flex items-center justify-center text-white shadow-md shadow-amber-600/25 group-hover:scale-105 transition-transform duration-200">
              <Building2 className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-amber-700 transition-colors">
                {language === "am" ? "ኢትዮ ደላላ" : "EthioDelala"}
              </span>
              <span className="text-[11px] font-semibold text-amber-700 tracking-wider uppercase">
                {t("brandTagline")}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-amber-700 bg-amber-50/80 font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Switcher */}
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

            {/* Admin Portal Shortcut */}
            <Link
              href="/admin"
              className="text-xs font-semibold text-slate-600 hover:text-amber-700 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>{t("adminPortal")}</span>
            </Link>

            {/* Direct Call Button */}
            <a href={`tel:${brokerPhone.replace(/\s+/g, "")}`}>
              <Button
                variant="primary"
                size="md"
                icon={Phone}
                iconPosition="left"
                className="shadow-md shadow-amber-600/20"
              >
                {t("callNow")}
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Language Switcher for mobile top */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`px-2 py-0.5 text-xs font-bold rounded-md transition-all ${
                  language === "en" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage("am")}
                className={`px-2 py-0.5 text-xs font-bold rounded-md transition-all ${
                  language === "am" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"
                }`}
              >
                አማ
              </button>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-fade-in">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                    isActive
                      ? "bg-amber-50 text-amber-800 font-bold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-5 h-5 text-amber-600" />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50"
            >
              <LayoutDashboard className="w-5 h-5 text-slate-600" />
              <span>{t("adminPortal")}</span>
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <a
              href={`tel:${brokerPhone.replace(/\s+/g, "")}`}
              className="w-full"
            >
              <Button
                variant="primary"
                size="lg"
                icon={Phone}
                className="w-full"
              >
                {t("callNow")} ({brokerPhone})
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

