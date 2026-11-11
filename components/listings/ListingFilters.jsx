"use client";

import React, { useState, useMemo } from "react";
import { useLanguage } from "@/lib/context/LanguageContext";
import { CATEGORIES, getSubcategoriesForCategory } from "@/lib/data/categories";
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
  Tag,
  Building2,
  Factory,
  Store,
  Home,
  PackageCheck,
  Check,
} from "lucide-react";

export default function ListingFilters({
  filters,
  onChange,
  onReset,
  totalResults = 0,
}) {
  const { t, language } = useLanguage();
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Top-level categories (Import Materials, Factories, Shops for Rent, Houses for Rent, Properties, Vehicles)
  const categoryOptions = [
    { value: "all", label: t("categoryAll") },
    { value: "import-materials", label: t("categoryImportMaterials") },
    { value: "factories", label: t("categoryFactories") },
    { value: "shops-for-rent", label: t("categoryShopsForRent") },
    { value: "houses-for-rent", label: t("categoryHousesForRent") },
    { value: "properties", label: t("categoryProperties") },
    { value: "vehicles", label: t("categoryVehicles") },
  ];

  // Dynamically compute subcategories for the selected category
  const activeSubcategories = useMemo(() => {
    if (!filters.category || filters.category === "all") return [];
    return getSubcategoriesForCategory(filters.category);
  }, [filters.category]);

  const subcategoryOptions = useMemo(() => {
    if (!activeSubcategories || activeSubcategories.length === 0) return [];
    return [
      { value: "all", label: t("allSubcategories") },
      ...activeSubcategories.map((sub) => ({
        value: sub.id,
        label: language === "am" ? sub.nameAm : sub.nameEn,
      })),
    ];
  }, [activeSubcategories, language, t]);

  // Factory listing / transaction types (Sale, Rent, Partnership)
  const factoryTypeOptions = [
    { value: "all", label: t("allTransactionTypes") },
    { value: "sale", label: t("factoriesForSale") },
    { value: "rent", label: t("factoriesForRent") },
    { value: "partnership", label: t("factoryPartnershipOpportunities") },
  ];

  const locationOptions = [
    { value: "all", label: t("locationAll") },
    { value: "Addis Ababa", label: "Addis Ababa" },
    { value: "Bole", label: "Bole (Addis Ababa)" },
    { value: "Kazanchis", label: "Kazanchis (Addis Ababa)" },
    { value: "Merkato", label: "Merkato (Addis Ababa)" },
    { value: "CMC", label: "CMC (Addis Ababa)" },
    { value: "Ayat", label: "Ayat (Addis Ababa)" },
    { value: "Kality", label: "Kality (Addis Ababa)" },
    { value: "Piassa", label: "Piassa (Addis Ababa)" },
    { value: "Old Airport", label: "Old Airport / Sarbet (Addis Ababa)" },
    { value: "Mexico", label: "Mexico Square (Addis Ababa)" },
    { value: "Dukem", label: "Dukem (Eastern Industry Zone)" },
    { value: "Modjo", label: "Modjo (Dry Port Logistics)" },
    { value: "Adama", label: "Adama (Expressway Corridor)" },
    { value: "Debre Birhan", label: "Debre Birhan" },
    { value: "Sebeta", label: "Sebeta" },
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
    // When main category changes, reset subcategory and factoryType
    if (field === "category") {
      onChange?.({
        ...filters,
        category: value,
        subcategory: "all",
        transactionType: "all",
      });
      return;
    }

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

        {/* Main Category Filter */}
        <div className="md:col-span-3">
          <Select
            options={categoryOptions}
            value={filters.category || "all"}
            onChange={(e) => handleFieldChange("category", e.target.value)}
          />
        </div>

        {/* Location Filter */}
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

      {/* Dynamic Subcategory & Factory Listing Type Filters (when category is selected) */}
      {filters.category && filters.category !== "all" && activeSubcategories.length > 0 && (
        <div className="pt-3 border-t border-slate-100 flex flex-col md:flex-row md:items-center gap-3">
          {/* Subcategory Select */}
          <div className="flex-1">
            <Select
              label={t("filterSubcategory")}
              options={subcategoryOptions}
              value={filters.subcategory || "all"}
              onChange={(e) => handleFieldChange("subcategory", e.target.value)}
            />
          </div>

          {/* For Factories: Transaction Type Select (Sale / Rent / Partnership) */}
          {filters.category === "factories" && (
            <div className="flex-1">
              <Select
                label={t("listingType")}
                options={factoryTypeOptions}
                value={filters.transactionType || "all"}
                onChange={(e) => handleFieldChange("transactionType", e.target.value)}
              />
            </div>
          )}
        </div>
      )}

      {/* Quick Subcategory Pills / Chips for rapid 1-click filtering */}
      {filters.category && filters.category !== "all" && activeSubcategories.length > 0 && (
        <div className="pt-2 flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
            <Tag className="w-3 h-3 text-amber-600" />
            {t("subcategory")}:
          </span>

          <button
            type="button"
            onClick={() => handleFieldChange("subcategory", "all")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              !filters.subcategory || filters.subcategory === "all"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {t("all")}
          </button>

          {activeSubcategories.map((sub) => {
            const isSelected = filters.subcategory === sub.id;
            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => handleFieldChange("subcategory", sub.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-amber-600 text-white shadow-xs font-bold"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {language === "am" ? sub.nameAm : sub.nameEn}
              </button>
            );
          })}
        </div>
      )}

      {/* Advanced Filters Expandable Area */}
      {showAdvanced && (
        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 animate-fade-in">
          {/* Min Price */}
          <div>
            <Input
              type="number"
              label={t("minPrice")}
              placeholder="e.g. 50,000"
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
        {(filters.category !== "all" ||
          (filters.subcategory && filters.subcategory !== "all") ||
          (filters.transactionType && filters.transactionType !== "all") ||
          filters.location !== "all" ||
          filters.search ||
          filters.minPrice ||
          filters.maxPrice) && (
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
