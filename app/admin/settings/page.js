"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useDelala } from "@/lib/context/DelalaContext";
import { useToast } from "@/lib/context/ToastContext";
import AdminLayout from "@/components/layout/AdminLayout";
import PageHeader from "@/components/common/PageHeader";
import FormSection from "@/components/common/FormSection";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import {
  Save,
  Building,
  User,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Share2,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

export default function AdminSettingsPage() {
  const { t } = useLanguage();
  const { settings, updateSettings } = useDelala();
  const { addToast } = useToast();

  const [form, setForm] = useState({
    businessName: settings?.businessName || "",
    businessNameAm: settings?.businessNameAm || "",
    brokerName: settings?.brokerName || "",
    brokerNameAm: settings?.brokerNameAm || "",
    brokerTitle: settings?.brokerTitle || "",
    brokerPhoto: settings?.brokerPhoto || "",
    phone: settings?.phone || "",
    whatsapp: settings?.whatsapp || "",
    email: settings?.email || "",
    officeAddress: settings?.officeAddress || "",
    officeAddressAm: settings?.officeAddressAm || "",
    licenseNo: settings?.licenseNo || "",
    bio: settings?.bio || "",
    bioAm: settings?.bioAm || "",
    socialLinks: settings?.socialLinks || {
      facebook: "",
      telegram: "",
      youtube: "",
      linkedin: "",
    },
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      updateSettings(form);
      setIsSaving(false);
      addToast(t("settingsSavedSuccess"), "success");
    }, 400);
  };

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
        <PageHeader
          title={t("settingsTitle")}
          subtitle="Configure master brokerage profile and public contact channels. Changes immediately update the public navbar, footer, and listing contacts."
          breadcrumbs={[
            { label: "Admin", href: "/admin" },
            { label: "Settings" },
          ]}
          action={
            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={Save}
              isLoading={isSaving}
              className="font-bold shadow-md shadow-amber-600/20"
            >
              {t("saveSettings")}
            </Button>
          }
        />

        {/* Section 1: Business Identity */}
        <FormSection
          title="Business Identity & Licensing"
          subtitle="Official registered brokerage naming in English and Amharic."
          badge="Brand"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label={t("businessName")}
              required
              value={form.businessName}
              onChange={(e) => setForm({ ...form, businessName: e.target.value })}
            />

            <Input
              label="የድርጅቱ ስም (በአማርኛ)"
              value={form.businessNameAm}
              onChange={(e) =>
                setForm({ ...form, businessNameAm: e.target.value })
              }
            />

            <Input
              label="Brokerage License Registration #"
              placeholder="e.g. ET-AA-2024-8841"
              value={form.licenseNo}
              onChange={(e) => setForm({ ...form, licenseNo: e.target.value })}
            />

            <Input
              label="Platform Default Currency"
              value="ETB (Ethiopian Birr)"
              disabled
              helperText="Locked to Ethiopian Birr."
            />
          </div>
        </FormSection>

        {/* Section 2: Broker Profile */}
        <FormSection
          title="Principal Delala / Broker Profile"
          subtitle="The face of the brokerage displayed on listing cards and direct contact sections."
          badge="Broker"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Broker Full Name (English)"
              required
              value={form.brokerName}
              onChange={(e) => setForm({ ...form, brokerName: e.target.value })}
            />

            <Input
              label="የደላላው ሙሉ ስም (በአማርኛ)"
              value={form.brokerNameAm}
              onChange={(e) =>
                setForm({ ...form, brokerNameAm: e.target.value })
              }
            />

            <div className="sm:col-span-2">
              <Input
                label="Professional Title / Credential"
                value={form.brokerTitle}
                onChange={(e) =>
                  setForm({ ...form, brokerTitle: e.target.value })
                }
              />
            </div>

            <div className="sm:col-span-2">
              <Input
                label="Broker Profile Photo URL"
                value={form.brokerPhoto}
                onChange={(e) =>
                  setForm({ ...form, brokerPhoto: e.target.value })
                }
                helperText="Enter a high resolution portrait URL."
              />
            </div>

            <div className="sm:col-span-2">
              <Textarea
                label={t("brokerBio")}
                rows={3}
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
              />
            </div>

            <div className="sm:col-span-2">
              <Textarea
                label="የደላላው አጭር ማብራሪያ (በአማርኛ)"
                rows={3}
                value={form.bioAm}
                onChange={(e) => setForm({ ...form, bioAm: e.target.value })}
              />
            </div>
          </div>
        </FormSection>

        {/* Section 3: Contact Channels */}
        <FormSection
          title="Public Contact Channels"
          subtitle="Phone dialer targets, WhatsApp message links, and office address."
          badge="Communications"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label={t("phonePrimary")}
              icon={Phone}
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <Input
              label={t("whatsappNumber")}
              icon={MessageCircle}
              required
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
            />

            <div className="sm:col-span-2">
              <Input
                label={t("supportEmail")}
                icon={Mail}
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="sm:col-span-2">
              <Input
                label={t("officeLoc")}
                icon={MapPin}
                required
                value={form.officeAddress}
                onChange={(e) =>
                  setForm({ ...form, officeAddress: e.target.value })
                }
              />
            </div>

            <div className="sm:col-span-2">
              <Input
                label="የቢሮ አድራሻ (በአማርኛ)"
                icon={MapPin}
                value={form.officeAddressAm}
                onChange={(e) =>
                  setForm({ ...form, officeAddressAm: e.target.value })
                }
              />
            </div>
          </div>
        </FormSection>

        {/* Section 4: Social Media Links */}
        <FormSection
          title="Social Media Channels"
          subtitle="Official public channels displayed in the website footer."
          badge="Social"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Telegram Channel / Handle"
              placeholder="https://t.me/ethiodelala"
              value={form.socialLinks?.telegram || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  socialLinks: { ...form.socialLinks, telegram: e.target.value },
                })
              }
            />

            <Input
              label="Facebook Page URL"
              placeholder="https://facebook.com/ethiodelala"
              value={form.socialLinks?.facebook || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  socialLinks: { ...form.socialLinks, facebook: e.target.value },
                })
              }
            />

            <Input
              label="YouTube Channel"
              placeholder="https://youtube.com/@ethiodelala"
              value={form.socialLinks?.youtube || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  socialLinks: { ...form.socialLinks, youtube: e.target.value },
                })
              }
            />

            <Input
              label="LinkedIn Company Profile"
              placeholder="https://linkedin.com/company/ethiodelala"
              value={form.socialLinks?.linkedin || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  socialLinks: { ...form.socialLinks, linkedin: e.target.value },
                })
              }
            />
          </div>
        </FormSection>

        {/* Save Bar */}
        <div className="pt-4 flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            icon={Save}
            isLoading={isSaving}
            className="w-full sm:w-auto font-bold shadow-lg shadow-amber-600/25"
          >
            {t("saveSettings")}
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
}

