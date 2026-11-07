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
import { Building2 } from "lucide-react";

function PropertiesContent() {
  const searchParams = useSearchParams();
  const { t, language } = useLanguage();
  const { listings, isLoading } = useDelala();

  const initialCat = searchParams.get("category") || "all";

  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: initialCat,
    location: searchParams.get("location") || "all",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    status: searchParams.get("status") || "all",
    sortBy: searchParams.get("sortBy") || "newest",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Filter only property items (houses, apartments, commercial, land)
  const propertyListings = useMemo(() => {
    return listings
      .filter((item) => {
        if (item.status === "draft" || item.status === "archived") return false;
        // Exclude cars from properties page
        if (item.category === "car") return false;

        if (filters.search) {
          const q = filters.search.toLowerCase();
          const matchTitle = (item.title || "").toLowerCase().includes(q);
          const matchTitleAm = (item.titleAm || "").toLowerCase().includes(q);
          const matchLoc = (item.location || "").toLowerCase().includes(q);
          if (!matchTitle && !matchTitleAm && !matchLoc) return false;
        }

        if (filters.category !== "all" && item.category !== filters.category) {
          return false;
        }

        if (filters.location !== "all" && item.location !== filters.location) {
          return false;
        }

        if (filters.status !== "all" && item.status !== filters.status) {
          return false;
        }

        const price = Number(item.publicPrice) || 0;
        if (filters.minPrice && price < Number(filters.minPrice)) return false;
        if (filters.maxPrice && price > Number(filters.maxPrice)) return false;

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === "price_asc") {
          return (Number(a.publicPrice) || 0) - (Number(b.publicPrice) || 0);
        }
        if (filters.sortBy === "price_desc") {
          return (Number(b.publicPrice) || 0) - (Number(a.publicPrice) || 0);
        }
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      });
  }, [listings, filters]);

  const totalPages = Math.ceil(propertyListings.length / itemsPerPage);
  const paginatedListings = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return propertyListings.slice(start, start + itemsPerPage);
  }, [propertyListings, currentPage]);

  const handleReset = () => {
    setFilters({
      search: "",
      category: "all",
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
            badge={t("properties")}
            title={language === "am" ? "የመኖሪያና የንግድ ንብረቶች" : "Properties & Real Estate"}
            subtitle={
              language === "am"
                ? "ቪላዎች፣ አፓርታማዎች፣ የንግድ ህንፃዎችና የመዋዕለ ንዋይ መሬቶች"
                : "Explore luxury residential villas, verified plots, and high-yield commercial real estate."
            }
            align="left"
          />

          <ListingFilters
            filters={filters}
            onChange={(newFilters) => {
              setFilters(newFilters);
              setCurrentPage(1);
            }}
            onReset={handleReset}
            totalResults={propertyListings.length}
          />

          <ListingGrid
            listings={paginatedListings}
            isLoading={isLoading}
            onResetFilters={handleReset}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(p) => {
              setCurrentPage(p);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<LoadingSpinner size="lg" text="Loading Properties..." />}>
      <PropertiesContent />
    </Suspense>
  );
}

