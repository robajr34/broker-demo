"use client";

import React from "react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { useLanguage } from "@/lib/context/LanguageContext";

export default function VehicleFields({ specifications = {}, onChange }) {
  const { t } = useLanguage();

  const handleChange = (field, value) => {
    onChange({
      ...specifications,
      [field]: value,
    });
  };

  const transmissionOptions = [
    { value: "Automatic", label: "Automatic" },
    { value: "Manual", label: "Manual" },
    { value: "CVT", label: "CVT" },
  ];

  const fuelOptions = [
    { value: "Petrol", label: "Petrol / Benzine" },
    { value: "Diesel", label: "Diesel" },
    { value: "Hybrid", label: "Hybrid" },
    { value: "Electric", label: "Electric (EV)" },
  ];

  const conditionOptions = [
    { value: "Brand New (0 km)", label: "Brand New (0 km)" },
    { value: "Excellent / Like New", label: "Excellent / Like New" },
    { value: "Very Clean", label: "Very Clean" },
    { value: "Good", label: "Good" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Input
        label={t("manufacturer")}
        placeholder="e.g. Toyota, Hyundai"
        required
        value={specifications.manufacturer || ""}
        onChange={(e) => handleChange("manufacturer", e.target.value)}
      />

      <Input
        label={t("model")}
        placeholder="e.g. Land Cruiser, Hilux, Tucson"
        required
        value={specifications.model || ""}
        onChange={(e) => handleChange("model", e.target.value)}
      />

      <Input
        type="number"
        label={t("year")}
        placeholder="e.g. 2023"
        required
        value={specifications.year || ""}
        onChange={(e) => handleChange("year", Number(e.target.value))}
      />

      <Input
        label={t("mileage")}
        placeholder="e.g. 24,000 km"
        value={specifications.mileage || ""}
        onChange={(e) => handleChange("mileage", e.target.value)}
      />

      <Select
        label={t("transmission")}
        options={transmissionOptions}
        value={specifications.transmission || "Automatic"}
        onChange={(e) => handleChange("transmission", e.target.value)}
      />

      <Select
        label={t("fuelType")}
        options={fuelOptions}
        value={specifications.fuelType || "Petrol"}
        onChange={(e) => handleChange("fuelType", e.target.value)}
      />

      <Input
        label={t("engineCapacity")}
        placeholder="e.g. 2.8L GD-6 or 3.5L V6"
        value={specifications.engineCapacity || ""}
        onChange={(e) => handleChange("engineCapacity", e.target.value)}
      />

      <Select
        label={t("condition")}
        options={conditionOptions}
        value={specifications.condition || "Excellent / Like New"}
        onChange={(e) => handleChange("condition", e.target.value)}
      />

      <Input
        label={t("color")}
        placeholder="e.g. Pearl White, Silver, Black"
        value={specifications.color || ""}
        onChange={(e) => handleChange("color", e.target.value)}
      />
    </div>
  );
}

