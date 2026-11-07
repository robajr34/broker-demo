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
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import {
  Receipt,
  PlusCircle,
  Calendar,
  User,
  DollarSign,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  ShieldCheck,
  Calculator,
} from "lucide-react";

export default function SalesManagementPage() {
  const { t, formatPrice } = useLanguage();
  const { sales, adminListings, recordSale } = useDelala();
  const { addToast } = useToast();

  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state for recording sale
  const [saleForm, setSaleForm] = useState({
    listingId: "",
    actualSellingPrice: "",
    buyerName: "",
    buyerPhone: "",
    buyerEmail: "",
    saleDate: new Date().toISOString().split("T")[0],
    additionalExpenses: 0,
    paymentStatus: "completed",
  });

  // Listings eligible to be sold (available or reserved, NOT already recorded in sales)
  const soldListingIds = new Set(sales.map((s) => s.listingId));
  const eligibleListings = adminListings.filter(
    (l) => !soldListingIds.has(l.id) && l.status !== "sold"
  );

  const selectedListing = adminListings.find((l) => l.id === saleForm.listingId);

  // Auto-fill price when listing selected
  const handleListingSelect = (listingId) => {
    const item = adminListings.find((l) => l.id === listingId);
    setSaleForm({
      ...saleForm,
      listingId,
      actualSellingPrice: item ? item.publicPrice : "",
      additionalExpenses: item ? item.additionalExpenses || 0 : 0,
    });
  };

  // Live profit calculation for modal preview
  const finalPrice = Number(saleForm.actualSellingPrice) || 0;
  const acqCost = selectedListing ? Number(selectedListing.acquisitionPrice) || 0 : 0;
  const extraExp = Number(saleForm.additionalExpenses) || 0;
  const calculatedNetProfit = finalPrice - acqCost - extraExp;

  const handleRecordSubmit = async (e) => {
    e.preventDefault();
    if (!saleForm.listingId || !saleForm.actualSellingPrice) {
      addToast("Please select a listing and enter the actual selling price.", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      recordSale({
        listingId: saleForm.listingId,
        actualSellingPrice: Number(saleForm.actualSellingPrice),
        buyer: {
          name: saleForm.buyerName || "Direct Client",
          phone: saleForm.buyerPhone || "",
          email: saleForm.buyerEmail || "",
        },
        saleDate: saleForm.saleDate,
        additionalExpenses: Number(saleForm.additionalExpenses) || 0,
        paymentStatus: saleForm.paymentStatus,
      });

      addToast("Sale recorded successfully! Status updated to SOLD.", "success");
      setIsRecordModalOpen(false);
      setSaleForm({
        listingId: "",
        actualSellingPrice: "",
        buyerName: "",
        buyerPhone: "",
        buyerEmail: "",
        saleDate: new Date().toISOString().split("T")[0],
        additionalExpenses: 0,
        paymentStatus: "completed",
      });
    } catch (err) {
      addToast(err?.message || "Error recording sale.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const tableHeaders = [
    { label: "Listing Sold", key: "title" },
    { label: "Buyer", key: "buyer" },
    { label: "Actual Selling Price", key: "price" },
    { label: "Acquisition Cost", key: "cost" },
    { label: "Additional Expenses", key: "exp" },
    { label: "Net Broker Profit", key: "profit" },
    { label: "Date / Status", key: "status" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader
          title={t("adminSales")}
          subtitle="Closed sales ledger. Verified final transaction figures with accurate broker margin accounting."
          breadcrumbs={[
            { label: "Admin", href: "/admin" },
            { label: "Sales Transactions" },
          ]}
          action={
            <Button
              variant="primary"
              size="md"
              icon={PlusCircle}
              onClick={() => setIsRecordModalOpen(true)}
            >
              {t("recordSaleTitle")}
            </Button>
          }
        />

        {/* Ledger Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold text-slate-400 block">
                Total Closed Deals
              </span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">
                {sales.length}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Receipt className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold text-slate-400 block">
                Total Revenue
              </span>
              <span className="text-2xl font-black text-slate-900 mt-1 block text-amber-700">
                {formatPrice(sales.reduce((acc, s) => acc + (Number(s.actualSellingPrice) || 0), 0))}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold text-slate-400 block">
                Total Net Profit (Private)
              </span>
              <span className="text-2xl font-black text-emerald-600 mt-1 block">
                {formatPrice(sales.reduce((acc, s) => acc + (Number(s.netProfit) || 0), 0))}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Sales Ledger Table */}
        <Table headers={tableHeaders}>
          {sales.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-12 text-center text-slate-400 text-sm">
                No closed sales transactions recorded yet. Click "Record Closed Sale" to record a deal.
              </td>
            </tr>
          ) : (
            sales.map((sale) => (
              <tr key={sale.id} className="hover:bg-slate-50/80 transition-colors">
                {/* Listing Title */}
                <td className="px-5 py-4">
                  <span className="font-bold text-slate-900 block text-sm">
                    {sale.listingTitle}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    ID: {sale.id} • {sale.category?.toUpperCase()}
                  </span>
                </td>

                {/* Buyer */}
                <td className="px-5 py-4">
                  <div className="text-xs">
                    <span className="font-bold text-slate-800 block">
                      {sale.buyer?.name || "Direct Client"}
                    </span>
                    <span className="text-slate-500">{sale.buyer?.phone || "—"}</span>
                  </div>
                </td>

                {/* Actual Selling Price */}
                <td className="px-5 py-4 font-black text-slate-900 text-sm">
                  {formatPrice(sale.actualSellingPrice)}
                </td>

                {/* Acquisition Cost Snapshot */}
                <td className="px-5 py-4 text-xs font-semibold text-slate-600">
                  {formatPrice(sale.acquisitionCostSnapshot)}
                </td>

                {/* Additional Expenses */}
                <td className="px-5 py-4 text-xs font-semibold text-slate-600">
                  {formatPrice(sale.additionalExpenses)}
                </td>

                {/* Net Profit */}
                <td className="px-5 py-4">
                  <span
                    className={`font-black text-sm ${
                      sale.netProfit >= 0 ? "text-emerald-600" : "text-rose-600"
                    }`}
                  >
                    +{formatPrice(sale.netProfit)}
                  </span>
                </td>

                {/* Date & Payment Status */}
                <td className="px-5 py-4">
                  <div className="space-y-1">
                    <span className="text-xs text-slate-500 font-medium block">
                      {sale.saleDate}
                    </span>
                    <Badge
                      variant={sale.paymentStatus === "completed" ? "success" : "warning"}
                      size="sm"
                    >
                      {sale.paymentStatus === "completed" ? "Paid in Full" : "Pending"}
                    </Badge>
                  </div>
                </td>
              </tr>
            ))
          )}
        </Table>

        {/* Record Sale Modal */}
        <Modal
          isOpen={isRecordModalOpen}
          onClose={() => setIsRecordModalOpen(false)}
          title={t("recordSaleTitle")}
          subtitle={t("recordSaleSubtitle")}
          size="lg"
        >
          <form onSubmit={handleRecordSubmit} className="space-y-5 py-2">
            {/* 1. Select Listing */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                {t("selectListingToSell")} *
              </label>
              <select
                required
                value={saleForm.listingId}
                onChange={(e) => handleListingSelect(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
              >
                <option value="">-- Choose an Available or Reserved Listing --</option>
                {eligibleListings.map((l) => (
                  <option key={l.id} value={l.id}>
                    [{l.referenceNo}] {l.title} — Asking: {formatPrice(l.publicPrice)}
                  </option>
                ))}
              </select>
              {eligibleListings.length === 0 && (
                <p className="text-xs text-amber-700 mt-1">
                  All active listings currently have recorded sales or are in draft.
                </p>
              )}
            </div>

            {/* 2. Actual Selling Price & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                type="number"
                label={`${t("actualSellingPrice")} (ETB) *`}
                required
                placeholder="Final agreed purchase price"
                value={saleForm.actualSellingPrice}
                onChange={(e) =>
                  setSaleForm({ ...saleForm, actualSellingPrice: e.target.value })
                }
              />

              <Input
                type="date"
                label={`${t("saleDate")} *`}
                required
                value={saleForm.saleDate}
                onChange={(e) =>
                  setSaleForm({ ...saleForm, saleDate: e.target.value })
                }
              />
            </div>

            {/* 3. Additional Closing Expenses */}
            <div>
              <Input
                type="number"
                label={`${t("additionalExpenses")} (ETB)`}
                placeholder="Closing expenses, carta fees, broker commissions"
                value={saleForm.additionalExpenses}
                onChange={(e) =>
                  setSaleForm({ ...saleForm, additionalExpenses: e.target.value })
                }
              />
            </div>

            {/* 4. Buyer Details */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Buyer Details (Optional for Records)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Input
                  label={t("buyerName")}
                  placeholder="e.g. Solomon Getachew"
                  value={saleForm.buyerName}
                  onChange={(e) =>
                    setSaleForm({ ...saleForm, buyerName: e.target.value })
                  }
                />
                <Input
                  label={t("buyerPhone")}
                  placeholder="+251 911 000 000"
                  value={saleForm.buyerPhone}
                  onChange={(e) =>
                    setSaleForm({ ...saleForm, buyerPhone: e.target.value })
                  }
                />
                <Select
                  label={t("paymentStatus")}
                  options={[
                    { value: "completed", label: t("paymentCompleted") },
                    { value: "pending", label: t("paymentPending") },
                    { value: "installments", label: t("paymentInstallments") },
                  ]}
                  value={saleForm.paymentStatus}
                  onChange={(e) =>
                    setSaleForm({ ...saleForm, paymentStatus: e.target.value })
                  }
                />
              </div>
            </div>

            {/* 5. Live Profit Breakdown Preview */}
            {selectedListing && (
              <div className="p-4 rounded-xl bg-slate-900 text-white text-xs space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5">
                    <Calculator className="w-4 h-4" />
                    Transaction Margin Calculation
                  </span>
                  <span>Currency: ETB</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-slate-300">
                  <div>
                    <span className="block text-[10px] text-slate-400">Actual Sale Price</span>
                    <strong className="text-white text-xs">{formatPrice(finalPrice)}</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400">Acquisition Cost</span>
                    <strong className="text-white text-xs">{formatPrice(acqCost)}</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400">Closing Expenses</span>
                    <strong className="text-white text-xs">{formatPrice(extraExp)}</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400">Net Broker Profit</span>
                    <strong className="text-emerald-400 text-xs font-black">
                      {formatPrice(calculatedNetProfit)}
                    </strong>
                  </div>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <Button
                variant="outline"
                size="md"
                onClick={() => setIsRecordModalOpen(false)}
              >
                {t("cancel")}
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isSubmitting}
                className="font-bold"
              >
                {t("recordSaleButton")}
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
}

