"use client";

import React from "react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { useLanguage } from "@/lib/context/LanguageContext";

export default function FactoryFields({ specifications = {}, onChange }) {
  const { t } = useLanguage();

  const handleChange = (field, value) => {
    onChange({
      ...specifications,
      [field]: value,
    });
  };

  const transactionTypeOptions = [
    { value: "sale", label: t("factorySale") },
    { value: "rent", label: t("factoryRent") },
    { value: "partnership", label: t("factoryPartnership") },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Input
        label={t("industry")}
        placeholder="e.g. Food and Beverage, Textile, Steel"
        value={specifications.industry || ""}
        onChange={(e) => handleChange("industry", e.target.value)}
      />

      <Input
        label={t("facilitySize")}
        placeholder="e.g. 15,000 m² Compound / 5,000 m² Shed"
        value={specifications.facilitySize || ""}
        onChange={(e) => handleChange("facilitySize", e.target.value)}
      />

      <Select
        label={t("listingType")}
        options={transactionTypeOptions}
        value={specifications.transactionType || "sale"}
        onChange={(e) => handleChange("transactionType", e.target.value)}
      />

      <Input
        label={t("partnershipAvailability")}
        placeholder="e.g. 30% - 49% Equity Stake, Outright Sale"
        value={specifications.partnershipAvailability || ""}
        onChange={(e) => handleChange("partnershipAvailability", e.target.value)}
      />

      <Input
        label={t("powerCapacity")}
        placeholder="e.g. 1,000 kVA Dedicated Transformer"
        value={specifications.powerCapacity || ""}
        onChange={(e) => handleChange("powerCapacity", e.target.value)}
      />

      <Input
        label="Operational Status"
        placeholder="e.g. Fully Operating Daily"
        value={specifications.operationalStatus || ""}
        onChange={(e) => handleChange("operationalStatus", e.target.value)}
      />
    </div>
  );
}
