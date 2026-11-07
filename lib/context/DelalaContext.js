"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { DelalaStore } from "@/lib/store/delalaStore";

const DelalaContext = createContext(null);

export function DelalaProvider({ children }) {
  const [listings, setListings] = useState([]);
  const [adminListings, setAdminListings] = useState([]);
  const [sales, setSales] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [settings, setSettings] = useState(DelalaStore.getSettings());
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshAll = useCallback(() => {
    try {
      const pubListings = DelalaStore.getListings(false);
      const admListings = DelalaStore.getListings(true);
      const currentSales = DelalaStore.getSales();
      const currentInquiries = DelalaStore.getInquiries();
      const currentSettings = DelalaStore.getSettings();
      const currentAnalytics = DelalaStore.getAnalytics();

      setListings(pubListings);
      setAdminListings(admListings);
      setSales(currentSales);
      setInquiries(currentInquiries);
      setSettings(currentSettings);
      setAnalytics(currentAnalytics);
    } catch (e) {
      console.error("Error refreshing Delala store:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  const createListing = (data) => {
    const res = DelalaStore.createListing(data);
    refreshAll();
    return res;
  };

  const updateListing = (id, data) => {
    const res = DelalaStore.updateListing(id, data);
    refreshAll();
    return res;
  };

  const deleteListing = (id) => {
    const res = DelalaStore.deleteListing(id);
    refreshAll();
    return res;
  };

  const updateListingStatus = (id, status) => {
    const res = DelalaStore.updateListingStatus(id, status);
    refreshAll();
    return res;
  };

  const recordSale = (saleData) => {
    const res = DelalaStore.recordSale(saleData);
    refreshAll();
    return res;
  };

  const createInquiry = (inquiryData) => {
    const res = DelalaStore.createInquiry(inquiryData);
    refreshAll();
    return res;
  };

  const updateInquiryStatus = (id, status) => {
    const res = DelalaStore.updateInquiryStatus(id, status);
    refreshAll();
    return res;
  };

  const updateSettings = (newSettings) => {
    const res = DelalaStore.updateSettings(newSettings);
    refreshAll();
    return res;
  };

  return (
    <DelalaContext.Provider
      value={{
        listings,
        adminListings,
        sales,
        inquiries,
        settings,
        analytics,
        isLoading,
        createListing,
        updateListing,
        deleteListing,
        updateListingStatus,
        recordSale,
        createInquiry,
        updateInquiryStatus,
        updateSettings,
        refreshAll,
      }}
    >
      {children}
    </DelalaContext.Provider>
  );
}

export function useDelala() {
  const context = useContext(DelalaContext);
  if (!context) {
    throw new Error("useDelala must be used within a DelalaProvider");
  }
  return context;
}

