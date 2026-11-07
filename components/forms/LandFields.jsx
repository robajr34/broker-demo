"use client";

import React from "react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { useLanguage } from "@/lib/context/LanguageContext";

export default function LandFields({ specifications = {}, onChange }) {
  const { t } = useLanguage();

  const handleChange = (field, value) => {
    onChange({
      ...specifications,
      [field]: value,
    });
  };

  const roadOptions = [
    { value: "Direct Asphalt Highway", label: "Direct Asphalt Highway" },
    { value: "Cobblestone Road", label: "Cobblestone Road" },
    { value: "Gravel Road (< 100m from Asphalt)", label: "Gravel Road (< 100m from Asphalt)" },
    { value: "Gravel Access Road", label: "Gravel Access Road" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Input
        type="number"
        label={`${t("landArea")} (m²)`}
        placeholder="e.g. 500"
        required
        value={specifications.landArea || ""}
        onChange={(e) => handleChange("landArea", Number(e.target.value))}
      />

      <Input
        label={t("landType")}
        placeholder="e.g. Residential, Commercial, Industrial, Hospitality"
        value={specifications.landType || ""}
        onChange={(e) => handleChange("landType", e.target.value)}
      />

      <Select
        label={t("roadAccess")}
        options={roadOptions}
        value={specifications.roadAccess || "Direct Asphalt Highway"}
        onChange={(e) => handleChange("roadAccess", e.target.value)}
      />

      <Input
        label={t("waterElectricity")}
        placeholder="e.g. Connected on site / Adjacent"
        value={specifications.waterElectricity || ""}
        onChange={(e) => handleChange("waterElectricity", e.target.value)}
      />
    </div>
  );
}

