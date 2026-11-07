"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useDelala } from "@/lib/context/DelalaContext";
import { useToast } from "@/lib/context/ToastContext";
import PublicNavbar from "@/components/layout/PublicNavbar";
import PublicFooter from "@/components/layout/PublicFooter";
import SectionHeader from "@/components/common/SectionHeader";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  ShieldCheck,
  Send,
} from "lucide-react";

export default function ContactPage() {
  const { language, t } = useLanguage();
  const { settings, createInquiry } = useDelala();
  const { addToast } = useToast();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const phone = settings?.phone || "+251 911 234 567";
  const whatsapp = settings?.whatsapp || "+251 911 234 567";
  const email = settings?.email || "contact@ethiodelala.com";
  const address = language === "am" ? (settings?.officeAddressAm || settings?.officeAddress) : settings?.officeAddress;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      addToast(t("fillRequiredFields"), "error");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      createInquiry({
        customerName: form.name,
        phone: form.phone,
        email: form.email,
        message: form.message || "General contact message",
        listingTitle: "Direct Website Contact",
      });
      setIsSubmitting(false);
      addToast(t("inquirySuccess"), "success");
      setForm({ name: "", phone: "", email: "", message: "" });
    }, 400);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <PublicNavbar />

      <main className="flex-1 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeader
            badge={t("contact")}
            title={language === "am" ? "ከኢትዮ ደላላ ጋር ይገናኙ" : "Contact Our Brokerage Team"}
            subtitle={
              language === "am"
                ? "ለማንኛውም የቤት፣ የመሬትና የመኪና ግብይት ጥያቄዎች በስልክ፣ በዋትስአፕ ወይም በቢሮአችን ያግኙን"
                : "Reach out directly for property appraisals, vehicle inspections, or off-market investment sourcing."
            }
            align="center"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Contact Details Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Direct Office Contacts
                </h3>

                <ul className="space-y-4 text-sm text-slate-700">
                  <li className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs uppercase font-bold text-slate-400 block">
                        Headquarters Office
                      </span>
                      <p className="font-semibold text-slate-900 mt-0.5 leading-relaxed">
                        {address}
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs uppercase font-bold text-slate-400 block">
                        Direct Phone
                      </span>
                      <a
                        href={`tel:${phone.replace(/\s+/g, "")}`}
                        className="font-bold text-slate-900 hover:text-amber-700 transition-colors"
                      >
                        {phone}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs uppercase font-bold text-slate-400 block">
                        Official WhatsApp
                      </span>
                      <a
                        href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-emerald-700 hover:underline"
                      >
                        {whatsapp}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs uppercase font-bold text-slate-400 block">
                        Email Address
                      </span>
                      <a
                        href={`mailto:${email}`}
                        className="font-semibold text-slate-900 hover:text-amber-700 transition-colors"
                      >
                        {email}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs uppercase font-bold text-slate-400 block">
                        Working Hours
                      </span>
                      <p className="font-medium text-slate-700 mt-0.5">
                        Mon – Sat: 8:30 AM – 6:30 PM (EAT)
                      </p>
                    </div>
                  </li>
                </ul>

                {/* Instant Actions */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="flex-1"
                  >
                    <Button variant="primary" size="md" icon={Phone} className="w-full">
                      {t("callNow")}
                    </Button>
                  </a>

                  <a
                    href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button
                      variant="success"
                      size="md"
                      icon={MessageCircle}
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                    >
                      WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            {/* Inquiry Form Column */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {t("sendMessage")}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Send your questions directly to our broker. We typically respond within 30 minutes.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label={t("yourName")}
                      required
                      placeholder="e.g. Dawit Kebede"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />

                    <Input
                      label={t("phoneNumber")}
                      required
                      placeholder="+251 911 000 000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>

                  <Input
                    label={t("emailAddress")}
                    type="email"
                    placeholder="dawit@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />

                  <Textarea
                    label={t("message")}
                    rows={4}
                    required
                    placeholder="Tell us what you are looking for, property questions, or scheduling a visit..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    icon={Send}
                    isLoading={isSubmitting}
                    className="w-full sm:w-auto font-bold shadow-md shadow-amber-600/20"
                  >
                    {t("submitInquiry")}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

