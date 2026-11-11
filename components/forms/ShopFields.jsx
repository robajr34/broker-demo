"use client";

import React from "react";
import Input from "@/components/ui/Input";
import { useLanguage } from "@/lib/context/LanguageContext";

export default function ShopFields({ specifications = {}, onChange }) {
  const { t } = useLanguage();

  const handleChange = (field, value) => {
    onChange({
      ...specifications,
      [field]: value,
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Input
        label={`${t("floorArea")} (m²)`}
        placeholder="e.g. 85 m²"
        value={specifications.floorArea || ""}
        onChange={(e) => handleChange("floorArea", e.target.value)}
      />

      <Input
        label={t("floorLevel")}
        placeholder="e.g. Ground Floor, 2nd Floor"
        value={specifications.floorLevel || ""}
        onChange={(e) => handleChange("floorLevel", e.target.value)}
      />

      <Input
        label={t("propertyType")}
        placeholder="e.g. Retail Storefront, Mall Unit, Office"
        value={specifications.propertyType || ""}
        onChange={(e) => handleChange("propertyType", e.target.value)}
      />

      <Input
        label={t("parking")}
        placeholder="e.g. 4 Customer Spaces, Basement Parking"
        value={specifications.parkingSpaces || ""}
        onChange={(e) => handleChange("parkingSpaces", e.target.value)}
      />

      <Input
        label="Power Supply"
        placeholder="e.g. Three-Phase Dedicated + Generator"
        value={specifications.powerSupply || ""}
        onChange={(e) => handleChange("powerSupply", e.target.value)}
      />

      <Input
        label="Deposit Terms"
        placeholder="e.g. 3 Months Advance"
        value={specifications.depositRequirement || ""}
        onChange={(e) => handleChange("depositRequirement", e.target.value)}
      />
    </div>
  );
}
