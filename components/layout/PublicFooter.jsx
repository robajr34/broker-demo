"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useDelala } from "@/lib/context/DelalaContext";
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export default function PublicFooter() {
  const { language, t } = useLanguage();
  const { settings } = useDelala();

  const businessName = language === "am" ? (settings?.businessNameAm || settings?.businessName) : settings?.businessName;
  const address = language === "am" ? (settings?.officeAddressAm || settings?.officeAddress) : settings?.officeAddress;
  const phone = settings?.phone || "+251 911 234 567";
  const whatsapp = settings?.whatsapp || "+251 911 234 567";
  const email = settings?.email || "contact@ethiodelala.com";

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Upper Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Business Identity & Trust */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20">
                <Building2 className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold text-white tracking-tight">
                  {businessName || "EthioDelala"}
                </span>
                <span className="text-[11px] font-semibold text-amber-400 tracking-wider uppercase">
                  {t("brandTagline")}
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {t("footerDesc")}
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-amber-400 bg-amber-950/40 border border-amber-800/60 rounded-xl px-3.5 py-2.5 max-w-sm">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{t("licensedDelala")}</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {t("quickLinks")}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link href="/properties" className="hover:text-amber-400 transition-colors">
                  {t("properties")}
                </Link>
              </li>
              <li>
                <Link href="/cars" className="hover:text-amber-400 transition-colors">
                  {t("cars")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors">
                  {t("contact")}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
                  {t("adminPortal")} &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Marketplace Categories */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {t("category")}
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/listings?category=import-materials" className="hover:text-white transition-colors">
                  {t("categoryImportMaterials")}
                </Link>
              </li>
              <li>
                <Link href="/listings?category=factories" className="hover:text-white transition-colors">
                  {t("categoryFactories")}
                </Link>
              </li>
              <li>
                <Link href="/listings?category=shops-for-rent" className="hover:text-white transition-colors">
                  {t("categoryShopsForRent")}
                </Link>
              </li>
              <li>
                <Link href="/listings?category=houses-for-rent" className="hover:text-white transition-colors">
                  {t("categoryHousesForRent")}
                </Link>
              </li>
              <li>
                <Link href="/listings?category=properties" className="hover:text-white transition-colors">
                  {t("categoryProperties")}
                </Link>
              </li>
              <li>
                <Link href="/listings?category=vehicles" className="hover:text-white transition-colors">
                  {t("categoryVehicles")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {t("contactInfo")}
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-slate-400 text-xs leading-relaxed">
                  {address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="hover:text-white font-medium text-xs transition-colors"
                >
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white text-xs transition-colors"
                >
                  WhatsApp: {whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`mailto:${email}`}
                  className="hover:text-white text-xs transition-colors"
                >
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Terms */}
      <div className="border-t border-slate-900 bg-slate-950/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-slate-300 font-semibold">{businessName}</span>.{" "}
            {t("allRightsReserved")}
          </p>

          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-slate-300 transition-colors">
              {t("privacyPolicy")}
            </Link>
            <span>•</span>
            <Link href="/about" className="hover:text-slate-300 transition-colors">
              {t("termsConditions")}
            </Link>
            <span>•</span>
            <span className="text-amber-500 font-semibold">
              Addis Ababa, Ethiopia
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

