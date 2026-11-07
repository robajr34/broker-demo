"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/context/LanguageContext";
import Badge from "@/components/ui/Badge";
import { ArrowRight, Phone, MessageCircle, User } from "lucide-react";

export default function RecentInquiries({ inquiries = [] }) {
  const { t } = useLanguage();

  const stageBadge = (status) => {
    switch (status) {
      case "new":
        return <Badge variant="new" size="sm">{t("stageNew")}</Badge>;
      case "contacted":
        return <Badge variant="info" size="sm">{t("stageContacted")}</Badge>;
      case "negotiating":
        return <Badge variant="warning" size="sm">{t("stageNegotiating")}</Badge>;
      case "converted":
        return <Badge variant="success" size="sm">{t("stageConverted")}</Badge>;
      default:
        return <Badge variant="default" size="sm">{status}</Badge>;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            {t("recentInquiries")}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Prospective buyers actively inquiring about properties and cars.
          </p>
        </div>

        <Link
          href="/admin/inquiries"
          className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 hover:underline"
        >
          <span>{t("viewAll")}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {inquiries.length === 0 ? (
        <p className="text-xs text-slate-400 py-6 text-center">
          No inquiries received yet.
        </p>
      ) : (
        <div className="divide-y divide-slate-100">
          {inquiries.slice(0, 5).map((inq) => (
            <div
              key={inq.id}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:bg-slate-50/70 px-2 rounded-xl transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">
                    {inq.customerName}
                  </span>
                  {stageBadge(inq.status)}
                </div>

                <p className="text-xs text-slate-500 line-clamp-1">
                  Re: <strong className="text-slate-700">{inq.listingTitle}</strong> — "{inq.message}"
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                {inq.phone && (
                  <a
                    href={`tel:${inq.phone.replace(/\s+/g, "")}`}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-700 transition-colors"
                    title={t("quickCall")}
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                )}
                {inq.phone && (
                  <a
                    href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                    title={t("quickWhatsApp")}
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

