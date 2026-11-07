"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/context/LanguageContext";
import ListingStatusBadge from "./ListingStatusBadge";
import Button from "@/components/ui/Button";
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  Fuel,
  Gauge,
  Layers,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function ListingCard({ listing, className = "" }) {
  const { language, t, getLocalizedField, formatPrice } = useLanguage();

  if (!listing) return null;

  const title = getLocalizedField(listing, "title");
  const isSold = listing.status === "sold";
  const specs = listing.specifications || {};

  // Category label
  const categoryLabels = {
    house: t("categoryHouse"),
    apartment: t("categoryApartment"),
    commercial: t("categoryCommercial"),
    land: t("categoryLand"),
    car: t("categoryCar"),
  };

  const categoryName = categoryLabels[listing.category] || listing.category;

  return (
    <div
      className={`group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-400/60 transition-all duration-300 flex flex-col justify-between relative ${className}`}
    >
      <div>
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <img
            src={listing.primaryImage || (listing.images && listing.images[0])}
            alt={title}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              isSold ? "grayscale-30 contrast-110" : ""
            }`}
          />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
            <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-white shadow-xs">
              {categoryName}
            </span>

            <ListingStatusBadge
              status={listing.status}
              isFeatured={listing.isFeatured}
              size="sm"
            />
          </div>

          {/* Sold Overlay Banner if sold */}
          {isSold && (
            <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex items-center justify-center">
              <span className="px-4 py-1.5 rounded-xl bg-rose-600 text-white font-black text-sm uppercase tracking-widest shadow-lg transform -rotate-3">
                {t("statusSold")}
              </span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-3.5">
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="truncate">{listing.location}</span>
            {listing.address && (
              <span className="truncate text-slate-400">• {listing.address}</span>
            )}
          </div>

          {/* Title */}
          <Link href={`/listings/${listing.id}`}>
            <h3 className="text-base font-bold text-slate-900 line-clamp-2 group-hover:text-amber-700 transition-colors leading-snug">
              {title}
            </h3>
          </Link>

          {/* Specific Specifications Summary */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-3 gap-2 text-xs text-slate-600 font-medium">
            {listing.category === "car" ? (
              <>
                <div className="flex items-center gap-1.5 truncate" title="Model Year">
                  <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">{specs.year || "—"}</span>
                </div>
                <div className="flex items-center gap-1.5 truncate" title="Mileage">
                  <Gauge className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">{specs.mileage || "—"}</span>
                </div>
                <div className="flex items-center gap-1.5 truncate" title="Fuel Type">
                  <Fuel className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">{specs.fuelType || "—"}</span>
                </div>
              </>
            ) : listing.category === "land" ? (
              <>
                <div className="flex items-center gap-1.5 truncate col-span-2" title="Land Area">
                  <Maximize2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">{specs.landArea ? `${specs.landArea} m²` : "—"}</span>
                </div>
                <div className="flex items-center gap-1.5 truncate" title="Zoning">
                  <Layers className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">{specs.roadAccess || "Carta"}</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-1.5 truncate" title="Bedrooms">
                  <Bed className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">{specs.bedrooms ? `${specs.bedrooms} Beds` : "—"}</span>
                </div>
                <div className="flex items-center gap-1.5 truncate" title="Bathrooms">
                  <Bath className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">{specs.bathrooms ? `${specs.bathrooms} Baths` : "—"}</span>
                </div>
                <div className="flex items-center gap-1.5 truncate" title="Built Area">
                  <Maximize2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">{specs.area ? `${specs.area} m²` : "—"}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer: Price & CTA */}
      <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3 bg-slate-50/50">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
            {t("price")}
          </span>
          <span className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
            {formatPrice(listing.publicPrice)}
          </span>
        </div>

        <Link href={`/listings/${listing.id}`}>
          <Button
            variant="outline"
            size="sm"
            icon={ArrowRight}
            iconPosition="right"
            className="group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600 transition-all font-semibold"
          >
            {t("viewDetails")}
          </Button>
        </Link>
      </div>
    </div>
  );
}

