"use client";

import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import PageHeader from "@/components/common/PageHeader";
import ListingForm from "@/components/forms/ListingForm";
import { useDelala } from "@/lib/context/DelalaContext";
import { useLanguage } from "@/lib/context/LanguageContext";

export default function NewListingPage() {
  const { t } = useLanguage();
  const { createListing } = useDelala();

  const handleCreate = async (formData) => {
    return createListing(formData);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <PageHeader
          title={t("createListingTitle")}
          subtitle="Publish a verified residential property, commercial building, development plot, or vehicle to the marketplace."
          breadcrumbs={[
            { label: "Admin", href: "/admin" },
            { label: "Listings", href: "/admin/listings" },
            { label: "New Listing" },
          ]}
        />

        <ListingForm onSubmit={handleCreate} isEdit={false} />
      </div>
    </AdminLayout>
  );
}

