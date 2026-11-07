"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useDelala } from "@/lib/context/DelalaContext";
import { useToast } from "@/lib/context/ToastContext";
import AdminLayout from "@/components/layout/AdminLayout";
import PageHeader from "@/components/common/PageHeader";
import Table from "@/components/common/Table";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Dropdown from "@/components/ui/Dropdown";
import {
  MessageSquare,
  Phone,
  MessageCircle,
  Search,
  ArrowUpDown,
  User,
  Calendar,
  CheckCircle,
} from "lucide-react";

export default function AdminInquiriesPage() {
  const { t } = useLanguage();
  const { inquiries, updateInquiryStatus } = useDelala();
  const { addToast } = useToast();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredInquiries = inquiries.filter((inq) => {
    if (search) {
      const q = search.toLowerCase();
      const matchName = (inq.customerName || "").toLowerCase().includes(q);
      const matchPhone = (inq.phone || "").toLowerCase().includes(q);
      const matchListing = (inq.listingTitle || "").toLowerCase().includes(q);
      const matchMsg = (inq.message || "").toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchListing && !matchMsg) return false;
    }

    if (statusFilter !== "all" && inq.status !== statusFilter) return false;

    return true;
  });

  const handleStatusUpdate = (id, newStatus) => {
    updateInquiryStatus(id, newStatus);
    addToast(`Inquiry status updated to ${newStatus}`, "info");
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "new":
        return <Badge variant="new" size="sm" showDot>{t("stageNew")}</Badge>;
      case "contacted":
        return <Badge variant="info" size="sm" showDot>{t("stageContacted")}</Badge>;
      case "negotiating":
        return <Badge variant="warning" size="sm" showDot>{t("stageNegotiating")}</Badge>;
      case "converted":
        return <Badge variant="success" size="sm" showDot>{t("stageConverted")}</Badge>;
      case "closed":
        return <Badge variant="archived" size="sm">{t("stageClosed")}</Badge>;
      default:
        return <Badge variant="default" size="sm">{status}</Badge>;
    }
  };

  const tableHeaders = [
    { label: "Customer", key: "customer" },
    { label: "Listing / Property", key: "listing" },
    { label: "Inquiry Message", key: "msg" },
    { label: "Stage", key: "status" },
    { label: "Date", key: "date" },
    { label: "Direct Action", key: "actions", className: "text-right" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader
          title={t("adminInquiries")}
          subtitle={`Manage client inquiries, negotiate deals, and follow up directly via phone and WhatsApp.`}
          breadcrumbs={[
            { label: "Admin", href: "/admin" },
            { label: "Inquiries Pipeline" },
          ]}
        />

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-8">
            <Input
              placeholder="Search by customer name, phone, message, or listing title..."
              icon={Search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="md:col-span-4">
            <Select
              options={[
                { value: "all", label: "All Inquiry Stages" },
                { value: "new", label: t("stageNew") },
                { value: "contacted", label: t("stageContacted") },
                { value: "negotiating", label: t("stageNegotiating") },
                { value: "converted", label: t("stageConverted") },
                { value: "closed", label: t("stageClosed") },
              ]}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            />
          </div>
        </div>

        {/* Inquiries Table */}
        <Table headers={tableHeaders}>
          {filteredInquiries.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-12 text-center text-slate-400 text-sm">
                No customer inquiries matching this filter.
              </td>
            </tr>
          ) : (
            filteredInquiries.map((inq) => (
              <tr key={inq.id} className="hover:bg-slate-50/80 transition-colors">
                {/* Customer */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0">
                      {inq.customerName.charAt(0)}
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block text-sm">
                        {inq.customerName}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        {inq.phone}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Listing */}
                <td className="px-5 py-4">
                  <span className="text-xs font-bold text-slate-800 line-clamp-1 block">
                    {inq.listingTitle}
                  </span>
                </td>

                {/* Message */}
                <td className="px-5 py-4 max-w-sm">
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    "{inq.message}"
                  </p>
                </td>

                {/* Stage */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5">
                    {getStatusBadge(inq.status)}

                    <Dropdown
                      align="left"
                      trigger={
                        <button
                          type="button"
                          className="p-1 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100"
                          title="Change Pipeline Stage"
                        >
                          <ArrowUpDown className="w-3.5 h-3.5" />
                        </button>
                      }
                      items={[
                        { label: "Set New", onClick: () => handleStatusUpdate(inq.id, "new") },
                        { label: "Set Contacted", onClick: () => handleStatusUpdate(inq.id, "contacted") },
                        { label: "Set Negotiating", onClick: () => handleStatusUpdate(inq.id, "negotiating") },
                        { label: "Set Converted / Sold", onClick: () => handleStatusUpdate(inq.id, "converted") },
                        { label: "Set Closed / Lost", onClick: () => handleStatusUpdate(inq.id, "closed") },
                      ]}
                    />
                  </div>
                </td>

                {/* Date */}
                <td className="px-5 py-4 text-xs text-slate-500">
                  {new Date(inq.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>

                {/* Direct Action */}
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {inq.phone && (
                      <a
                        href={`tel:${inq.phone.replace(/\s+/g, "")}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-800 text-xs font-semibold transition-colors"
                        title={t("quickCall")}
                      >
                        <Phone className="w-3.5 h-3.5 text-amber-600" />
                        <span>Call</span>
                      </a>
                    )}

                    {inq.phone && (
                      <a
                        href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                          `Hello ${inq.customerName}, this is Abebe Tadesse from EthioDelala regarding your inquiry on ${inq.listingTitle}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold transition-colors"
                        title={t("quickWhatsApp")}
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>WhatsApp</span>
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </Table>
      </div>
    </AdminLayout>
  );
}

