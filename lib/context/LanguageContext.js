"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import en from "@/lib/translations/en";
import am from "@/lib/translations/am";

const translations = { en, am };

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("ethiodelala_lang");
      if (savedLang === "am" || savedLang === "en") {
        setLanguageState(savedLang);
        document.documentElement.lang = savedLang;
      }
    } catch {
      // LocalStorage access fallback
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang) => {
    if (lang === "en" || lang === "am") {
      setLanguageState(lang);
      try {
        localStorage.setItem("ethiodelala_lang", lang);
        document.documentElement.lang = lang;
      } catch {
        // LocalStorage access fallback
      }
    }
  };

  const t = (key) => {
    if (!key) return "";
    const activeDict = translations[language] || translations.en;
    if (activeDict && activeDict[key] !== undefined) {
      return activeDict[key];
    }
    return translations.en[key] || key;
  };

  // Helper for dual-language listing fields
  const getLocalizedField = (item, field = "title") => {
    if (!item) return "";
    if (language === "am") {
      const amField = `${field}Am`;
      if (item[amField] && item[amField].trim()) {
        return item[amField];
      }
    }
    return item[field] || "";
  };

  const formatPrice = (amount) => {
    if (amount === undefined || amount === null || isNaN(amount)) return "ETB 0";
    const formatted = Number(amount).toLocaleString("en-US");
    return `ETB ${formatted}`;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        getLocalizedField,
        formatPrice,
        isAmharic: language === "am",
        mounted,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

