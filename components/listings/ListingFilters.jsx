"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/context/LanguageContext";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import {
  Search,
  Filter,
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function ListingFilters({
  filters,
  onChange,
  onReset,
  totalResults = 0,
}) {
  const { t } = useLanguage();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const categoryOptions = [
    { value: "all", label: t("categoryAll") },
    { value: "house", label: t("categoryHouse") },
    { value: "apartment", label: t("categoryApartment") },
    { value: "commercial", label: t("categoryCommercial") },
    { value: "land", label: t("categoryLand") },
    { value: "car", label: t("categoryCar") },
  ];

  const locationOptions = [
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

  const statusOptions = [
    { value: "all", label: t("all") },
    { value: "available", label: t("statusAvailable") },
    { value: "new", label: t("statusNew") },
    { value: "reserved", label: t("statusReserved") },
    { value: "sold", label: t("statusSold") },
  ];

  const sortOptions = [
    { value: "newest", label: t("sortNewest") },
    { value: "price_asc", label: t("sortPriceAsc") },
    { value: "price_desc", label: t("sortPriceDesc") },
  ];

  const handleFieldChange = (field, value) => {
    onChange?.({
      ...filters,
      [field]: value,
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm space-y-4">
      {/* Primary search bar & Quick filters */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-center">
        {/* Search input */}
        <div className="md:col-span-5">
          <Input
            placeholder={t("searchPlaceholder")}
            icon={Search}
            value={filters.search || ""}
            onChange={(e) => handleFieldChange("search", e.target.value)}
          />
        </div>

        {/* Category filter */}
        <div className="md:col-span-3">
          <Select
            options={categoryOptions}
            value={filters.category || "all"}
            onChange={(e) => handleFieldChange("category", e.target.value)}
          />
        </div>

        {/* Location filter */}
        <div className="md:col-span-2">
          <Select
            options={locationOptions}
            value={filters.location || "all"}
            onChange={(e) => handleFieldChange("location", e.target.value)}
          />
        </div>

        {/* Advanced Filters Toggle & Reset Button */}
        <div className="md:col-span-2 flex items-center gap-2">
          <Button
            variant="outline"
            size="md"
            onClick={() => setShowAdvanced(!showAdvanced)}
            icon={showAdvanced ? ChevronUp : SlidersHorizontal}
            className="w-full text-xs font-semibold"
          >
            {t("filter")}
          </Button>

          <button
            type="button"
            onClick={onReset}
            title={t("clearFilters")}
            className="p-2.5 rounded-xl border border-slate-300 text-slate-500 hover:text-rose-600 hover:border-rose-300 hover:bg-rose-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Advanced Filters Expandable Area */}
      {showAdvanced && (
        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 animate-fade-in">
          {/* Min Price */}
          <div>
            <Input
              type="number"
              label={t("minPrice")}
              placeholder="e.g. 5,000,000"
              value={filters.minPrice || ""}
              onChange={(e) => handleFieldChange("minPrice", e.target.value)}
            />
          </div>

          {/* Max Price */}
          <div>
            <Input
              type="number"
              label={t("maxPrice")}
              placeholder="e.g. 50,000,000"
              value={filters.maxPrice || ""}
              onChange={(e) => handleFieldChange("maxPrice", e.target.value)}
            />
          </div>

          {/* Listing Status */}
          <div>
            <Select
              label={t("filterStatus")}
              options={statusOptions}
              value={filters.status || "all"}
              onChange={(e) => handleFieldChange("status", e.target.value)}
            />
          </div>

          {/* Sort By */}
          <div>
            <Select
              label={t("sortBy")}
              options={sortOptions}
              value={filters.sortBy || "newest"}
              onChange={(e) => handleFieldChange("sortBy", e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Results summary bar */}
      <div className="pt-2 flex items-center justify-between text-xs text-slate-500 font-medium">
        <span>
          {t("showing")} <strong className="text-slate-800">{totalResults}</strong> {t("results")}
        </span>

        {/* Quick active filter tags */}
        {(filters.category !== "all" || filters.location !== "all" || filters.search || filters.minPrice || filters.maxPrice) && (
          <button
            type="button"
            onClick={onReset}
            className="text-amber-600 hover:text-amber-700 font-bold hover:underline"
          >
            {t("clearFilters")}
          </button>
        )}
      </div>
    </div>
  );
}

