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
} from "lucide-react";

export default function ListingSpecifications({ listing }) {
  const { t } = useLanguage();

  if (!listing) return null;

  const specs = listing.specifications || {};
  const category = listing.category;

  if (category === "car") {
    const carItems = [
      { label: t("manufacturer"), value: specs.manufacturer, icon: Settings2 },
      { label: t("model"), value: specs.model, icon: Car },
      { label: t("year"), value: specs.year, icon: Calendar },
      { label: t("mileage"), value: specs.mileage, icon: Gauge },
      { label: t("transmission"), value: specs.transmission, icon: Settings2 },
      { label: t("fuelType"), value: specs.fuelType, icon: Fuel },
      { label: t("engineCapacity"), value: specs.engineCapacity, icon: Zap },
      { label: t("condition"), value: specs.condition, icon: ShieldCheck },
      { label: t("color"), value: specs.color, icon: Palette },
    ].filter((item) => item.value);

    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          {t("vehicleSpecifications")}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {carItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-100/80 text-amber-700 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    {item.label}
                  </span>
                  <span className="text-sm font-bold text-slate-900 mt-0.5">
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

  if (category === "land") {
    const landItems = [
      {
        label: t("landArea"),
        value: specs.landArea ? `${specs.landArea} m²` : null,
        icon: Maximize2,
      },
      { label: t("landType"), value: specs.landType, icon: Layers },
      { label: t("roadAccess"), value: specs.roadAccess, icon: Compass },
      {
        label: t("waterElectricity"),
        value: specs.waterElectricity,
        icon: Zap,
      },
      { label: t("location"), value: listing.location, icon: Compass },
    ].filter((item) => item.value);

    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          {t("landSpecifications")}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {landItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-100/80 text-amber-700 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    {item.label}
                  </span>
                  <span className="text-sm font-bold text-slate-900 mt-0.5">
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

  // Residential Properties, Apartments & Commercial
  const propertyItems = [
    {
      label: t("bedrooms"),
      value: specs.bedrooms !== undefined ? `${specs.bedrooms}` : null,
      icon: Bed,
    },
    {
      label: t("bathrooms"),
      value: specs.bathrooms !== undefined ? `${specs.bathrooms}` : null,
      icon: Bath,
    },
    {
      label: t("area"),
      value: specs.area ? `${specs.area} m²` : null,
      icon: Maximize2,
    },
    { label: t("floors"), value: specs.floors, icon: Layers },
    {
      label: t("parking"),
      value: specs.parking ? `${specs.parking} Cars` : null,
      icon: Car,
    },
    {
      label: t("propertyType"),
      value: specs.propertyType || listing.propertyType,
      icon: Compass,
    },
    { label: t("furnishing"), value: specs.furnishing, icon: Armchair },
  ].filter((item) => item.value !== null && item.value !== undefined);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4">
      <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
        {t("propertySpecifications")}
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {propertyItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-100/80 text-amber-700 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  {item.label}
                </span>
                <span className="text-sm font-bold text-slate-900 mt-0.5">
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

