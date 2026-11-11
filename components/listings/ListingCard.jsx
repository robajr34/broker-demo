"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useDelala } from "@/lib/context/DelalaContext";
import ListingStatusBadge from "./ListingStatusBadge";
import Button from "@/components/ui/Button";
import { getCategoryName, getSubcategoryName } from "@/lib/data/categories";
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Globe,
  Boxes,
  Clock,
  Factory,
  Handshake,
  Layers,
  ArrowRight,
  Phone,
  Store,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Settings2,
  Gauge,
  Fuel,
} from "lucide-react";

export default function ListingCard({ listing, className = "" }) {
  const { language, t, getLocalizedField, formatPrice } = useLanguage();
  const { settings } = useDelala();

  if (!listing) return null;

  const title = getLocalizedField(listing, "title");
  const isSold = listing.status === "sold";
  const specs = listing.specifications || {};

  const categoryName = getCategoryName(listing.category, language);
  const subcategoryName = getSubcategoryName(
    listing.category,
    listing.subcategory,
    language
  );

  const brokerPhone = listing.contact?.phone || settings?.phone || "+251911234567";

  // Determine whether this listing has monthly rental pricing
  const isMonthlyRental =
    listing.pricePeriod === "month" ||
    listing.category === "houses-for-rent" ||
    listing.category === "shops-for-rent" ||
    (listing.category === "factories" && listing.transactionType === "rent");

  const isPartnership =
    listing.transactionType === "partnership" ||
    listing.pricePeriod === "equity_contribution";

  // Factory transaction type badge label
  const getFactoryTypeBadge = () => {
    if (listing.transactionType === "sale") return t("factorySale");
    if (listing.transactionType === "rent") return t("factoryRent");
    if (listing.transactionType === "partnership") return t("factoryPartnership");
    return null;
  };

  const factoryBadge = listing.category === "factories" ? getFactoryTypeBadge() : null;

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
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-slate-900/85 backdrop-blur-md text-white shadow-xs">
                {categoryName}
              </span>

              {/* Demo Data indicator */}
              {listing.isFictionalDemo && (
                <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-500/95 text-slate-950 shadow-xs">
                  {t("demoBadge")}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              {factoryBadge && (
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-purple-700/90 text-white backdrop-blur-md shadow-xs">
                  {factoryBadge}
                </span>
              )}
              <ListingStatusBadge
                status={listing.status}
                isFeatured={listing.isFeatured}
                size="sm"
              />
            </div>
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
          {/* Subcategory & Location */}
          <div className="flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-slate-500 truncate">
              <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="truncate">{listing.location}</span>
            </div>

            {subcategoryName && (
              <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60 truncate max-w-[50%]">
                {subcategoryName}
              </span>
            )}
          </div>

          {/* Title */}
          <Link href={`/listings/${listing.id}`}>
            <h3 className="text-base font-bold text-slate-900 line-clamp-2 group-hover:text-amber-700 transition-colors leading-snug">
              {title}
            </h3>
          </Link>

          {/* Category-specific specifications */}
          <div className="pt-2.5 border-t border-slate-100 text-xs text-slate-600 font-medium">
            {/* 1. IMPORT MATERIALS: Origin, Quantity, Availability */}
            {listing.category === "import-materials" && (
              <div className="space-y-1.5">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-1.5 truncate" title={specs.origin}>
                    <Globe className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">
                      <strong>{t("origin")}:</strong> {specs.origin || "Imported"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate" title={specs.quantity}>
                    <Boxes className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">{specs.quantity || "Bulk Stock"}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 truncate" title={specs.availability}>
                  <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate text-[11px] font-semibold text-emerald-700">
                    {specs.availability || "Available in Stock"}
                  </span>
                </div>
              </div>
            )}

            {/* 2. FACTORIES: Industry, Facility Size, Partnership / Transaction Type */}
            {listing.category === "factories" && (
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 truncate" title={specs.industry}>
                  <Factory className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span className="truncate">
                    <strong>{t("industry")}:</strong> {specs.industry || "Manufacturing"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-1.5 truncate" title={specs.facilitySize}>
                    <Maximize2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                    <span className="truncate">{specs.facilitySize || "Industrial Shed"}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate" title={specs.partnershipAvailability}>
                    <Handshake className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                    <span className="truncate text-purple-700 font-semibold">
                      {listing.transactionType === "partnership"
                        ? "Joint Venture"
                        : listing.transactionType === "rent"
                        ? "For Lease"
                        : "Outright Sale"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 3. SHOPS FOR RENT: Floor Area, Floor Level, Facilities */}
            {listing.category === "shops-for-rent" && (
              <div className="space-y-1.5">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-1.5 truncate" title="Floor Area">
                    <Maximize2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">
                      <strong>{t("floorArea")}:</strong> {specs.floorArea || `${specs.area || "—"} m²`}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate" title="Floor Level">
                    <Layers className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{specs.floorLevel || "Ground Floor"}</span>
                  </div>
                </div>
                {Array.isArray(listing.features) && listing.features.length > 0 && (
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 truncate">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span className="truncate">
                      {listing.features.slice(0, 2).join(" • ")}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* 4. HOUSES FOR RENT: Rental Price, Bedrooms, Floor Area, Facilities */}
            {listing.category === "houses-for-rent" && (
              <div className="space-y-1.5">
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center gap-1.5 truncate" title="Bedrooms">
                    <Bed className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate">{specs.bedrooms ? `${specs.bedrooms} Beds` : "Studio"}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate" title="Bathrooms">
                    <Bath className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate">{specs.bathrooms ? `${specs.bathrooms} Baths` : "1 Bath"}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate" title="Floor Area">
                    <Maximize2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate">{specs.floorArea || `${specs.area || "—"} m²`}</span>
                  </div>
                </div>
                {Array.isArray(listing.features) && listing.features.length > 0 && (
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 truncate">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span className="truncate">
                      {listing.features.slice(0, 2).join(" • ")}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* 5. VEHICLES: Year, Mileage, Transmission, Fuel */}
            {(listing.category === "vehicles" || listing.category === "car") && (
              <div className="space-y-1.5">
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center gap-1.5 truncate" title="Year">
                    <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">{specs.year || "Recent"}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate" title="Transmission">
                    <Settings2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">{specs.transmission || "Automatic"}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate" title="Mileage">
                    <Gauge className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">{specs.mileage || "0 km"}</span>
                  </div>
                </div>
                {specs.fuelType && (
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 truncate">
                    <Fuel className="w-3 h-3 text-blue-600 shrink-0" />
                    <span className="truncate">{specs.fuelType} • {specs.condition || "Excellent"}</span>
                  </div>
                )}
              </div>
            )}

            {/* 6. PROPERTIES: Bedrooms, Bathrooms, Area, Title Type */}
            {(listing.category === "properties" || listing.category === "house" || listing.category === "apartment" || listing.category === "land") && (
              <div className="space-y-1.5">
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center gap-1.5 truncate" title="Bedrooms">
                    <Bed className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate">{specs.bedrooms ? `${specs.bedrooms} Beds` : specs.landArea || "Title Carta"}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate" title="Bathrooms">
                    <Bath className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate">{specs.bathrooms ? `${specs.bathrooms} Baths` : "Verified"}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate" title="Area">
                    <Maximize2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate">{specs.floorArea || (specs.area ? `${specs.area} m²` : specs.landArea || "—")}</span>
                  </div>
                </div>
                {Array.isArray(listing.features) && listing.features.length > 0 && (
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 truncate">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span className="truncate">
                      {listing.features.slice(0, 2).join(" • ")}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Legacy fallback */}
            {!["import-materials", "factories", "shops-for-rent", "houses-for-rent", "properties", "vehicles", "car", "house", "apartment", "land"].includes(
              listing.category
            ) && specs.floorArea && (
              <div className="flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5 text-slate-500" />
                <span>{specs.floorArea}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer: Price & Quick Broker Actions */}
      <div className="p-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 bg-slate-50/60">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            {isMonthlyRental ? t("rentalPrice") : t("price")}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
              {formatPrice(listing.publicPrice)}
            </span>
            {isMonthlyRental && (
              <span className="text-[11px] font-semibold text-amber-700">
                {t("perMonth")}
              </span>
            )}
            {isPartnership && (
              <span className="text-[10px] font-bold text-purple-700">
                (Equity)
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Quick Call Broker Action */}
          <a
            href={`tel:${brokerPhone.replace(/\s+/g, "")}`}
            title={`${t("callBroker")} (${brokerPhone})`}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-amber-700 hover:border-amber-400 hover:bg-white transition-colors shadow-xs"
          >
            <Phone className="w-3.5 h-3.5" />
          </a>

          {/* Details CTA */}
          <Link href={`/listings/${listing.id}`}>
            <Button
              variant="outline"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
              className="group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600 transition-all font-semibold text-xs px-3"
            >
              {t("viewDetails")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
