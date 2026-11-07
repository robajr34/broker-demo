"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/context/LanguageContext";
import Button from "@/components/ui/Button";
import {
  Search,
  Building2,
  Car,
  MapPin,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

export default function ListingSearch() {
  const router = useRouter();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState("all"); // 'all', 'properties', 'cars'
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const locations = [
    { value: "all", label: t("locationAll") },
    { value: "Addis Ababa", label: "Addis Ababa" },
    { value: "Bole", label: "Bole" },
    { value: "CMC", label: "CMC" },
    { value: "Saris", label: "Saris" },
    { value: "Kazanchis", label: "Kazanchis" },
    { value: "Ayat", label: "Ayat" },
    { value: "Adama", label: "Adama" },
    { value: "Bishoftu", label: "Bishoftu" },
    { value: "Hawassa", label: "Hawassa" },
  ];

  const categories = [
    { value: "all", label: t("categoryAll") },
    { value: "house", label: t("categoryHouse") },
    { value: "apartment", label: t("categoryApartment") },
    { value: "commercial", label: t("categoryCommercial") },
    { value: "land", label: t("categoryLand") },
    { value: "car", label: t("categoryCar") },
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "properties") {
      setCategory("house");
    } else if (tab === "cars") {
      setCategory("car");
    } else {
      setCategory("all");
    }
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

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 mb-3">
        <button
          type="button"
          onClick={() => handleTabChange("all")}
          className={`px-5 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === "all"
              ? "bg-white text-slate-900 shadow-sm"
              : "bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs"
          }`}
        >
          {t("categoryAll")}
        </button>

        <button
          type="button"
          onClick={() => handleTabChange("properties")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === "properties"
              ? "bg-white text-slate-900 shadow-sm"
              : "bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs"
          }`}
        >
          <Building2 className="w-4 h-4 text-amber-500" />
          <span>{t("exploreProperties")}</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange("cars")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === "cars"
              ? "bg-white text-slate-900 shadow-sm"
              : "bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs"
          }`}
        >
          <Car className="w-4 h-4 text-amber-500" />
          <span>{t("exploreCars")}</span>
        </button>
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
              onChange={(e) => setCategory(e.target.value)}
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
            {t("price")} (ETB)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min ETB"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-slate-400 font-medium"
            />
            <input
              type="number"
              placeholder="Max ETB"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-slate-400 font-medium"
            />
          </div>
        </div>

        {/* Search Submit Button */}
        <div>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            icon={Search}
            className="w-full font-bold shadow-lg shadow-amber-600/30 text-sm"
          >
            {t("searchListings")}
          </Button>
        </div>
      </form>
    </div>
  );
}

