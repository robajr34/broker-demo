"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/context/LanguageContext";
import Button from "@/components/ui/Button";
import {
  Search,
  PackageCheck,
  Factory,
  Store,
  Home,
  Building2,
  Car,
  MapPin,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

export default function ListingSearch() {
  const router = useRouter();
  const { t, language } = useLanguage();

  const [activeTab, setActiveTab] = useState("all");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const locations = [
    { value: "all", label: t("locationAll") },
    { value: "Addis Ababa", label: "Addis Ababa" },
    { value: "Bole", label: "Bole" },
    { value: "Kazanchis", label: "Kazanchis" },
    { value: "Merkato", label: "Merkato" },
    { value: "CMC", label: "CMC" },
    { value: "Ayat", label: "Ayat" },
    { value: "Kality", label: "Kality" },
    { value: "Old Airport", label: "Old Airport" },
    { value: "Dukem", label: "Dukem (Industry Zone)" },
    { value: "Modjo", label: "Modjo (Dry Port)" },
    { value: "Adama", label: "Adama" },
    { value: "Debre Birhan", label: "Debre Birhan" },
    { value: "Sebeta", label: "Sebeta" },
  ];

  const categories = [
    { value: "all", label: t("categoryAll") },
    { value: "import-materials", label: t("categoryImportMaterials") },
    { value: "factories", label: t("categoryFactories") },
    { value: "shops-for-rent", label: t("categoryShopsForRent") },
    { value: "houses-for-rent", label: t("categoryHousesForRent") },
    { value: "properties", label: t("categoryProperties") },
    { value: "vehicles", label: t("categoryVehicles") },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCategory(tabId);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (category && category !== "all") params.set("category", category);
    if (location && location !== "all") params.set("location", location);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

    router.push(`/listings?${params.toString()}`);
  };

  const tabs = [
    { id: "all", label: t("all"), icon: null },
    { id: "import-materials", label: t("categoryImportMaterials"), icon: PackageCheck },
    { id: "factories", label: t("categoryFactories"), icon: Factory },
    { id: "shops-for-rent", label: t("categoryShopsForRent"), icon: Store },
    { id: "houses-for-rent", label: t("categoryHousesForRent"), icon: Home },
    { id: "properties", label: t("categoryProperties"), icon: Building2 },
    { id: "vehicles", label: t("categoryVehicles"), icon: Car },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 sm:gap-2 mb-2 overflow-x-auto pb-1 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-t-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-white text-slate-900 shadow-sm"
                  : "bg-black/50 hover:bg-black/70 text-slate-200 backdrop-blur-xs"
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5 text-amber-500" />}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Search Panel */}
      <form
        onSubmit={handleSearch}
        className="bg-white rounded-2xl rounded-tl-none p-4 sm:p-6 shadow-2xl border border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end"
      >
        {/* Category Selector */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            {t("category")}
          </label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setActiveTab(e.target.value);
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none font-medium cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Location Selector */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            {t("location")}
          </label>
          <div className="relative">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none font-medium cursor-pointer"
            >
              {locations.map((loc) => (
                <option key={loc.value} value={loc.value}>
                  {loc.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            {t("maxPrice")}
          </label>
          <input
            type="number"
            placeholder="e.g. 5,000,000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
          />
        </div>

        {/* Submit Button */}
        <div>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            icon={Search}
            className="w-full font-bold shadow-lg shadow-amber-600/25"
          >
            {t("searchListings")}
          </Button>
        </div>
      </form>
    </div>
  );
}
