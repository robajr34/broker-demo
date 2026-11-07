"use client";

import React from "react";
import { LanguageProvider } from "@/lib/context/LanguageContext";
import { ToastProvider } from "@/lib/context/ToastContext";
import { DelalaProvider } from "@/lib/context/DelalaContext";

export default function Providers({ children }) {
  return (
    <LanguageProvider>
      <ToastProvider>
        <DelalaProvider>{children}</DelalaProvider>
      </ToastProvider>
    </LanguageProvider>
  );
}

