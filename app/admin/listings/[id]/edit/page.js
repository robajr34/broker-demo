"use client";

import React, { use } from "react";
import { notFound, useRouter } from "next/navigation";
import AdminLayout from "@/components/layout/AdminLayout";
import PageHeader from "@/components/common/PageHeader";
import ListingForm from "@/components/forms/ListingForm";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useDelala } from "@/lib/context/DelalaContext";
import { useLanguage } from "@/lib/context/LanguageContext";

export default function EditListingPage({ params }) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;

  const { t } = useLanguage();
  const { adminListings, updateListing, isLoading } = useDelala();
  const router = useRouter();

  const listing = adminListings.find((l) => l.id === id);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="py-20 flex justify-center">
          <LoadingSpinner size="lg" text="Loading Listing Information..." />
        </div>
      </AdminLayout>
    );
  }

  if (!listing) {
    return (
      <AdminLayout>
        <div className="py-20 text-center space-y-4">
          <h2 className="text-xl font-bold text-slate-800">Listing Not Found</h2>
          <p className="text-sm text-slate-500">The listing could not be found.</p>
        </div>
      </AdminLayout>
    );
  }

  const handleUpdate = async (formData) => {
    return updateListing(id, formData);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <PageHeader
          title={`${t("editListingTitle")}: ${listing.title}`}
          subtitle={`Editing reference ${listing.referenceNo}. Modify pricing, upload additional photos, or change specs.`}
          breadcrumbs={[
            { label: "Admin", href: "/admin" },
            { label: "Listings", href: "/admin/listings" },
            { label: "Edit" },
          ]}
        />

        <ListingForm initialData={listing} onSubmit={handleUpdate} isEdit={true} />
      </div>
    </AdminLayout>
  );
}

