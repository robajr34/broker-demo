"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useDelala } from "@/lib/context/DelalaContext";
import PublicNavbar from "@/components/layout/PublicNavbar";
import PublicFooter from "@/components/layout/PublicFooter";
import ListingFilters from "@/components/listings/ListingFilters";
import ListingGrid from "@/components/listings/ListingGrid";
import SectionHeader from "@/components/common/SectionHeader";
import Pagination from "@/components/common/Pagination";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

function ListingsContent() {
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const { listings, isLoading } = useDelala();

  // Initialize filters from query params
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "all",
    subcategory: searchParams.get("subcategory") || "all",
    transactionType: searchParams.get("transactionType") || "all",
    location: searchParams.get("location") || "all",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    status: searchParams.get("status") || "all",
    sortBy: searchParams.get("sortBy") || "newest",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Filter & sort logic
  const filteredListings = useMemo(() => {
    return listings
      .filter((item) => {
        // Exclude draft or archived from public listings page
        if (item.status === "draft" || item.status === "archived") return false;

        // Search text matching
        if (filters.search) {
          const q = filters.search.toLowerCase();
          const matchTitle = (item.title || "").toLowerCase().includes(q);
          const matchTitleAm = (item.titleAm || "").toLowerCase().includes(q);
          const matchLoc = (item.location || "").toLowerCase().includes(q);
          const matchDesc = (item.description || "").toLowerCase().includes(q);
          if (!matchTitle && !matchTitleAm && !matchLoc && !matchDesc) return false;
        }

        // Category filter (with legacy fallback support)
        if (filters.category !== "all") {
          const cat = filters.category;
          const matchDirect = item.category === cat;
          const matchLegacyHouse = cat === "house" && item.category === "houses-for-rent";
          const matchLegacyCommercial = cat === "commercial" && item.category === "shops-for-rent";
          const matchLegacyCar = cat === "car" && item.category === "import-materials";
          if (!matchDirect && !matchLegacyHouse && !matchLegacyCommercial && !matchLegacyCar) {
            return false;
          }
        }

        // Subcategory filter
        if (filters.subcategory && filters.subcategory !== "all") {
          if (item.subcategory !== filters.subcategory) {
            return false;
          }
        }

        // Transaction Type filter (for Factories: sale, rent, partnership)
        if (filters.transactionType && filters.transactionType !== "all") {
          if (item.transactionType !== filters.transactionType) {
            return false;
          }
        }

        // Location filter
        if (filters.location !== "all" && item.location !== filters.location) {
          return false;
        }

        // Status filter
        if (filters.status !== "all" && item.status !== filters.status) {
          return false;
        }

        // Price filter
        const price = Number(item.publicPrice) || 0;
        if (filters.minPrice && price < Number(filters.minPrice)) {
          return false;
        }
        if (filters.maxPrice && price > Number(filters.maxPrice)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === "price_asc") {
          return (Number(a.publicPrice) || 0) - (Number(b.publicPrice) || 0);
        }
        if (filters.sortBy === "price_desc") {
          return (Number(b.publicPrice) || 0) - (Number(a.publicPrice) || 0);
        }
        // default newest
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      });
  }, [listings, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);
  const paginatedListings = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredListings.slice(start, start + itemsPerPage);
  }, [filteredListings, currentPage]);

  const handleResetFilters = () => {
    setFilters({
      search: "",
      category: "all",
      subcategory: "all",
      transactionType: "all",
      location: "all",
      minPrice: "",
      maxPrice: "",
      status: "all",
      sortBy: "newest",
    });
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <PublicNavbar />

      <main className="flex-1 bg-slate-50 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <SectionHeader
            badge="Marketplace"
            title={t("marketplaceTitle")}
            subtitle={t("marketplaceSubtitle")}
            align="left"
          />

          {/* Interactive Filters Bar */}
          <ListingFilters
            filters={filters}
            onChange={(newFilters) => {
              setFilters(newFilters);
              setCurrentPage(1);
            }}
            onReset={handleResetFilters}
            totalResults={filteredListings.length}
          />

          {/* Listings Grid */}
          <ListingGrid
            listings={paginatedListings}
            isLoading={isLoading}
            onResetFilters={handleResetFilters}
          />

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

export default function ListingsPage() {
  return (
    <Suspense fallback={<LoadingSpinner size="lg" text="Loading Marketplace..." />}>
      <ListingsContent />
    </Suspense>
  );
}

