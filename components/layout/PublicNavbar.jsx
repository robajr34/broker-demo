"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useDelala } from "@/lib/context/DelalaContext";
import Button from "@/components/ui/Button";
import {
  Phone,
  Menu,
  X,
  Building2,
  Car,
  Home,
  Mail,
  ShieldCheck,
  LayoutDashboard,
  PackageCheck,
  Factory,
  Store,
  ArrowRight,
} from "lucide-react";

function CategoryPillsBar({ categoryNavItems, t }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategoryParam = searchParams ? searchParams.get("category") : null;

  return (
    <div className="flex items-center justify-between h-13 gap-2">
      {/* Category Pills List */}
      <div className="flex items-center gap-1.5 xl:gap-2 overflow-x-auto py-1 scrollbar-none">
        {categoryNavItems.map((item) => {
          const Icon = item.icon;
          const isSelected =
            pathname === "/listings" && activeCategoryParam === item.categoryId;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative flex items-center gap-2 px-3.5 xl:px-4 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                isSelected
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/90"
              }`}
            >
              <Icon
                className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                  isSelected ? "text-slate-950 stroke-[2.2]" : "text-amber-400"
                }`}
              />
              <span>{item.label}</span>

              {/* Listing Count Pill */}
              {item.count > 0 && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md leading-none ${
                    isSelected
                      ? "bg-slate-950/20 text-slate-950"
                      : "bg-slate-800 text-amber-300 border border-slate-700/60"
                  }`}
                >
                  {item.count}
                </span>
              )}

              {/* Active Bottom Glow Indicator */}
              {isSelected && (
                <span className="absolute -bottom-[1px] left-3 right-3 h-0.5 bg-amber-400 rounded-full" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Right Quick Link on Category Bar */}
      <div className="hidden xl:flex items-center gap-3 shrink-0 pl-4 border-l border-slate-800">
        <Link
          href="/listings"
          className="flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap"
        >
          <span>{t("viewAll")}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

function CategoryPillsFallback({ categoryNavItems, t }) {
  return (
    <div className="flex items-center justify-between h-13 gap-2">
      <div className="flex items-center gap-1.5 xl:gap-2 overflow-x-auto py-1 scrollbar-none">
        {categoryNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 px-3.5 xl:px-4 py-2 rounded-xl text-xs xl:text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800/90 whitespace-nowrap"
            >
              <Icon className="w-4 h-4 text-amber-400" />
              <span>{item.label}</span>
              {item.count > 0 && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md leading-none bg-slate-800 text-amber-300 border border-slate-700/60">
                  {item.count}
                </span>
              )}
            </Link>
          );
        })}
      </div>
      <div className="hidden xl:flex items-center gap-3 shrink-0 pl-4 border-l border-slate-800">
        <Link
          href="/listings"
          className="flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap"
        >
          <span>{t("viewAll")}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

export default function PublicNavbar() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const { settings, listings } = useDelala();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Primary category navigation items for the sub-navbar bar
  const categoryNavItems = [
    {
      href: "/listings?category=import-materials",
      categoryId: "import-materials",
      label: t("categoryImportMaterials"),
      icon: PackageCheck,
      count: listings?.filter((l) => l.category === "import-materials").length || 0,
    },
    {
      href: "/listings?category=factories",
      categoryId: "factories",
      label: t("categoryFactories"),
      icon: Factory,
      count: listings?.filter((l) => l.category === "factories").length || 0,
    },
    {
      href: "/listings?category=shops-for-rent",
      categoryId: "shops-for-rent",
      label: t("categoryShopsForRent"),
      icon: Store,
      count: listings?.filter((l) => l.category === "shops-for-rent").length || 0,
    },
    {
      href: "/listings?category=houses-for-rent",
      categoryId: "houses-for-rent",
      label: t("categoryHousesForRent"),
      icon: Home,
      count: listings?.filter((l) => l.category === "houses-for-rent").length || 0,
    },
    {
      href: "/listings?category=properties",
      categoryId: "properties",
      label: t("categoryProperties"),
      icon: Building2,
      count:
        listings?.filter(
          (l) =>
            l.category === "properties" ||
            l.category === "house" ||
            l.category === "apartment" ||
            l.category === "land"
        ).length || 0,
    },
    {
      href: "/listings?category=vehicles",
      categoryId: "vehicles",
      label: t("categoryVehicles"),
      icon: Car,
      count:
        listings?.filter((l) => l.category === "vehicles" || l.category === "car").length || 0,
    },
  ];

  // Mobile nav links (combines categories + general pages)
  const mobileNavLinks = [
    { href: "/", label: t("home"), icon: Home },
    ...categoryNavItems.map((item) => ({
      href: item.href,
      label: item.label,
      icon: item.icon,
    })),
    { href: "/contact", label: t("contact"), icon: Mail },
  ];

  const brokerPhone = settings?.phone || "+251911234567";

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm bg-white">
      {/* =========================================================================
          TIER 1: MAIN HEADER (BRAND IDENTITY + TRUST + PRIMARY DESKTOP ACTIONS)
          ========================================================================= */}
      <div className="border-b border-slate-200/90 bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Left: Brand Identity Logo */}
            <Link href="/" className="flex items-center gap-3.5 group shrink-0">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-500 flex items-center justify-center text-white shadow-md shadow-amber-600/25 group-hover:scale-105 transition-transform duration-200">
                <Building2 className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-amber-700 transition-colors">
                    {language === "am" ? "ኢትዮ ደላላ" : "EthioDelala"}
                  </span>
                  <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                    <ShieldCheck className="w-3 h-3 text-amber-600" />
                    <span>{language === "am" ? "ፈቃድ ያለው" : "Licensed"}</span>
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-amber-700 tracking-wider uppercase">
                  {t("brandTagline")}
                </span>
              </div>
            </Link>

            {/* Center (Desktop): General Navigation Links */}
            <div className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
              <Link
                href="/"
                className={`transition-colors hover:text-amber-700 ${
                  pathname === "/" ? "text-amber-700 font-bold" : ""
                }`}
              >
                {t("home")}
              </Link>
              <Link
                href="/listings"
                className={`transition-colors hover:text-amber-700 ${
                  pathname === "/listings" ? "text-amber-700 font-bold" : ""
                }`}
              >
                {t("browseAllListings")}
              </Link>
              <Link
                href="/about"
                className={`transition-colors hover:text-amber-700 ${
                  pathname === "/about" ? "text-amber-700 font-bold" : ""
                }`}
              >
                {t("about")}
              </Link>
              <Link
                href="/contact"
                className={`transition-colors hover:text-amber-700 ${
                  pathname === "/contact" ? "text-amber-700 font-bold" : ""
                }`}
              >
                {t("contact")}
              </Link>
            </div>

            {/* Right: Actions, Language Switcher, Admin & Direct Call */}
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
                  className="shadow-md shadow-amber-600/20 font-bold"
                >
                  {t("callNow")}
                </Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
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
      </div>

      {/* =========================================================================
          TIER 2 (PC & LARGE SCREENS ONLY): FLOATING SEPARATED CATEGORY CONTAINER
          Styled with top margin, background, rounded borders & subtle shadow
          ========================================================================= */}
      <nav
        aria-label="Category Navigation"
        className="hidden lg:block bg-transparent"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2.5 pb-2.5">
          <div className="bg-slate-900/95 text-slate-200 rounded-2xl border border-slate-800/90 shadow-lg shadow-slate-950/20 px-3 py-1.5 backdrop-blur-md">
            <Suspense fallback={<CategoryPillsFallback categoryNavItems={categoryNavItems} t={t} />}>
              <CategoryPillsBar categoryNavItems={categoryNavItems} t={t} />
            </Suspense>
          </div>
        </div>
      </nav>

      {/* =========================================================================
          MOBILE DRAWER MENU (RESPONSIVE FALLBACK)
          ========================================================================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-fade-in max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="space-y-1">
            {mobileNavLinks.map((link) => {
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
                  <Icon className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50"
            >
              <LayoutDashboard className="w-5 h-5 text-slate-600 shrink-0" />
              <span>{t("adminPortal")}</span>
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <a href={`tel:${brokerPhone.replace(/\s+/g, "")}`} className="w-full">
              <Button variant="primary" size="lg" icon={Phone} className="w-full">
                {t("callNow")} ({brokerPhone})
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
