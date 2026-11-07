"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useDelala } from "@/lib/context/DelalaContext";
import PublicNavbar from "@/components/layout/PublicNavbar";
import PublicFooter from "@/components/layout/PublicFooter";
import SectionHeader from "@/components/common/SectionHeader";
import Button from "@/components/ui/Button";
import {
  ShieldCheck,
  Award,
  Users,
  MapPin,
  Building2,
  FileCheck2,
  Phone,
  MessageCircle,
} from "lucide-react";

export default function AboutPage() {
  const { language, t } = useLanguage();
  const { settings } = useDelala();

  const businessName = language === "am" ? (settings?.businessNameAm || settings?.businessName) : settings?.businessName;
  const brokerName = language === "am" ? (settings?.brokerNameAm || settings?.brokerName) : settings?.brokerName;
  const bio = language === "am" ? (settings?.bioAm || settings?.bio) : settings?.bio;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <PublicNavbar />

      <main className="flex-1 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <SectionHeader
            badge={t("about")}
            title={language === "am" ? "ስለ ኢትዮ ደላላ አሻሻጭ ድርጅት" : "About EthioDelala Brokerage"}
            subtitle={
              language === "am"
                ? "በአዲስ አበባና በመላው ኢትዮጵያ በህጋዊ ፈቃድ የሚሰራ ታማኝ የንብረትና የመኪና አሻሻጭ"
                : "Addis Ababa's foremost licensed real estate and automotive brokerage practice."
            }
            align="center"
          />

          {/* Story & Broker Profile */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm">
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-slate-900 border-4 border-white">
                <img
                  src={
                    settings?.brokerPhoto ||
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                  }
                  alt={brokerName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Float Experience Badge */}
              <div className="absolute -bottom-6 -right-6 bg-slate-900 text-white p-5 rounded-2xl shadow-xl border border-slate-800 space-y-1 text-center">
                <span className="text-3xl font-black text-amber-400 block">15+</span>
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-300">
                  Years Experience
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  Principal Broker
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {brokerName}
                </h2>
                <p className="text-sm font-semibold text-slate-500">
                  {settings?.brokerTitle || "Senior Licensed Property & Automotive Delala"}
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {bio}
              </p>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-2.5">
                  <Award className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>Licensed Brokerage: Reg #{settings?.licenseNo || "ET-AA-2024-8841"}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>Office in Bole Medhanialem, Addis Ababa</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>100% Verified Title Carta Due Diligence</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <FileCheck2 className="w-5 h-5 text-sky-600 shrink-0" />
                  <span>Transparent Contract Drafting & Closing</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <Link href="/contact">
                  <Button variant="primary" size="lg">
                    {t("contact")}
                  </Button>
                </Link>
                <Link href="/listings">
                  <Button variant="outline" size="lg">
                    {t("marketplaceTitle")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Regional Coverage */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm space-y-8 text-center">
            <div className="max-w-2xl mx-auto space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">
                Strategic Regional Focus
              </h3>
              <p className="text-sm text-slate-600">
                We specialize in prime development and high-appreciation corridors across Ethiopia.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: "Bole", desc: "Diplomatic & Luxury Villas" },
                { name: "CMC", desc: "Gated Communities & Estates" },
                { name: "Kazanchis", desc: "Commercial & UN Corridor" },
                { name: "Ayat", desc: "Modern High-Rise Condos" },
                { name: "Bishoftu", desc: "Lakefront Resorts & Plots" },
                { name: "Adama", desc: "Industrial & Mixed-Use Plazas" },
              ].map((loc, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 hover:border-amber-400 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-amber-600 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-900">{loc.name}</h4>
                  <p className="text-[11px] text-slate-500">{loc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

