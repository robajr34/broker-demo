"use client";

import React from "react";
import Badge from "@/components/ui/Badge";
import { useLanguage } from "@/lib/context/LanguageContext";

export default function ListingStatusBadge({ status, isFeatured, size = "md" }) {
  const { t } = useLanguage();

  if (isFeatured && status === "available") {
    return (
      <Badge variant="featured" size={size} showDot>
        {t("featured")}
      </Badge>
    );
  }

  const statusMap = {
    available: { variant: "available", label: t("statusAvailable") },
    new: { variant: "new", label: t("statusNew") },
    featured: { variant: "featured", label: t("statusFeatured") },
    reserved: { variant: "reserved", label: t("statusReserved") },
    sold: { variant: "sold", label: t("statusSold") },
    rented: { variant: "rented", label: t("statusRented") },
    draft: { variant: "draft", label: t("statusDraft") },
    archived: { variant: "archived", label: t("statusArchived") },
  };

  const current = statusMap[status] || statusMap.available;

  return (
    <Badge variant={current.variant} size={size} showDot>
      {current.label}
    </Badge>
  );
}

