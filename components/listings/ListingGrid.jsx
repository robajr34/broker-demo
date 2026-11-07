"use client";

import React from "react";
import ListingCard from "./ListingCard";
import { ListingCardSkeleton } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import { useLanguage } from "@/lib/context/LanguageContext";

export default function ListingGrid({
  listings = [],
  isLoading = false,
  emptyTitle,
  emptyDescription,
  onResetFilters,
  className = "",
}) {
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 ${className}`}>
        {Array.from({ length: 6 }).map((_, i) => (
          <ListingCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <EmptyState
        title={emptyTitle || t("noResults")}
        description={emptyDescription}
        actionLabel={onResetFilters ? t("clearFilters") : undefined}
        onAction={onResetFilters}
      />
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 ${className}`}>
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}

