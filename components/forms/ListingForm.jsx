"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useToast } from "@/lib/context/ToastContext";
import FormSection from "@/components/common/FormSection";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import ImageUploader from "@/components/ui/ImageUploader";
import PricingFields from "./PricingFields";
import PropertyFields from "./PropertyFields";
import VehicleFields from "./VehicleFields";
import LandFields from "./LandFields";
import ContactFields from "./ContactFields";
import Modal from "@/components/ui/Modal";
import ListingCard from "@/components/listings/ListingCard";
import {
  FileText,
  DollarSign,
  Layers,
  Image as ImageIcon,
  PhoneCall,
  Send,
  Eye,
  Save,
  CheckCircle2,
} from "lucide-react";

export default function ListingForm({
  initialData = null,
  onSubmit,
  isEdit = false,
}) {
  const router = useRouter();
  const { t } = useLanguage();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    titleAm: initialData?.titleAm || "",
    category: initialData?.category || "house",
    propertyType: initialData?.propertyType || "villa",
    description: initialData?.description || "",
    descriptionAm: initialData?.descriptionAm || "",
    location: initialData?.location || "Bole",
    address: initialData?.address || "",
    status: initialData?.status || "available",
    isFeatured: initialData?.isFeatured || false,
    publicPrice: initialData?.publicPrice || "",
    acquisitionPrice: initialData?.acquisitionPrice || "",
    privateDiscount: initialData?.privateDiscount || 0,
    additionalExpenses: initialData?.additionalExpenses || 0,
    specifications: initialData?.specifications || {},
    images: initialData?.images || [],
    primaryImage: initialData?.primaryImage || "",
    contact: initialData?.contact || null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const categoryOptions = [
    { value: "house", label: t("categoryHouse") },
    { value: "apartment", label: t("categoryApartment") },
    { value: "commercial", label: t("categoryCommercial") },
    { value: "land", label: t("categoryLand") },
    { value: "car", label: t("categoryCar") },
  ];

  const locationOptions = [
    { value: "Addis Ababa", label: "Addis Ababa" },
    { value: "Bole", label: "Bole" },
    { value: "CMC", label: "CMC" },
    { value: "Saris", label: "Saris" },
    { value: "Kazanchis", label: "Kazanchis" },
    { value: "Ayat", label: "Ayat" },
    { value: "Adama", label: "Adama" },
    { value: "Bishoftu", label: "Bishoftu" },
    { value: "Hawassa", label: "Hawassa" },
  ];

  const statusOptions = [
    { value: "draft", label: t("statusDraft") },
    { value: "available", label: t("statusAvailable") },
    { value: "new", label: t("statusNew") },
    { value: "reserved", label: t("statusReserved") },
    { value: "sold", label: t("statusSold") },
  ];

  const validate = () => {
    const errs = {};
    if (!formData.title?.trim()) errs.title = "English listing title is required.";
    if (!formData.description?.trim()) errs.description = "English description is required.";
    if (!formData.publicPrice || Number(formData.publicPrice) <= 0) {
      errs.publicPrice = "Please enter a valid public asking price.";
    }
    if (!formData.acquisitionPrice || Number(formData.acquisitionPrice) <= 0) {
      errs.acquisitionPrice = "Broker acquisition cost is mandatory for financial tracking.";
    }
    if (!formData.images || formData.images.length === 0) {
      errs.images = "Please upload at least one property/vehicle photograph.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e, targetStatus = null) => {
    e?.preventDefault();

    if (!validate()) {
      addToast(t("fillRequiredFields"), "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        status: targetStatus || formData.status,
      };

      await onSubmit?.(payload);
      addToast(t("actionSuccessful"), "success");
      router.push("/admin/listings");
    } catch (err) {
      console.error(err);
      addToast(err?.message || t("errorOccurred"), "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="space-y-8 max-w-5xl mx-auto">
      {/* SECTION 1: BASIC INFORMATION */}
      <FormSection
        title={t("basicInformation")}
        subtitle="Primary metadata, localized titles, category classification, and regional location."
        badge="General Info"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={t("listingTitleEn")}
            required
            placeholder="e.g. Luxury 5-Bedroom Villa in Bole"
            value={formData.title}
            error={errors.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <Input
            label={t("listingTitleAm")}
            placeholder="ምሳሌ፡ በቦሌ 5 መኝታ ያለው ቅንጡ ቪላ"
            value={formData.titleAm}
            onChange={(e) => setFormData({ ...formData, titleAm: e.target.value })}
          />

          <Select
            label={t("selectCategory")}
            options={categoryOptions}
            value={formData.category}
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value,
                // Adjust default propertyType based on category
                propertyType:
                  e.target.value === "car"
                    ? "suv"
                    : e.target.value === "land"
                    ? "land"
                    : "villa",
              })
            }
          />

          <Select
            label={t("selectLocation")}
            options={locationOptions}
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />

          <div className="md:col-span-2">
            <Input
              label={t("specificAddress")}
              placeholder="e.g. Near Edna Mall, Bole Medhanialem area"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div className="md:col-span-2">
            <Textarea
              label={t("descriptionEn")}
              required
              rows={3}
              placeholder="Detailed property specifications, legal deed condition, finishes, and neighbourhood perks..."
              value={formData.description}
              error={errors.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="md:col-span-2">
            <Textarea
              label={t("descriptionAm")}
              rows={3}
              placeholder="የንብረቱ ዝርዝር ሁኔታ፣ የካርታ ይዞታ፣ አቅርቦቶችና መገልገያዎች በአማርኛ..."
              value={formData.descriptionAm}
              onChange={(e) => setFormData({ ...formData, descriptionAm: e.target.value })}
            />
          </div>

          <Select
            label={t("status")}
            options={statusOptions}
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          />

          <div className="flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <input
              type="checkbox"
              id="isFeatured"
              checked={formData.isFeatured}
              onChange={(e) =>
                setFormData({ ...formData, isFeatured: e.target.checked })
              }
              className="w-4 h-4 text-amber-600 rounded-sm focus:ring-amber-500 cursor-pointer"
            />
            <label
              htmlFor="isFeatured"
              className="text-xs font-bold text-slate-800 cursor-pointer"
            >
              {t("markFeatured")}
            </label>
          </div>
        </div>
      </FormSection>

      {/* SECTION 2: PRICING & PRIVATE FINANCIALS */}
      <FormSection
        title={t("pricingSection")}
        subtitle="Public price and confidential broker baseline financials for automatic revenue & net profit computation."
        badge="Confidential Ledger"
        highlight
      >
        <PricingFields
          formData={formData}
          onChange={(newPrices) => setFormData({ ...formData, ...newPrices })}
        />
      </FormSection>

      {/* SECTION 3: CONDITIONAL SPECIFICATIONS */}
      <FormSection
        title={t("specificationsSection")}
        subtitle={`Conditional technical specifications tailored for ${
          formData.category === "car"
            ? "Automotive Vehicles"
            : formData.category === "land"
            ? "Land Parcels"
            : "Real Estate Properties"
        }.`}
        badge={formData.category.toUpperCase()}
      >
        {formData.category === "car" ? (
          <VehicleFields
            specifications={formData.specifications}
            onChange={(specs) =>
              setFormData({ ...formData, specifications: specs })
            }
          />
        ) : formData.category === "land" ? (
          <LandFields
            specifications={formData.specifications}
            onChange={(specs) =>
              setFormData({ ...formData, specifications: specs })
            }
          />
        ) : (
          <PropertyFields
            specifications={formData.specifications}
            onChange={(specs) =>
              setFormData({ ...formData, specifications: specs })
            }
          />
        )}
      </FormSection>

      {/* SECTION 4: IMAGE UPLOAD */}
      <FormSection
        title={t("imageUploadSection")}
        subtitle="Upload multiple high-resolution photos. Drag, select cover, and reorder."
        badge="Photography"
      >
        <ImageUploader
          images={formData.images}
          primaryImage={formData.primaryImage}
          onChange={({ images, primaryImage }) =>
            setFormData({ ...formData, images, primaryImage })
          }
        />
        {errors.images && (
          <p className="text-xs text-rose-600 font-semibold">{errors.images}</p>
        )}
      </FormSection>

      {/* SECTION 5: CONTACT INFORMATION */}
      <FormSection
        title={t("contactSection")}
        subtitle="Designate standard master brokerage contact or provide specialized individual listing agent details."
        badge="Agent Contact"
      >
        <ContactFields
          contactData={formData.contact}
          onChange={(contact) => setFormData({ ...formData, contact })}
        />
      </FormSection>

      {/* SECTION 6: PUBLISH & ACTIONS */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-500 font-medium">
          Ready to save or publish. Changes sync immediately across the marketplace.
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Save Draft */}
          <Button
            variant="outline"
            size="md"
            icon={Save}
            onClick={(e) => handleSubmit(e, "draft")}
            disabled={isSubmitting}
            className="flex-1 sm:flex-initial"
          >
            {t("saveDraft")}
          </Button>

          {/* Preview Modal Trigger */}
          <Button
            variant="outline"
            size="md"
            icon={Eye}
            onClick={() => setIsPreviewOpen(true)}
            type="button"
            className="flex-1 sm:flex-initial"
          >
            {t("previewListing")}
          </Button>

          {/* Final Publish */}
          <Button
            variant="primary"
            size="md"
            icon={Send}
            type="submit"
            isLoading={isSubmitting}
            className="flex-1 sm:flex-initial shadow-md shadow-amber-600/20 font-bold"
          >
            {isEdit ? "Update Listing" : t("publishListing")}
          </Button>
        </div>
      </div>

      {/* Preview Modal */}
      <Modal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title="Public Listing Card Preview"
        subtitle="This is exactly how potential buyers will see your listing on the public marketplace (without private broker financials)."
        size="md"
      >
        <div className="py-2 flex justify-center">
          <div className="w-full max-w-sm">
            <ListingCard
              listing={{
                ...formData,
                id: initialData?.id || "preview-id",
                publicPrice: Number(formData.publicPrice) || 0,
                // Strip private financials to confirm security
                acquisitionPrice: undefined,
                privateDiscount: undefined,
                additionalExpenses: undefined,
              }}
            />
          </div>
        </div>
      </Modal>
    </form>
  );
}

