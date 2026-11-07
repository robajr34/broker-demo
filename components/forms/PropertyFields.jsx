"use client";

import React from "react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { useLanguage } from "@/lib/context/LanguageContext";

export default function PropertyFields({ specifications = {}, onChange }) {
  const { t } = useLanguage();

  const handleChange = (field, value) => {
    onChange({
      ...specifications,
      [field]: value,
    });
  };

  const furnishingOptions = [
    { value: "Unfurnished", label: "Unfurnished" },
    { value: "Semi-Furnished", label: "Semi-Furnished" },
    { value: "Fully Furnished", label: "Fully Furnished" },
  ];

  const propertyTypeOptions = [
    { value: "Standalone Villa", label: "Standalone Villa" },
    { value: "G+2 Villa", label: "G+2 Villa" },
    { value: "G+3 Luxury Villa", label: "G+3 Luxury Villa" },
    { value: "Apartment", label: "Apartment" },
    { value: "Duplex Penthouse", label: "Duplex Penthouse" },
    { value: "Townhouse", label: "Townhouse" },
    { value: "Commercial Mixed-Use", label: "Commercial Mixed-Use" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Input
        type="number"
        label={t("bedrooms")}
        placeholder="e.g. 4"
        value={specifications.bedrooms || ""}
        onChange={(e) => handleChange("bedrooms", Number(e.target.value))}
      />

      <Input
        type="number"
        label={t("bathrooms")}
        placeholder="e.g. 3"
        value={specifications.bathrooms || ""}
        onChange={(e) => handleChange("bathrooms", Number(e.target.value))}
      />

      <Input
        type="number"
        label={`${t("area")} (m²)`}
        placeholder="e.g. 280"
        value={specifications.area || ""}
        onChange={(e) => handleChange("area", Number(e.target.value))}
      />

      <Input
        type="number"
        label={t("floors")}
        placeholder="e.g. 2"
        value={specifications.floors || ""}
        onChange={(e) => handleChange("floors", Number(e.target.value))}
      />

      <Input
        type="number"
        label={t("parking")}
        placeholder="e.g. 3"
        value={specifications.parking || ""}
        onChange={(e) => handleChange("parking", Number(e.target.value))}
      />

      <Select
        label={t("furnishing")}
        options={furnishingOptions}
        value={specifications.furnishing || "Unfurnished"}
        onChange={(e) => handleChange("furnishing", e.target.value)}
      />

      <div className="sm:col-span-2 lg:col-span-3">
        <Select
          label={t("propertyType")}
          options={propertyTypeOptions}
          value={specifications.propertyType || "Standalone Villa"}
          onChange={(e) => handleChange("propertyType", e.target.value)}
        />
      </div>
    </div>
  );
}

