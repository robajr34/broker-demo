"use client";

import React from "react";
import Input from "@/components/ui/Input";
import { useLanguage } from "@/lib/context/LanguageContext";

export default function ImportMaterialFields({ specifications = {}, onChange }) {
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
        label={t("origin")}
        placeholder="e.g. Turkey, Germany, China, UAE"
        value={specifications.origin || ""}
        onChange={(e) => handleChange("origin", e.target.value)}
      />

      <Input
        label={t("quantity")}
        placeholder="e.g. 500 Metric Tons, 40HQ Container"
        value={specifications.quantity || ""}
        onChange={(e) => handleChange("quantity", e.target.value)}
      />

      <Input
        label={t("availability")}
        placeholder="e.g. In Stock at Modjo Dry Port"
        value={specifications.availability || ""}
        onChange={(e) => handleChange("availability", e.target.value)}
      />

      <Input
        label={t("minOrder")}
        placeholder="e.g. 25 Tons, 1 Unit"
        value={specifications.minOrder || ""}
        onChange={(e) => handleChange("minOrder", e.target.value)}
      />

      <Input
        label={t("deliveryTerms")}
        placeholder="e.g. Ex-Works Modjo or Delivered Addis Ababa"
        value={specifications.deliveryTerms || ""}
        onChange={(e) => handleChange("deliveryTerms", e.target.value)}
      />

      <Input
        label="Standards / Certification"
        placeholder="e.g. ASTM A615 / ISO 9001"
        value={specifications.standards || ""}
        onChange={(e) => handleChange("standards", e.target.value)}
      />
    </div>
  );
}
