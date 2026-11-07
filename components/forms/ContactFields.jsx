"use client";

import React, { useState } from "react";
import Input from "@/components/ui/Input";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useDelala } from "@/lib/context/DelalaContext";
import { Phone, MessageCircle, Mail, UserCheck } from "lucide-react";

export default function ContactFields({ contactData, onChange }) {
  const { t } = useLanguage();
  const { settings } = useDelala();

  const [useCustomContact, setUseCustomContact] = useState(Boolean(contactData));

  const handleToggle = (checked) => {
    setUseCustomContact(checked);
    if (!checked) {
      onChange(null);
    } else {
      onChange({
        brokerName: settings?.brokerName || "Abebe Tadesse",
        phone: settings?.phone || "+251 911 234 567",
        whatsapp: settings?.whatsapp || "+251 911 234 567",
        email: settings?.email || "contact@ethiodelala.com",
      });
    }
  };

  const handleChange = (field, value) => {
    onChange({
      ...(contactData || {}),
      [field]: value,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
        <div className="flex items-center gap-2.5">
          <UserCheck className="w-5 h-5 text-amber-600" />
          <div>
            <span className="text-xs font-bold text-slate-800">
              Use Standard Broker Profile
            </span>
            <p className="text-[11px] text-slate-500">
              Listing displays your master profile ({settings?.brokerName} • {settings?.phone})
            </p>
          </div>
        </div>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={useCustomContact}
            onChange={(e) => handleToggle(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
          <span className="ml-2 text-xs font-semibold text-slate-700">
            {useCustomContact ? "Custom Override" : "Default"}
          </span>
        </label>
      </div>

      {useCustomContact && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 animate-fade-in">
          <Input
            label="Designated Agent / Broker Name"
            placeholder="e.g. Abebe Tadesse"
            value={contactData?.brokerName || ""}
            onChange={(e) => handleChange("brokerName", e.target.value)}
          />

          <Input
            label="Inquiry Phone Number"
            icon={Phone}
            placeholder="+251 911 000 000"
            value={contactData?.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
          />

          <Input
            label="WhatsApp Number"
            icon={MessageCircle}
            placeholder="+251 911 000 000"
            value={contactData?.whatsapp || ""}
            onChange={(e) => handleChange("whatsapp", e.target.value)}
          />

          <Input
            label="Direct Email"
            icon={Mail}
            placeholder="agent@ethiodelala.com"
            value={contactData?.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
      )}
    </div>
  );
}

