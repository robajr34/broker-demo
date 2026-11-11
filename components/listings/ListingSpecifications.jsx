"use client";

import React from "react";
import { useLanguage } from "@/lib/context/LanguageContext";
import {
  Bed,
  Bath,
  Maximize2,
  Car,
  Layers,
  Armchair,
  Compass,
  Calendar,
  Gauge,
  Zap,
  Fuel,
  Settings2,
  Palette,
  ShieldCheck,
  CheckCircle2,
  Globe,
  Boxes,
  Clock,
  Factory,
  Handshake,
  DollarSign,
  Truck,
  Droplet,
  FileCheck,
  Building,
  Key,
} from "lucide-react";

export default function ListingSpecifications({ listing }) {
  const { t, language } = useLanguage();

  if (!listing) return null;

  const specs = listing.specifications || {};
  const category = listing.category;

  // 1. IMPORT MATERIALS SPECIFICATIONS
  if (category === "import-materials") {
    const importItems = [
      { label: t("origin"), value: specs.origin, icon: Globe },
      { label: t("quantity"), value: specs.quantity, icon: Boxes },
      { label: t("availability"), value: specs.availability, icon: Clock },
      { label: t("minOrder"), value: specs.minOrder, icon: Key },
      { label: t("deliveryTerms"), value: specs.deliveryTerms, icon: Truck },
      { label: "Standards & Compliance", value: specs.standards, icon: ShieldCheck },
      { label: "Packaging Details", value: specs.packaging, icon: Boxes },
    ].filter((item) => item.value);

    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            {language === "am" ? "የእቃው ዝርዝር መረጃዎች" : "Import Material Specifications"}
          </h3>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200">
            {language === "am" ? "ከውጭ የሚገቡ እቃዎች" : "Import Product"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {importItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    {item.label}
                  </span>
                  <span className="text-sm font-bold text-slate-900 mt-0.5 truncate">
                    {item.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 2. FACTORIES SPECIFICATIONS
  if (category === "factories") {
    const factoryItems = [
      { label: t("industry"), value: specs.industry, icon: Factory },
      { label: t("facilitySize"), value: specs.facilitySize, icon: Maximize2 },
      { label: t("listingType"), value: specs.transactionType, icon: Handshake },
      { label: t("partnershipAvailability"), value: specs.partnershipAvailability, icon: Handshake },
      { label: t("powerCapacity"), value: specs.powerCapacity, icon: Zap },
      { label: "Water & Utilities Source", value: specs.waterSource, icon: Droplet },
      { label: "Current Operational Status", value: specs.operationalStatus, icon: CheckCircle2 },
      { label: "Production Equipment", value: specs.machinery || specs.processingLines || specs.sewingStations, icon: Settings2 },
    ].filter((item) => item.value);

    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            {language === "am" ? "የፋብሪካው ዝርዝር ቴክኒካዊ መረጃዎች" : "Factory Technical Specifications"}
          </h3>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-purple-50 text-purple-800 border border-purple-200">
            {language === "am" ? "የኢንዱስትሪ ፋሲሊቲ" : "Manufacturing Asset"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {factoryItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    {item.label}
                  </span>
                  <span className="text-sm font-bold text-slate-900 mt-0.5 truncate">
                    {item.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 3. SHOPS FOR RENT SPECIFICATIONS
  if (category === "shops-for-rent") {
    const shopItems = [
      { label: t("floorArea"), value: specs.floorArea || (specs.area ? `${specs.area} m²` : null), icon: Maximize2 },
      { label: t("floorLevel"), value: specs.floorLevel, icon: Layers },
      { label: t("propertyType"), value: specs.propertyType, icon: Building },
      { label: t("parking"), value: specs.parkingSpaces || (specs.parking ? `${specs.parking} Spots` : null), icon: Car },
      { label: "Electrical Power", value: specs.powerSupply, icon: Zap },
      { label: "Water & Restrooms", value: specs.waterSupply, icon: Droplet },
      { label: "Deposit Terms", value: specs.depositRequirement, icon: DollarSign },
      { label: t("location"), value: listing.location, icon: Compass },
    ].filter((item) => item.value);

    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            {language === "am" ? "የንግድ ሱቁ ዝርዝር መረጃዎች" : "Commercial Space Specifications"}
          </h3>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
            {language === "am" ? "ለንግድ የሚሆን" : "Commercial Space"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {shopItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    {item.label}
                  </span>
                  <span className="text-sm font-bold text-slate-900 mt-0.5 truncate">
                    {item.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 4. VEHICLES SPECIFICATIONS
  if (category === "vehicles" || category === "car") {
    const vehicleItems = [
      { label: t("manufacturer"), value: specs.manufacturer, icon: Car },
      { label: t("model"), value: specs.model, icon: Key },
      { label: t("year"), value: specs.year, icon: Calendar },
      { label: t("mileage"), value: specs.mileage, icon: Gauge },
      { label: t("transmission"), value: specs.transmission, icon: Settings2 },
      { label: t("fuelType"), value: specs.fuelType, icon: Fuel },
      { label: t("engineCapacity"), value: specs.engineCapacity, icon: Zap },
      { label: t("condition"), value: specs.condition, icon: ShieldCheck },
      { label: t("color"), value: specs.color, icon: Palette },
      { label: "Plate / Registration", value: specs.plateNumber, icon: FileCheck },
    ].filter((item) => item.value);

    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            {language === "am" ? "የተሽከርካሪው ዝርዝር መረጃዎች" : "Vehicle Technical Specifications"}
          </h3>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200">
            {language === "am" ? "ተሽከርካሪ" : "Automotive"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {vehicleItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    {item.label}
                  </span>
                  <span className="text-sm font-bold text-slate-900 mt-0.5 truncate">
                    {item.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 5. HOUSES FOR RENT & PROPERTIES (SALE) SPECIFICATIONS
  const isForSale = category === "properties" || category === "house" || category === "apartment" || category === "land";
  const houseItems = [
    {
      label: t("bedrooms"),
      value: specs.bedrooms !== undefined ? `${specs.bedrooms} ${t("bedrooms")}` : null,
      icon: Bed,
    },
    {
      label: t("bathrooms"),
      value: specs.bathrooms !== undefined ? `${specs.bathrooms} ${t("bathrooms")}` : null,
      icon: Bath,
    },
    {
      label: t("floorArea"),
      value: specs.floorArea || (specs.area ? `${specs.area} m²` : null),
      icon: Maximize2,
    },
    {
      label: t("landArea"),
      value: specs.landArea,
      icon: Maximize2,
    },
    { label: t("floors"), value: specs.floors ? `${specs.floors} Floors` : null, icon: Layers },
    {
      label: t("parking"),
      value: specs.parkingSpaces || (specs.parking ? `${specs.parking} Cars` : null),
      icon: Car,
    },
    {
      label: t("propertyType"),
      value: specs.propertyType || listing.propertyType,
      icon: Building,
    },
    { label: t("furnishing"), value: specs.furnishing, icon: Armchair },
    { label: "Title Deed / Carta Status", value: specs.titleDeed || specs.titleCarta, icon: FileCheck },
    { label: t("location"), value: listing.location, icon: Compass },
  ].filter((item) => item.value !== null && item.value !== undefined);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900">
          {language === "am"
            ? isForSale
              ? "የንብረቱ ዝርዝር መረጃዎች"
              : "የመኖሪያ ቤቱ ዝርዝር መረጃዎች"
            : isForSale
            ? "Property Specifications"
            : "Residential Property Specifications"}
        </h3>
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${
            isForSale
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-amber-50 text-amber-800 border-amber-200"
          }`}
        >
          {language === "am"
            ? isForSale
              ? "ለሽያጭ የቀረበ"
              : "ለኪራይ የቀረበ"
            : isForSale
            ? "For Sale"
            : "For Rent"}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {houseItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3"
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isForSale ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  {item.label}
                </span>
                <span className="text-sm font-bold text-slate-900 mt-0.5 truncate">
                  {item.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
