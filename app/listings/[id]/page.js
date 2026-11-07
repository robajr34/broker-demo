"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useDelala } from "@/lib/context/DelalaContext";
import { useToast } from "@/lib/context/ToastContext";
import PublicNavbar from "@/components/layout/PublicNavbar";
import PublicFooter from "@/components/layout/PublicFooter";
import ListingGallery from "@/components/listings/ListingGallery";
import ListingSpecifications from "@/components/listings/ListingSpecifications";
import ListingStatusBadge from "@/components/listings/ListingStatusBadge";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {
  MapPin,
  Phone,
  MessageCircle,
  Share2,
  ChevronLeft,
  CheckCircle2,
  ShieldCheck,
  Building2,
  AlertCircle,
  Clock,
  Sparkles,
} from "lucide-react";

export default function ListingDetailPage({ params }) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;

  const { language, t, getLocalizedField, formatPrice } = useLanguage();
  const { listings, settings, createInquiry, isLoading } = useDelala();
  const { addToast } = useToast();

  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);

  const listing = listings.find((l) => l.id === id || l.slug === id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <PublicNavbar />
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner size="lg" text="Loading Listing Details..." />
        </div>
        <PublicFooter />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <PublicNavbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-rose-500" />
          <h2 className="text-xl font-bold text-slate-900">Listing Not Found</h2>
          <p className="text-sm text-slate-500 max-w-sm">
            The requested property or vehicle listing may have been moved, sold, or deleted.
          </p>
          <Link href="/listings">
            <Button variant="primary" size="md">
              {t("backToListings")}
            </Button>
          </Link>
        </div>
        <PublicFooter />
      </div>
    );
  }

  const title = getLocalizedField(listing, "title");
  const description = getLocalizedField(listing, "description");
  const isSold = listing.status === "sold";

  // Contact resolution: listing custom override or default business settings
  const brokerName =
    listing.contact?.brokerName ||
    (language === "am" ? (settings?.brokerNameAm || settings?.brokerName) : settings?.brokerName) ||
    "Abebe Tadesse";
  const brokerPhone = listing.contact?.phone || settings?.phone || "+251 911 234 567";
  const brokerWhatsApp = listing.contact?.whatsapp || settings?.whatsapp || "+251 911 234 567";
  const brokerEmail = listing.contact?.email || settings?.email || "contact@ethiodelala.com";
  const brokerPhoto =
    settings?.brokerPhoto ||
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80";

  // Pre-filled WhatsApp message
  const whatsappText = encodeURIComponent(
    `${t("whatsappPrefill")}${title} (Ref: ${listing.referenceNo || listing.id})`
  );
  const whatsappUrl = `https://wa.me/${brokerWhatsApp.replace(/[^0-9]/g, "")}?text=${whatsappText}`;

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.phone) {
      addToast(t("fillRequiredFields"), "error");
      return;
    }

    setIsSubmittingInquiry(true);
    setTimeout(() => {
      createInquiry({
        listingId: listing.id,
        listingTitle: listing.title,
        customerName: inquiryForm.name,
        phone: inquiryForm.phone,
        email: inquiryForm.email,
        message: inquiryForm.message || `Interested in ${listing.title}`,
      });
      setIsSubmittingInquiry(false);
      addToast(t("inquirySuccess"), "success");
      setInquiryForm({ name: "", phone: "", email: "", message: "" });
    }, 400);
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title: title,
        text: `Check out this listing on EthioDelala: ${title}`,
        url: window.location.href,
      });
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast("Listing link copied to clipboard!", "info");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <PublicNavbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/listings"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-amber-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{t("backToListings")}</span>
            </Link>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors shadow-xs"
            >
              <Share2 className="w-3.5 h-3.5 text-amber-600" />
              <span>{t("shareListing")}</span>
            </button>
          </div>

          {/* Title & Price Header */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-slate-900 text-white">
                  {listing.category.toUpperCase()}
                </span>
                <ListingStatusBadge
                  status={listing.status}
                  isFeatured={listing.isFeatured}
                  size="md"
                />
                <span className="text-xs font-semibold text-slate-400">
                  {t("referenceNo")}: <strong className="text-slate-700">{listing.referenceNo}</strong>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {title}
              </h1>

              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{listing.location}</span>
                {listing.address && (
                  <span className="text-slate-400">• {listing.address}</span>
                )}
              </div>
            </div>

            {/* Price Box */}
            <div className="text-left md:text-right shrink-0 bg-slate-50 md:bg-transparent p-4 md:p-0 rounded-xl border md:border-0 border-slate-200">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block mb-1">
                {t("price")}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight text-amber-700">
                {formatPrice(listing.publicPrice)}
              </span>
              <span className="text-[11px] text-slate-500 block mt-1">
                Verified Asking Price (ETB)
              </span>
            </div>
          </div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Columns: Gallery, Description, Specifications */}
            <div className="lg:col-span-8 space-y-8">
              {/* Photo Gallery */}
              <ListingGallery images={listing.images} title={title} />

              {/* Description */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                  {t("description")}
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {description}
                </p>
              </div>

              {/* Technical Specifications */}
              <ListingSpecifications listing={listing} />

              {/* Features & Amenities if available */}
              {Array.isArray(listing.features) && listing.features.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                    {t("featuresAmenities")}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {listing.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 text-xs font-semibold text-slate-800 border border-slate-100"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right 4 Columns: Direct Broker Contact & Inquiry */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              {/* Sold Notification Banner if sold */}
              {isSold && (
                <div className="p-5 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 space-y-2">
                  <div className="flex items-center gap-2 text-rose-700 font-extrabold text-sm uppercase tracking-wider">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{t("statusSold")}</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    {t("listingSoldNotice")}
                  </p>
                </div>
              )}

              {/* Broker Contact Card */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-md space-y-6">
                <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                  <img
                    src={brokerPhoto}
                    alt={brokerName}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-500/20"
                  />
                  <div>
                    <h4 className="text-base font-bold text-slate-900">
                      {brokerName}
                    </h4>
                    <span className="text-xs font-semibold text-amber-700 block">
                      {t("brokerTitle")}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Reg # {settings?.licenseNo || "ET-AA-2024-8841"}
                    </span>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="space-y-3">
                  {/* Call Button */}
                  <a
                    href={isSold ? "#" : `tel:${brokerPhone.replace(/\s+/g, "")}`}
                    className={`block w-full ${isSold ? "pointer-events-none opacity-50" : ""}`}
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      icon={Phone}
                      disabled={isSold}
                      className="w-full font-bold shadow-lg shadow-amber-600/20 text-sm"
                    >
                      {t("callBroker")}: {brokerPhone}
                    </Button>
                  </a>

                  {/* WhatsApp Button */}
                  <a
                    href={isSold ? "#" : whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full ${isSold ? "pointer-events-none opacity-50" : ""}`}
                  >
                    <Button
                      variant="success"
                      size="lg"
                      icon={MessageCircle}
                      disabled={isSold}
                      className="w-full font-bold text-sm bg-emerald-600 hover:bg-emerald-700"
                    >
                      {t("chatWhatsApp")}
                    </Button>
                  </a>
                </div>

                {/* Inquiry Form */}
                <div className="pt-4 border-t border-slate-100 space-y-4">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    {t("sendMessage")}
                  </h5>

                  <form onSubmit={handleInquirySubmit} className="space-y-3">
                    <Input
                      placeholder={t("yourName")}
                      required
                      disabled={isSold}
                      value={inquiryForm.name}
                      onChange={(e) =>
                        setInquiryForm({ ...inquiryForm, name: e.target.value })
                      }
                    />

                    <Input
                      placeholder={t("phoneNumber")}
                      required
                      disabled={isSold}
                      value={inquiryForm.phone}
                      onChange={(e) =>
                        setInquiryForm({ ...inquiryForm, phone: e.target.value })
                      }
                    />

                    <Input
                      type="email"
                      placeholder={t("emailAddress")}
                      disabled={isSold}
                      value={inquiryForm.email}
                      onChange={(e) =>
                        setInquiryForm({ ...inquiryForm, email: e.target.value })
                      }
                    />

                    <Textarea
                      rows={3}
                      placeholder={t("message")}
                      disabled={isSold}
                      value={inquiryForm.message}
                      onChange={(e) =>
                        setInquiryForm({ ...inquiryForm, message: e.target.value })
                      }
                    />

                    <Button
                      type="submit"
                      variant="secondary"
                      size="md"
                      disabled={isSold}
                      isLoading={isSubmittingInquiry}
                      className="w-full text-xs font-bold"
                    >
                      {t("submitInquiry")}
                    </Button>
                  </form>
                </div>

                {/* Legal Guarantee notice */}
                <div className="p-3.5 bg-slate-50 rounded-xl text-[11px] text-slate-500 space-y-1 border border-slate-100">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    Verified Brokerage Assurance
                  </span>
                  <p>
                    All title deeds, cartas, and vehicular libre certificates undergo legal due diligence with municipal registries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

