"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useDelala } from "@/lib/context/DelalaContext";
import { useToast } from "@/lib/context/ToastContext";
import AdminLayout from "@/components/layout/AdminLayout";
import PageHeader from "@/components/common/PageHeader";
import Table from "@/components/common/Table";
import ListingStatusBadge from "@/components/listings/ListingStatusBadge";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Modal from "@/components/ui/Modal";
import ListingCard from "@/components/listings/ListingCard";
import Dropdown from "@/components/ui/Dropdown";
import {
  PlusCircle,
  Search,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  CheckCircle,
  Clock,
  ArrowUpDown,
  Tag,
  DollarSign,
  ShieldAlert,
} from "lucide-react";

export default function AdminListingsPage() {
  const { t, formatPrice } = useLanguage();
  const { adminListings, deleteListing, updateListingStatus } = useDelala();
  const { addToast } = useToast();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Dialog & Modal states
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);

  const categoryOptions = [
    { value: "all", label: "All Categories" },
    { value: "house", label: t("categoryHouse") },
    { value: "apartment", label: t("categoryApartment") },
    { value: "commercial", label: t("categoryCommercial") },
    { value: "land", label: t("categoryLand") },
    { value: "car", label: t("categoryCar") },
  ];

  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "available", label: t("statusAvailable") },
    { value: "new", label: t("statusNew") },
    { value: "reserved", label: t("statusReserved") },
    { value: "sold", label: t("statusSold") },
    { value: "draft", label: t("statusDraft") },
    { value: "archived", label: t("statusArchived") },
  ];

  const filteredListings = useMemo(() => {
    return adminListings.filter((item) => {
      if (search) {
        const q = search.toLowerCase();
        const matchTitle = (item.title || "").toLowerCase().includes(q);
        const matchTitleAm = (item.titleAm || "").toLowerCase().includes(q);
        const matchRef = (item.referenceNo || "").toLowerCase().includes(q);
        const matchLoc = (item.location || "").toLowerCase().includes(q);
        if (!matchTitle && !matchTitleAm && !matchRef && !matchLoc) return false;
      }

      if (categoryFilter !== "all" && item.category !== categoryFilter) return false;
      if (statusFilter !== "all" && item.status !== statusFilter) return false;

      return true;
    });
  }, [adminListings, search, categoryFilter, statusFilter]);

  const handleDeleteConfirm = () => {
    if (!deleteTargetId) return;
    setIsDeleting(true);
    setTimeout(() => {
      deleteListing(deleteTargetId);
      setIsDeleting(false);
      setDeleteTargetId(null);
      addToast(t("actionSuccessful"), "success");
    }, 300);
  };

  const handleQuickStatusChange = (id, newStatus) => {
    updateListingStatus(id, newStatus);
    addToast(`Listing status updated to ${newStatus}`, "info");
  };

  const tableHeaders = [
    { label: "Listing / Reference", key: "title" },
    { label: "Category", key: "category" },
    { label: "Public Asking Price", key: "price" },
    { label: "Acquisition Cost (Private)", key: "acq" },
    { label: "Estimated Margin", key: "margin" },
    { label: "Status", key: "status" },
    { label: "Actions", key: "actions", className: "text-right" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader
          title={t("adminAllListings")}
          subtitle={`Manage your full brokerage inventory of ${adminListings.length} listings. View confidential acquisition margins, edit specs, and adjust statuses.`}
          breadcrumbs={[
            { label: "Admin", href: "/admin" },
            { label: "Listings" },
          ]}
          action={
            <Link href="/admin/listings/new">
              <Button variant="primary" size="md" icon={PlusCircle}>
                {t("adminAddNewListing")}
              </Button>
            </Link>
          }
        />

        {/* Filters and Search Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-6">
            <Input
              placeholder="Search by title, reference number or location..."
              icon={Search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="md:col-span-3">
            <Select
              options={categoryOptions}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            />
          </div>

          <div className="md:col-span-3">
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            />
          </div>
        </div>

        {/* Listings Table */}
        <Table headers={tableHeaders}>
          {filteredListings.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-12 text-center text-slate-400 text-sm">
                No listings found matching your search.
              </td>
            </tr>
          ) : (
            filteredListings.map((listing) => {
              const estimatedMargin =
                (Number(listing.publicPrice) || 0) -
                (Number(listing.acquisitionPrice) || 0) -
                (Number(listing.privateDiscount) || 0) -
                (Number(listing.additionalExpenses) || 0);

              return (
                <tr
                  key={listing.id}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  {/* Title & Reference */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={listing.primaryImage || listing.images?.[0]}
                        alt={listing.title}
                        className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200"
                      />
                      <div className="max-w-xs truncate">
                        <Link
                          href={`/admin/listings/${listing.id}/edit`}
                          className="font-bold text-slate-900 hover:text-amber-700 transition-colors truncate block text-sm"
                        >
                          {listing.title}
                        </Link>
                        <span className="text-xs text-slate-400 font-mono">
                          Ref: {listing.referenceNo} • {listing.location}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-1 rounded-md">
                      {listing.category}
                    </span>
                  </td>

                  {/* Public Price */}
                  <td className="px-5 py-4 font-bold text-slate-900 text-sm">
                    {formatPrice(listing.publicPrice)}
                  </td>

                  {/* Acquisition Cost (PRIVATE) */}
                  <td className="px-5 py-4">
                    <span className="text-xs font-bold text-slate-600 block">
                      {formatPrice(listing.acquisitionPrice)}
                    </span>
                    <span className="text-[10px] text-amber-700 font-semibold">
                      Private Cost
                    </span>
                  </td>

                  {/* Estimated Margin (PRIVATE) */}
                  <td className="px-5 py-4">
                    <span
                      className={`text-xs font-black ${
                        estimatedMargin >= 0 ? "text-emerald-600" : "text-rose-600"
                      }`}
                    >
                      {formatPrice(estimatedMargin)}
                    </span>
                  </td>

                  {/* Status & Quick Status Picker */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <ListingStatusBadge
                        status={listing.status}
                        isFeatured={listing.isFeatured}
                        size="sm"
                      />

                      {/* Quick status dropdown */}
                      <Dropdown
                        align="left"
                        trigger={
                          <button
                            type="button"
                            className="p-1 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100"
                            title="Quick Status Change"
                          >
                            <ArrowUpDown className="w-3.5 h-3.5" />
                          </button>
                        }
                        items={[
                          {
                            label: "Set Available",
                            onClick: () =>
                              handleQuickStatusChange(listing.id, "available"),
                          },
                          {
                            label: "Set Reserved",
                            onClick: () =>
                              handleQuickStatusChange(listing.id, "reserved"),
                          },
                          {
                            label: "Set Sold",
                            onClick: () =>
                              handleQuickStatusChange(listing.id, "sold"),
                          },
                          {
                            label: "Set Draft",
                            onClick: () =>
                              handleQuickStatusChange(listing.id, "draft"),
                          },
                          {
                            label: "Set Archived",
                            onClick: () =>
                              handleQuickStatusChange(listing.id, "archived"),
                          },
                        ]}
                      />
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* Public Preview */}
                      <button
                        type="button"
                        onClick={() => setPreviewItem(listing)}
                        title="Preview Public Card"
                        className="p-2 text-slate-500 hover:text-amber-700 hover:bg-amber-50 rounded-xl transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Edit */}
                      <Link href={`/admin/listings/${listing.id}/edit`}>
                        <button
                          type="button"
                          title="Edit Listing"
                          className="p-2 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </Link>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => setDeleteTargetId(listing.id)}
                        title="Delete Listing"
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </Table>

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          isOpen={Boolean(deleteTargetId)}
          onClose={() => setDeleteTargetId(null)}
          onConfirm={handleDeleteConfirm}
          title={t("confirmDeleteTitle")}
          message={t("confirmDeleteMsg")}
          confirmLabel={t("delete")}
          cancelLabel={t("cancel")}
          variant="danger"
          isLoading={isDeleting}
        />

        {/* Quick Public Preview Modal */}
        <Modal
          isOpen={Boolean(previewItem)}
          onClose={() => setPreviewItem(null)}
          title="Listing Card Preview"
          subtitle="Sanitized public view — confirmed free of broker acquisition costs."
          size="md"
        >
          {previewItem && (
            <div className="py-2 flex justify-center">
              <div className="w-full max-w-sm">
                <ListingCard listing={previewItem} />
              </div>
            </div>
          )}
        </Modal>
      </div>
    </AdminLayout>
  );
}

